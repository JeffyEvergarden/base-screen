import { Divider, Tag } from 'antd';
import { Toolbar,withPropsAPI} from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import styles from './index.less';
import React, {useEffect} from 'react';
import { PresetColorTypes } from 'antd/lib/_util/colors';

const FlowToolbar = (props: any, context?:any):any => {
  const { propsAPI } = props;
  const saveNode = () => {
    let data = propsAPI.save();
    let a = {
      nodes: [
        {
          color: "#FA8C16",
          id: "b0q144k2e2p",
          index: 0,
          label: "1",
          shape: "flow-rect\"",
          size: "70*36",
          x: 64,
          y: 64,
        },
        {
          color: "#FA8C16",
          id: "kjc8ttgpijj",
          index: 1,
          label: "3",
          shape: "flow-rect\"",
          size: "70*36",
          x: 280,
          y: 64,
        },
      ],
      edges: [
        {
          id: "bf064765",
          index: 3,
          source: "b0q144k2e2p",
          sourceAnchor: 1,
          target: "aysdjdydl4j",
          targetAnchor: 3,
        },
        {
          id: "4586a599",
          index: 4,
          source: "aysdjdydl4j",
          sourceAnchor: 1,
          target: "kjc8ttgpijj",
          targetAnchor: 3,
        }
      ]
    }
    console.log("打印获取的节点数据", data)
    props.setData(data);
  };


  return  (
  <Toolbar className={styles.toolbar}>
    <ToolbarButton command="undo" />
    <ToolbarButton command="redo" />
    <Divider type="vertical" />
    {/* <ToolbarButton command="copy" /> */}
    <ToolbarButton command="paste" />
    {/* <ToolbarButton command="delete" /> */}
    <Divider type="vertical" />
    <ToolbarButton command="zoomIn" icon="zoom-in" text="Zoom In" />
    <ToolbarButton command="zoomOut" icon="zoom-out" text="Zoom Out" />
    <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
    <ToolbarButton command="resetZoom" icon="actual-size" text="Actual Size" />
    <Divider type="vertical" />
    <ToolbarButton command="toBack" icon="to-back" text="To Back" />
    <ToolbarButton command="toFront" icon="to-front" text="To Front" />
    <Divider type="vertical" />
    <ToolbarButton command="multiSelect" icon="multi-select" text="Multi Select" />
    {/* <ToolbarButton command="addGroup" icon="group" text="Add Group" /> */}
    {/* <ToolbarButton command="unGroup" icon="ungroup" text="Ungroup" /> */}
    <Tag onClick={saveNode}>保存</Tag>
  </Toolbar>)
  }
;

export default withPropsAPI(FlowToolbar);
