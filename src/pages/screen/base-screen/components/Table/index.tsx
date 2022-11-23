import React, { useState, useMemo, useCallback } from 'react';
import { Table } from 'antd';
import { Title } from '../common';
import { genColumn } from './config';
import style from '../../style.less';

import instyle from './style.less';

interface tableProps {
  data: any[];
  base?: number;
  activeObj?: any;
}

const colorClassMap = {
  '#668EFF': instyle['active-blue'],
  '#36CBCB': instyle['active-green'],
  '#4ECB73': instyle['active-deepGreen'],
  '#FFC751': instyle['active-yellow'],
  '#F6946F': instyle['active-orange'],
  '#F9526E': instyle['active-red'],
  '#975FE5': instyle['active-purple'],
};

// 表格

const TableView: React.FC<tableProps> = (props: tableProps) => {
  const { data = [], base = 1, activeObj } = props;

  const diyRowClassName = useCallback(
    (record: any, index: number) => {
      if (activeObj?.name === record.channelName && activeObj.type === 'active') {
        let color = activeObj?.color;
        let colorClass = colorClassMap[color];
        console.log(colorClass);
        return colorClass;
      } else {
        return '';
      }
    },
    [activeObj],
  );

  const columns = useMemo(() => {
    return genColumn(base);
  }, [base, activeObj]);

  if (data && data.length > 0) {
    return (
      <>
        <div className={`${style['table-box']} animate__animated animate__fadeInLeft`}>
          <div className={style['title-3']}>
            <Title title="各渠道关键业务量指标" />
          </div>

          <Table
            rowClassName={diyRowClassName}
            columns={columns as any}
            dataSource={data}
            pagination={false}
          ></Table>
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
