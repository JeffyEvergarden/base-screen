import React, {useState, useEffect} from 'react';
import { Item, ItemPanel } from 'gg-editor';
import { withPropsAPI } from 'gg-editor';
import { Card, Input, message, Space, Popover } from 'antd';
import styles from './index.less';

import { PlusCircleFilled, EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const FlowItemPanel = (props: any):any => {
  const { propsAPI } = props;
  const [tasksList, setTasksList] = useState<any>([]); // 任务列表
  const [taskValue, setTaskValue] = useState<any>({ // 当前input输入框的值，转换成对象
    title: '',
    content: '',
    key: '',
  });
  let random = 32;

  const getTaskValue = (e: any): any => {
    let b = {
      title: e.target.value || '',
      content: e.target.value || '',
      key: new Date().getTime().toString(),
    };
    setTaskValue(b);
  };

  const addTasks = (): any => {
    if (!taskValue.title || (taskValue.title && taskValue.title.length == 0)) {
      return message.info('请输入任务名');
    };
    let a = tasksList.every((item:any)=>{
      return item.label !== taskValue.title
    })
    // console.log("a", a, tasksList, taskValue.title)
    if(!a){
      return message.info("任务名不能相同")
    }
    let newData = [...tasksList];
    newData.push({
      x: 20,
      y: 20,
      label: taskValue.title,
      key: taskValue.key,
    });
    // console.log("手动添加的任务", newData);
    setTasksList(newData);
    props.getTaskList(taskValue, newData); // 将当前新增的数据传递出去，对应 新增一条 tabspane
    
    propsAPI.add('node', {
      size: '70*36',
      shape: 'flow-rect"',
      color: '#FA8C16',
      label: taskValue.title,
      x: 32+random,
      y: 32+random,
      id: Math.random().toString(36).substr(2),
      index: 987,
    });
    random += 32;
    let newa = propsAPI.save();
    props.setData(newa);
  };

  const taskItemClick = (e:any, v:any) => {
    props.getTaskList(v, tasksList);
    // console.log("打印点击的item-task", v);
  };

  const deleteNode = (data:any) => {
    let allDatas = props?.data || {};
    
    let thisNodes = allDatas?.nodes?.filter((item:any)=>{
      return item.label == data.label
    })
    // console.log("打印所有的节点", props, data, thisNodes);
    propsAPI.remove(thisNodes[0].id);
    let newData = propsAPI.save();
    props.setData(newData);
    props.setDeleteTabs(data);
    
    let newTaskList:[] = tasksList?.filter((item:any)=>{
      return item.key !== data.key
    });
    setTasksList(newTaskList);
  };

  return (
    <ItemPanel className={styles.itemPanel}>
      <div
        style={{
          width: '100%',
          borderBottom: '1px solid lightgray',
          fontSize: 16,
          fontWeight: 700,
          padding: 7,
        }}
      >
        任务列表
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          padding: 10,
        }}
      >
        <Input
          style={{ flex: 1 }}
          placeholder="请输入任务名"
          onChange={getTaskValue}
          allowClear
        />
        <PlusCircleFilled
          onClick={addTasks}
          style={{ fontSize: 20, color: '#1890ff', paddingLeft: 4 }}
        />
      </div>

      <div style={{ marginTop: 6, padding: '0 10px' }}>
        {tasksList &&
          tasksList.map((item: any) => {
            return (
              <div
                key={item.key}
                style={{
                  marginTop: 5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{flex: '1'}} onClick={(e) => taskItemClick(e, item)}>{item.label || '~~~'}</span>
                <Space>
                  <EditOutlined />
                  <EllipsisOutlined onClick={()=>deleteNode(item)} />
                </Space>
              </div>
            );
          })}
      </div>
    </ItemPanel>
  )
};

export default withPropsAPI(FlowItemPanel);

{/* <ItemPanel className={styles.itemPanel}>
    <Card bordered={false}>
      <Item
        type="node"
        size="72*72"
        shape="flow-circle"
        model={{
          color: '#FA8C16',
          label: 'Start',
        }}
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxjaXJjbGUgaWQ9ImIiIGN4PSIzNiIgY3k9IjM2IiByPSIzNiIvPjxmaWx0ZXIgeD0iLTkuNyUiIHk9Ii02LjklIiB3aWR0aD0iMTE5LjQlIiBoZWlnaHQ9IjExOS40JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iYSI+PGZlT2Zmc2V0IGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDQgMCIgaW49InNoYWRvd0JsdXJPdXRlcjEiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0IDIpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGwtb3BhY2l0eT0iLjkyIiBmaWxsPSIjRkZGMkU4IiB4bGluazpocmVmPSIjYiIvPjxjaXJjbGUgc3Ryb2tlPSIjRkZDMDY5IiBjeD0iMzYiIGN5PSIzNiIgcj0iMzUuNSIvPjwvZz48dGV4dCBmb250LWZhbWlseT0iUGluZ0ZhbmdTQy1SZWd1bGFyLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgMikiPjx0c3BhbiB4PSIyMyIgeT0iNDEiPlN0YXJ0PC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=="
      />
      <Item
        type="node"
        size="80*48"
        shape="flow-rect"
        model={{
          color: '#1890FF',
          label: 'Normal',
        }}
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxyZWN0IGlkPSJiIiB4PSIwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHJ4PSI0Ii8+PGZpbHRlciB4PSItOC44JSIgeT0iLTEwLjQlIiB3aWR0aD0iMTE3LjUlIiBoZWlnaHQ9IjEyOS4yJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iYSI+PGZlT2Zmc2V0IGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDQgMCIgaW49InNoYWRvd0JsdXJPdXRlcjEiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0IDIpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGwtb3BhY2l0eT0iLjkyIiBmaWxsPSIjRTZGN0ZGIiB4bGluazpocmVmPSIjYiIvPjxyZWN0IHN0cm9rZT0iIzE4OTBGRiIgeD0iLjUiIHk9Ii41IiB3aWR0aD0iNzkiIGhlaWdodD0iNDciIHJ4PSI0Ii8+PC9nPjx0ZXh0IGZvbnQtZmFtaWx5PSJQaW5nRmFuZ1NDLVJlZ3VsYXIsIFBpbmdGYW5nIFNDIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii42NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNCAyKSI+PHRzcGFuIHg9IjIxIiB5PSIyOSI+Tm9ybWFsPC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=="
      />
      <Item
        type="node"
        size="80*72"
        shape="flow-rhombus"
        model={{
          color: '#13C2C2',
          label: 'Decision',
        }}
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODYiIGhlaWdodD0iNzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGQ9Ik00Mi42NyAxLjY3bDM0Ljk2NSAzMS4zNTJhNCA0IDAgMCAxIDAgNS45NTZMNDIuNjcgNzAuMzNhNCA0IDAgMCAxLTUuMzQgMEwyLjM2NSAzOC45NzhhNCA0IDAgMCAxIDAtNS45NTZMMzcuMzMgMS42N2E0IDQgMCAwIDEgNS4zNCAweiIgaWQ9ImIiLz48ZmlsdGVyIHg9Ii04LjglIiB5PSItNi45JSIgd2lkdGg9IjExNy41JSIgaGVpZ2h0PSIxMTkuNCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImEiPjxmZU9mZnNldCBkeT0iMiIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSIvPjxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93Qmx1ck91dGVyMSIgaW4yPSJTb3VyY2VBbHBoYSIgb3BlcmF0b3I9Im91dCIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA0IDAiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIi8+PC9maWx0ZXI+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMyAxKSI+PHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjYSkiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsLW9wYWNpdHk9Ii45MiIgZmlsbD0iI0U2RkZGQiIgeGxpbms6aHJlZj0iI2IiLz48cGF0aCBzdHJva2U9IiM1Q0RCRDMiIGQ9Ik00Mi4zMzcgMi4wNDJhMy41IDMuNSAwIDAgMC00LjY3NCAwTDIuNjk4IDMzLjM5NGEzLjUgMy41IDAgMCAwIDAgNS4yMTJsMzQuOTY1IDMxLjM1MmEzLjUgMy41IDAgMCAwIDQuNjc0IDBsMzQuOTY1LTMxLjM1MmEzLjUgMy41IDAgMCAwIDAtNS4yMTJMNDIuMzM3IDIuMDQyeiIvPjwvZz48dGV4dCBmb250LWZhbWlseT0iUGluZ0ZhbmdTQy1SZWd1bGFyLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMSkiPjx0c3BhbiB4PSIxOCIgeT0iNDIiPkRlY2lzaW9uPC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=="
      />
      <Item
        type="node"
        size="80*48"
        shape="flow-capsule"
        model={{
          color: '#722ED1',
          label: 'Model',
        }}
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxyZWN0IGlkPSJiIiB4PSIwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHJ4PSIyNCIvPjxmaWx0ZXIgeD0iLTguOCUiIHk9Ii0xMC40JSIgd2lkdGg9IjExNy41JSIgaGVpZ2h0PSIxMjkuMiUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImEiPjxmZU9mZnNldCBkeT0iMiIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSIvPjxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93Qmx1ck91dGVyMSIgaW4yPSJTb3VyY2VBbHBoYSIgb3BlcmF0b3I9Im91dCIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA0IDAiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIi8+PC9maWx0ZXI+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNCAyKSI+PHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjYSkiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsLW9wYWNpdHk9Ii45MiIgZmlsbD0iI0Y5RjBGRiIgeGxpbms6aHJlZj0iI2IiLz48cmVjdCBzdHJva2U9IiNCMzdGRUIiIHg9Ii41IiB5PSIuNSIgd2lkdGg9Ijc5IiBoZWlnaHQ9IjQ3IiByeD0iMjMuNSIvPjwvZz48dGV4dCBmb250LWZhbWlseT0iUGluZ0ZhbmdTQy1SZWd1bGFyLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuNjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgMikiPjx0c3BhbiB4PSIyNCIgeT0iMjkiPk1vZGVsPC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg=="
      />
    </Card>
  </ItemPanel> */}
