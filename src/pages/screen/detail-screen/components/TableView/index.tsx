import React, { useState, useMemo } from 'react';
import { Table } from 'antd';
import { genColumn } from '../TableView/config';
import style from '../../style.less';

interface tableProps {
  data: any[];
  base?: number;
  onClick?: (...args: any[]) => void;
}

// 表格

const TableView: React.FC<tableProps> = (props: tableProps) => {
  const { data = [], base = 1, onClick } = props;

  const onClickText = (text: any) => {
    onClick?.(text);
  };

  const Columns = useMemo(() => {
    return genColumn(onClickText);
  }, [base]);

  return (
    <div className={style['table-box']}>
      {data && data.length > 0 && (
        <Table columns={Columns as any} dataSource={data} pagination={false}></Table>
      )}
    </div>
  );
};

export default TableView;
