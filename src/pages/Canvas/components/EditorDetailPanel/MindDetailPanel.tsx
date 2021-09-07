import { CanvasPanel, DetailPanel, NodePanel } from 'gg-editor';

import { Card } from 'antd';
import DetailForm from './DetailForm';
import styles from './index.less';
import React from 'react';

const MindDetailPanel = () => (
  <DetailPanel className={styles.detailPanel}>
    <NodePanel>
      <DetailForm type="node" />
    </NodePanel>
    <CanvasPanel>
      <Card type="inner" size="small" title="Canvas" bordered={false} />
    </CanvasPanel>
  </DetailPanel>
);

export default MindDetailPanel;
