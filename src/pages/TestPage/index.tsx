import { Col, Row } from 'antd';

import FlowPage from '../flow';
import { PageContainer } from '@ant-design/pro-layout';

import { useEffect, useMemo, useRef } from 'react';

const PageView = (props: any) => {
  const insertNode = (node: any) => {
    console.log('外层插入Node');
  };

  const save = (obj: any) => {
    console.log('保存提交', obj);
  };

  return (
    <PageContainer content="千言万语不如一张图，流程图是表示算法思路的好方法">
      <FlowPage insertNode={insertNode} save={save} />
    </PageContainer>
  );
};

export default PageView;
