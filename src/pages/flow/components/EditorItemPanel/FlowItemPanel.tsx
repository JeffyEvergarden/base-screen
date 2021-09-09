import { Item, ItemPanel } from 'gg-editor';
import { Card } from 'antd';
import MyNodeList from './NodeList';
import styles from './index.less';
import { DetailPanel, NodePanel } from 'gg-editor';

interface PanelProps {
  addNode?: (node: any) => void;
}

const FlowItemPanel = (props: PanelProps) => {
  return (
    <ItemPanel className={styles.itemPanel}>
      <Card bordered={false}>
        <MyNodeList />
      </Card>
    </ItemPanel>
  );
};

export default FlowItemPanel;
