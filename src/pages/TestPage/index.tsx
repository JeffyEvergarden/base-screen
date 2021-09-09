import React, { useRef, useEffect } from 'react';
import { Col, Row } from 'antd';

import FlowPage from '../flow';
import { PageContainer } from '@ant-design/pro-layout';

const PageView = (props: any) => {
  const insertNode = (node: any) => {
    console.log('外层监测到插入Node');
    console.log(node);
  };

  const removeNode = (node: any) => {
    console.log('外层监测到删除Node');
    console.log(node);
  };

  const save = (obj: any) => {
    console.log('保存提交', obj);
  };

  const fake = useRef<any>(null);
  // 初始化测试
  useEffect(() => {
    (fake.current as any).init({
      nodes: [
        {
          id: '03c9203b',
          color: '#78f3f3',
          label: 'fake',
          shape: 'flow-rect',
          size: '80*30',
          taskId: 'fake',
          x: 100,
          y: 100,
        },
      ],
    });
  }, []);

  return (
    <PageContainer content="千言万语不如一张图，流程图是表示算法思路的好方法">
      <FlowPage insertNode={insertNode} removeNode={removeNode} save={save} cref={fake} />
    </PageContainer>
  );
};

export default PageView;
