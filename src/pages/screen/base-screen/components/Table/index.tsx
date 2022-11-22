import React, { useState, useMemo } from 'react';
import { Table } from 'antd';
import { Title } from '../common';
import { genColumn } from './config';
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

  if (data && data.length > 0) {
    return (
      <>
        <div className={`${style['table-box']} animate__animated animate__fadeInLeft`}>
          <div className={style['title-3']}>
            <Title title="各渠道关键业务量指标" />
          </div>

          <Table columns={columns as any} dataSource={data} pagination={false}></Table>
        </div>
        <div className={style['title-tips']}>
          备注：结存用户数及余额指标都已剔除abs出表，金额单位为：万元
        </div>
      </>
    );
  } else {
    return <div className={style['table-box']}></div>;
  }
};

export default TableView;
