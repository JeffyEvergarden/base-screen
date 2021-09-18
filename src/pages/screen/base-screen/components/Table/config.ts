import { formatePercent } from '../../util';

const columns = [
  {
    dataIndex: 'channel',
    key: 'key',
    title: '渠道大类', // 渠道大类
    className: 'col_white',
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
      } else if (text === '其他') {
        obj.props.colSpan = 2;
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
    className: 'col_white',
    render: (text: any, row: any, index: any) => {
      const obj: any = {
        children: text,
        props: {},
      };
      // console.log(row)
      if (row.channel === '合计') {
        obj.props.colSpan = 0;
      } else if (row.channel === '其他') {
        obj.props.rowSpan = 0;
      }
      return obj;
    },
  },
  {
    dataIndex: 'inPartsNumberByDay',
    title: '本日进件量',
    align: 'right',
  },
  {
    dataIndex: 'loansMoneyByDay',
    title: '本日放贷金额',
    align: 'right',
  },
  {
    dataIndex: 'growthBalanceByDay',
    title: '本日净增余额',
    align: 'right',
  },
  {
    dataIndex: 'inPartsNumberByMonth',
    title: '本月进件量',
    align: 'right',
    className: 'row_blue',
  },
  {
    dataIndex: 'passRateMonth',
    title: '本月审批通过率',
    align: 'right',
    className: 'row_blue',
    render: (text: any, row: any, index: any) => {
      return formatePercent(text);
    },
  },
  {
    dataIndex: 'loansMoneyByMonth',
    title: '本月放贷金额',
    align: 'right',
    className: 'row_blue',
  },
  {
    dataIndex: 'growthBalanceByMonth',
    title: '本月净增余额',
    align: 'right',
    className: 'row_blue',
  },
  {
    dataIndex: 'growthBalanceByYear',
    title: '本年净增余额',
    align: 'right',
    className: 'row_blue_sp',
  },
  {
    dataIndex: 'loanBalance',
    title: '贷款余额',
    align: 'right',
    className: 'row_blue_sp',
  },
];

// 测试数据
const testData = initData();

function initData(): any[] {
  let arr: any = [];
  const channels = ['线上', '线下', '其他', '合计'];
  const onlineType = [
    '中邮钱包',
    '蚂蚁金服',
    '京东金融',
    '手机银行',
    '邮政储蓄H5及其他',
    '微众银行',
    '微信',
    '其他线下渠道',
  ];
  const offlineType = ['植贷中心', '京东金融', '蚂蚁金服', '邮政储蓄网点', '其他线下渠道'];
  channels.forEach((text: any, j: number) => {
    if (text === '线上') {
      onlineType.forEach((text2: any, i: number) => {
        let tmp = {
          key: `${j}-${i}`,
          channel: i === 0 ? text : '',
          type: text2,
          day_num1: 226,
          day_num2: 226,
          day_num3: 226,
          month_num1: 226,
          month_num2: 226,
          month_num3: 226,
          month_num4: 226,
          year_num1: 226,
          total: 226,
        };
        arr.push(tmp);
      });
    } else if (text === '线下') {
      offlineType.forEach((text2: any, i: number) => {
        let tmp = {
          key: `${j}-${i}`,
          channel: i === 0 ? text : '',
          type: text2,
          day_num1: 226,
          day_num2: 226,
          day_num3: 226,
          month_num1: 226,
          month_num2: 226,
          month_num3: 226,
          month_num4: 226,
          year_num1: 226,
          total: 226,
        };
        arr.push(tmp);
      });
    } else {
      let tmp = {
        key: `${j}-${100}`,
        channel: text,
        type: text,
        day_num1: 226,
        day_num2: 226,
        day_num3: 226,
        month_num1: 226,
        month_num2: 226,
        month_num3: 226,
        month_num4: 226,
        year_num1: 226,
        total: 226,
      };
      arr.push(tmp);
    }
  });

  return arr;
}

// console.log(testData);

export { columns, testData };
