import React, { useState } from 'react';
import { Table } from 'antd';
import { Title } from '../common';
import { columns, testData } from './config';
import style from '../../style.less';

// 表格

const TableView: React.FC = (props: any) => {
  return (
    <div className={style['table-box']}>
      <div className={style['title-3']}>
        <Title title="各渠道关键业务量指标" />
      </div>

      <Table columns={columns as any} dataSource={testData} pagination={false}></Table>
    </div>
  );
};

export default TableView;
