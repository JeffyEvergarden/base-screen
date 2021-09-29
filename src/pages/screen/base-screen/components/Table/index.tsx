import React, { useState, useMemo } from 'react';
import { Table } from 'antd';
import { Title } from '../common';
import { columns, testData, genColumn } from './config';
import style from '../../style.less';

interface tableProps {
  data: any[];
  base?: number;
}

// 表格

const TableView: React.FC<tableProps> = (props: tableProps) => {
  const { data = [], base = 1 } = props;

  const columns = useMemo(() => {
    return genColumn(base);
  }, [base]);

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
