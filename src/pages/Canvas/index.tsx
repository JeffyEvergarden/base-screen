import React, { useState, useEffect } from 'react';
import { Col, Row, Tabs, Button } from 'antd';
import GGEditor, { Flow, ItemPanel } from 'gg-editor';

import { PageContainer } from '@ant-design/pro-layout';
// minimap
import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import styles from './index.less';
import { withPropsAPI } from 'gg-editor';

GGEditor.setTrackable(false);
const { TabPane } = Tabs;

const initialPanes = [{ title: '关系依赖图', content: '关系依赖图', key: '000', closable: false }];
// export default (props:any) => {
const FlowIndex: any = (props: any) => {

  const { propsAPI } = props;

  const [data, setData] = useState<any>();
  const [panes, setPanes] = useState<any>(initialPanes); // tabs的数组
  const [activeKey, setActiveKey] = useState<any>('000'); // 当前选择的 tabs 标签
  const [deleteTabs, setDeleteTabs] = useState<any>({}); // 删除tabs

  useEffect(() => {
    setActiveKey('000'); // 
  }, []);

  useEffect(()=> {
    console.log("打印实时接受的data", data, deleteTabs);
    let newPanes = panes?.filter((item:any)=>{
      return item.key !== deleteTabs.key
    });
    setPanes(newPanes);
  }, [data, deleteTabs]);

  const changeTabs = (e: any) => {
    setActiveKey(e);
  };

  const editTabs = (targetKey: any, action: any) => { // 操作tabs
    console.log('edit', action, targetKey);
    let newActiveKey = activeKey;
    let lastIndex: number = 0;
    panes.forEach((pane: any, i: number) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane: any) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const getTaskList = (item: any, list: any) => { // 获取列表 当前新增的那一条数据，对应 tabs 的展示
    console.log("d打印一下任务列表取得的数据", item, list)
    let newPanes = [...panes];
    let a = newPanes.every((its: any) => {
      return its.key !== item.key
    })
    if (a) {
      newPanes.push({
        title: item.title || item.label,
        content: '',
        key: item.key,
      });
      setPanes(newPanes);
    }
  };

  const saveCanvas = () => {
    console.log('sacve', data)
  };

  return (
    <PageContainer>
      
      <GGEditor className={styles.editor}>
        
        <Row className={styles.editorBd} wrap={false}>
          <Col span={4} className={styles.editorSidebar}>
            <FlowItemPanel data={data} setData={setData} getTaskList={getTaskList} setDeleteTabs={setDeleteTabs} />
          </Col>

          {
            activeKey !== '000' &&
            <Col span={20} className={styles.editorContent}>
              <Tabs
                type="editable-card"
                onChange={changeTabs}
                activeKey={activeKey}
                onEdit={editTabs}
                hideAdd
                tabBarStyle={{ margin: 0 }}
              >
                {panes.map((pane: any) => (
                  <React.Fragment key={pane.key}>
                    <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                      {pane.key !== '000' && pane.title}
                    </TabPane>
                  </React.Fragment>
                ))}
              </Tabs>
            </Col>
          }

          <Col span={20} className={styles.editorContent}>
            <Tabs
              type="editable-card"
              onChange={changeTabs}
              activeKey={activeKey}
              onEdit={editTabs}
              hideAdd
              tabBarStyle={{ margin: 0 }}
            >
              {panes.map((pane: any) => (
                <React.Fragment key={pane.key}>
                  <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                    {pane.key !== '000' && pane.title}
                  </TabPane>
                </React.Fragment>
              ))}
            </Tabs>
            {/* <FlowToolbar setData={setData} /> */}
            <span className={styles.span_Style} onClick={saveCanvas}>保存</span>
            <Flow className={styles.flow} data={data} />
          </Col>
        </Row>

        {/* <FlowContextMenu /> */}
      </GGEditor>
    </PageContainer>
  )
};

export default withPropsAPI(FlowIndex);
