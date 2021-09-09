import { Col, Row, message } from 'antd';
import GGEditor, { Flow, Item } from 'gg-editor';

import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import styles from './index.less';
import { useEffect, useMemo, useRef } from 'react';
import { judgeLineByNode } from './util';

GGEditor.setTrackable(false);

interface PageViewProps {
  insertNode?: (node: any) => void;
  insertLine?: (node: any) => void;
}

const PageView = (props: PageViewProps) => {
  const { insertNode, insertLine } = props;

  const editorRef = useRef<any>(null);

  useEffect(() => {
    console.log(editorRef.current?.propsAPI);
  }, []);

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
      } else if (event?.item.type === 'edge') {
        // 节点是线 （线不能随便连）
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
    // 找到其他线的尾节点必须
    for (let i = 0; i < arr.length; i++) {
      let tmp = arr[i];
      // 存在一样的连接节点
      if (tmp.target === target.target && tmp.soucre === target.source) {
        console.log('存在一样的连接节点');
        deleteNode(target);
        return
      }
    }
    // 根据节点关系判断是否删除节点
    let flag = false; // 设置是否删除该线的标识
    flag = judgeLineByNode(target, [nodes, lines]);
    if (!flag) {
      console.log('存在环图需删除')
      message.warning('不允许存在环形结构')
      deleteNode(target);
    }
  };

  // 汇总绑定到 组件上
  const editorEvent = {
    // 监视插入
    onAfterChange: (event: any) => {
      console.log(event); // action: "add" //item：节点 //affectedItemIds 影响id
      if (event.action === 'add') {
        console.log('插入后');
        _insert(event);
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
