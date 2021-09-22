import React, { useState } from 'react';
import { Table } from 'antd';
import { Title } from '../common';
import { columns, testData } from './config';
import style from '../../style.less';

interface tableProps {
  data: any[];
}

// 表格

const TableView: React.FC<tableProps> = (props: tableProps) => {
  const { data = [] } = props;

  return (
    <div className={style['table-box']}>
      <div className={style['title-3']}>
        <Title title="各渠道关键业务量指标" />
      </div>
      {data && data.length > 0 && (
        <Table columns={columns as any} dataSource={data} pagination={false}></Table>
      )}
    </div>
  );
};

export default TableView;
