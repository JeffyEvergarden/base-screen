import { Col, Row, message } from 'antd';
import GGEditor, { Flow, Item } from 'gg-editor';

import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import styles from './index.less';
import { useEffect, useMemo, useRef } from 'react';
import { judgeLineByNode } from './utils/util';
import eventbus from './utils/eventbus';
import { update } from 'lodash';

GGEditor.setTrackable(false);

interface PageViewProps {
  insertNode?: (node: any) => void;
  insertLine?: (node: any) => void;
}

const PageView = (props: PageViewProps) => {
  const { insertNode, insertLine } = props;

  const editorRef = useRef<any>(null);

  // 可以输出看看有啥方法
  // useEffect(() => {
  //   console.log(editorRef.current?.propsAPI);
  // }, []);

  // 获取 propsAPI
  const getPropsAPI = () => {
    return editorRef.current?.propsAPI;
  };

  // 获取所有节点
  const getAllNode = () => {
    const propsAPI = getPropsAPI();
    const rep = propsAPI.save();
    const nodes = rep.nodes || []; // 节点
    // index：序号   id：标识  type：类型
    const edges = rep.edges || []; // 线
    //  index 、 id 、 source 、 target
    console.log('nodes:', nodes);
    console.log('edges:', edges);
    return [nodes, edges];
  };

  // 删除节点 by id 或者 对象的id
  const deleteNode = (item: any) => {
    const propsAPI = getPropsAPI();
    propsAPI.remove(item.id || item);
  };

  // 插入节点
  const _insert = (event: any) => {
    if (event.action === 'add') {
      // 插入事件
      // 插入前是没有item的，插入后追加的
      if (event?.item.type === 'node') {
        // 节点是 node （节点随便插入）
        insertNode?.(event);
        eventbus.$emit('flashNodeList');
      } else if (event?.item.type === 'edge') {
        // 节点是线 （线不能随便连）
        console.log('插线');
        _insertLine(event);
      }
    }
  };
  // 插入线
  // 这跟线没有其他源指向它
  const _insertLine = (event: any) => {
    const target = event.item.model;
    const [nodes, lines] = getAllNode();
    // console.log(lines);
    // 过滤掉自己本身
    const arr = lines.filter((item: any) => {
      // if (item.id === target.id) {
      //   console.log('插入后确实存在');
      // }
      return item.id !== target.id;
    });

    // 规则有以下
    // 1、线必须有前后节点
    // 2、节点不能与自己相连
    // 3、存在一样的连接
    // 4、以上都是根据线来判断，还得根据节点关系来判断

    // 针对 1
    // 连的是节点是 那source和 target字段就是字符串id、 不然是 对象 {x,y} 的坐标
    if (typeof target.source === 'object' || typeof target.target === 'object') {
      console.log('头尾需有明确指向');
      deleteNode(target);
      return;
    }
    // 针对 2
    // 不能自己相连
    if (target.source === target.target) {
      console.log('不能自己连自己');
      deleteNode(target);
      return;
    }
    // 针对3的处理
    //
    // console.log('判断')
    // console.log(arr)
    // console.log(target)
    for (let i = 0; i < arr.length; i++) {
      let tmp = arr[i];
      // 存在一样的连接节点
      if (tmp.target === target.target && tmp.source === target.source) {
        console.log('存在一样的连接节点');
        deleteNode(target);
        return;
      }
    }
    // 根据节点关系判断是否删除节点
    let flag = false; // 设置是否删除该线的标识
    flag = judgeLineByNode(target, [nodes, lines]);
    if (!flag) {
      console.log('存在环图需删除');
      message.warning('不允许存在环形结构');
      deleteNode(target);
    }
  };

  // 更改线
  const _updateLine = (event: any) => {
    // let keys = Object.keys(event.updateModel);
    const next = event.updateModel;
    const last = event.originModel;
    const [nodes, lines] = getAllNode();
    // 如果更改了源头 且（非锚点变更）
    if (next.source && next.source !== last.source) {
      _insertLine(event);
      // 如果改了目标节点 且（非锚点变更）
    } else if (next.target && next.target !== last.target) {
      _insertLine(event);
    } else {
      // 其他改值就无视
      return;
    }
  };

  // 关系
  const saveFn = () => {
    // 保存时条件
    // 需每个节点都有关系
    const [nodes, lines] = getAllNode();
    // nodes 必须每个节点都有关系
    const map = {};
    const nodeMap = {};
    nodes.forEach((item: any) => {
      map[item.id] = 0;
      nodeMap[item.id] = item;
    });
    let keys = Object.keys(map);
    lines.forEach((item: any) => {
      if (keys.indexOf(item.source) > -1) {
        map[item.source]++;
      }
      if (keys.indexOf(item.source) > -1) {
        map[item.target]++;
      }
    });
    let illegalKey = [];
    keys.forEach((item: any) => {
      if (map[item] === 0) {
        // 不合规数量汇总
        illegalKey.push(nodeMap[item]);
      }
    });
  };

  // 汇总绑定到 组件上
  const editorEvent = {
    // 监视插入
    onAfterChange: (event: any) => {
      console.log(event); // action: "add" //item：节点 //affectedItemIds 影响id
      if (event.action === 'add') {
        console.log('插入后');
        _insert(event);
      } else if (event.action === 'remove' && event?.item.type === 'node') {
        // 删除事件
        // 删除也要刷新node节点列表
        eventbus.$emit('flashNodeList');
      } else if (event.action === 'update') {
        // 更新事件 影响节点是node 且存在label 则更新
        if (
          Object.prototype.hasOwnProperty.call(event.updateModel, 'label') &&
          event?.item.type === 'node'
        ) {
          console.log('更新事件刷新');
          eventbus.$emit('flashNodeList');
        } else if (event?.item.type === 'edge') {
          // 影响节点是线
          // 改变线的前后节点
          console.log('影响了线');
          _updateLine(event);
        }
      }
    },
  };

  return (
    <GGEditor className={styles.editor} ref={editorRef}>
      {/* 上层按钮   相关了解 commend 组件 */}
      <Row className={styles.editorHd}>
        <Col span={24}>
          <FlowToolbar />
        </Col>
      </Row>

      {/* 编辑部分   左菜单  中间编辑  右边详情 */}
      <Row className={styles.editorBd}>
        <Col span={4} className={styles.editorSidebar}>
          <FlowItemPanel />
        </Col>
        <Col span={16} className={styles.editorContent}>
          <Flow className={styles.flow} {...editorEvent} />
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <FlowDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>

      {/* 在元素下右键浮动按钮 */}
      <FlowContextMenu />
    </GGEditor>
  );
};

export default PageView;
