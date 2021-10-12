import React from 'react';
import style from '../../style.less';
import { formatePercent, formateWanNum, formateNumer } from '../../util';

const genColumn = (onClick?: (...args: any[]) => void) => {
  return [
    {
      dataIndex: 'channel',
      key: 'key',
      title: '渠道大类', // 渠道大类
      align: 'center',
      className: 'col_white col_first',
      render: (text: any, row: any, index: any) => {
        const obj: any = {
          children: text,
          props: {},
        };
        if (text === '线上') {
          obj.props.rowSpan = row.rowSpan;
        } else if (text === '线下') {
          obj.props.rowSpan = row.rowSpan;
        } else if (text === '合计') {
          obj.props.colSpan = 2; // 两列
          obj.children = (
            <div
              className={style['text_click']}
              onClick={() => {
                onClick?.(text, row);
              }}
            >
              {text}
            </div>
          );
        } else if (text === '其他') {
          // 不作处理
        } else {
          obj.props.colSpan = 0;
        }
        return obj;
      },
    },
    {
      dataIndex: 'channelName',
      key: 'key',
      title: '渠道', // 渠道大类
      className: 'col_two',
      render: (text: any, row: any, index: any) => {
        const obj: any = {
          children: text,
          props: {},
        };
        // console.log(row)
        if (row.channel === '合计') {
          obj.props.colSpan = 0;
        } else if (row.channel === '其他') {
          // obj.props.rowSpan = 0;
        } else {
          obj.children = (
            <div
              className={style['text_click']}
              onClick={() => {
                onClick?.(text, row);
              }}
            >
              {text}
            </div>
          );
        }
        return obj;
      },
    },
    {
      dataIndex: 'inPartsNumberByDay',
      title: '本日进件笔数 (万笔)',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'loansMoneyByDay',
      title: '审批通过率',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'growthBalanceByDay',
      title: '提现笔数 (万笔)',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'inPartsNumberByMonth',
      title: '提现通过率',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'passRateMonth',
      title: '放款金额 (亿元)',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formatePercent(text);
      },
    },
    {
      dataIndex: 'loansMoneyByMonth',
      title: '还款金额 (亿元)',
      align: 'right',
      // className: 'row_blue',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'growthBalanceByMonth',
      title: '核销金额 (亿元)',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'loanBalance',
      title: '贷款余额 (亿元)',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
  ];
};

export { genColumn };
