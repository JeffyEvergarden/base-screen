import React, { useEffect, useState } from 'react';
// gg-editor
import { Item, withPropsAPI } from 'gg-editor';

// 通用组件相关
import { Input, Space, message, Button } from 'antd';
import { PlusSquareOutlined, EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Condition from '../../common/Condition';
import style from './index.less';

const defaultPos: any = {
  w: 80,
  h: 30,
};

const NodeList = (props: any) => {
  const { propsAPI, defaultValue, max, addNode: parentAddNode } = props;

  const [nameVal, setNameVal] = useState<string>('');

  const [nodeList, setNodeList] = useState<any[]>(defaultValue || []);

  const changeNameVal = (e: any) => {
    let val = e.target.value;
    setNameVal(val);
  };

  // 增加节点
  const addNode = () => {
    const val = nameVal.trim();
    if (!val || (val && val.length == 0)) {
      message.info('请输入有效节点名称');
      return;
    }
    // 新节点位置
    let [x, y] = getNewNodePostion();
    const newNode = {
      size: `${defaultPos.w}*${defaultPos.h}`,
      shape: 'flow-rect"',
      color: '#1890FF', //'#FA8C16',
      label: val,
      x: x,
      y: y,
    };
    setNameVal('');
    propsAPI.add('node', newNode);
    // 更新list
    reflashList();
  };
  // 获取所有节点
  const getAllNode = () => {
    const rep = propsAPI.save();
    const nodes = rep.nodes || []; // 节点
    // index：序号   id：标识  type：类型
    const edges = rep.edges || []; // 线
    //  index 、 id 、 source 、 target
    return [nodes, edges];
  };

  const getNewNodePostion = () => {
    const [nodes] = getAllNode();
    if (nodes.length === 0) {
      return [100, 100];
    } else {
      const lastNode = nodes[nodes.length - 1];
      const newX = lastNode.x + 150; // 节点左顶点
      const newY = lastNode.y + 150;
      if (max && newX + defaultPos.w < max) {
        return [newX, lastNode.y];
      } else if (max && newX > max) {
        return [lastNode.x, newY];
      } else {
        return [newX, lastNode.y];
      }
    }
  };

  const reflashList = () => {
    const [nodes] = getAllNode();
    setNodeList(nodes);
  };

  // 点击节点， 选中节点
  const clickItem = (e: MouseEvent, item: any) => {
    if (item) {
      const node = propsAPI.find(item.id);
      console.log(node);
      propsAPI.currentPage.setSelected(node);
    }
  };

  // 删除节点
  const deleteNode = (item: any, index: any) => {
    propsAPI.remove(item.id); // 删除节点
    reflashList(); //; 刷新
  };

  // 切换成编辑模式
  const changeMode = (item: any, index: any) => {
    if (!item.edit) {
      // 切成编辑
      item.inputVal = item.label;
    } else {
      // 切回文本
      if (item.inputVal && item.inputVal.trim()) {
        item.label = item.inputVal;
        // 节点label变更
        propsAPI.update(item.id, {
          label: item.label,
        });
      }
    }
    item.edit = !item.edit;
    // 刷新
    setNodeList([...nodeList]);
  };

  // 输入框编辑
  const changeItemInput = (e: any, item: any) => {
    item.inputVal = e.target.value;
    setNodeList([...nodeList]);
  };

  const test = () => {
    console.log('propsAPI:');
    console.log(propsAPI);
    console.log('获取画布：');
    console.log(propsAPI.currentPage);
    console.log(propsAPI.currentPage.getGraph());
    console.log('获取选择节点：');
    console.log(propsAPI.getSelected());
    console.log('获取选择节点：');
    console.log(propsAPI.save());
  };

  useEffect(() => {
    console.log('重新渲染');
  }, []);

  return (
    <div className={style['node-box']}>
      <div className={style['node-header']}>
        <Input value={nameVal} placeholder="请输入新的任务名" onChange={changeNameVal} allowClear />
        <PlusSquareOutlined
          onClick={addNode}
          style={{ fontSize: 20, color: '#1890ff', paddingLeft: '8px' }}
        />
      </div>
      <div style={{ padding: '10px 0' }}>
        <h3 onClick={test}>已创建节点：</h3>
      </div>
      <div className={style['node-content']}>
        {nodeList.map((item: any, index: any) => {
          return (
            <div key={item.id} className={style['node-item']}>
              <Condition r-if={!item.edit}>
                <div className={style['node-item_label']} onClick={(e: any) => clickItem(e, item)}>
                  {item.label || '---'}
                </div>
              </Condition>

              <Condition r-if={item.edit}>
                <div className={style['node-item_label']}>
                  <Input
                    value={item.inputVal}
                    className={style['node-item_input']}
                    onPressEnter={() => {
                      changeMode(item, index);
                    }}
                    onChange={(e: any) => changeItemInput(e, item)}
                  />
                </div>
              </Condition>

              <Space>
                <EditOutlined
                  style={{ color: '#1890ff' }}
                  onClick={() => {
                    changeMode(item, index);
                  }}
                />
                <MinusCircleOutlined
                  style={{ color: '#ff4d4f' }}
                  onClick={() => deleteNode(item, index)}
                />
              </Space>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withPropsAPI(NodeList as any);
