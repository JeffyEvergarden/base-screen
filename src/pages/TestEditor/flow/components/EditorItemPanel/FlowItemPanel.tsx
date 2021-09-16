import { Item, ItemPanel } from 'gg-editor';
import { Card } from 'antd';
import MyNodeList from './NodeList';
import styles from './index.less';
import { DetailPanel, NodePanel } from 'gg-editor';

interface PanelProps {
  addNode?: (node: any) => void;
  clickItem?: (node: any) => void;
}

const FlowItemPanel = (props: PanelProps) => {
  const { clickItem } = props;
  return (
    <ItemPanel className={styles.itemPanel}>
      <Card bordered={false}>
        <MyNodeList clickItem={clickItem} />
      </Card>
    </ItemPanel>
  );
};

export default FlowItemPanel;
