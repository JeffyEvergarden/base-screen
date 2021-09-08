import { Col, Row } from 'antd';
import GGEditor, { Flow } from 'gg-editor';

import { PageContainer } from '@ant-design/pro-layout';
import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import styles from './index.less';

GGEditor.setTrackable(false);

export default () => {
  const editorEvent = {
    onBeforeAddItem: (node: any) => {
      console.log('插入前测试');
      console.log(node);
    },
    beforeadditem: (node: any) => {
      console.log('插入前测试');
      console.log(node);
    },
  };

  return (
    <PageContainer content="千言万语不如一张图，流程图是表示算法思路的好方法">
      <GGEditor className={styles.editor}>
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
            <Flow
              className={styles.flow}
              {...editorEvent}
            />
          </Col>
          <Col span={4} className={styles.editorSidebar}>
            <FlowDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>

        {/* 在元素下右键浮动按钮 */}
        <FlowContextMenu />
      </GGEditor>
    </PageContainer>
  );
};
