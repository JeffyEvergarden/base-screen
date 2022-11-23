import { formatePercent, formateWanNum, formateNumer } from '../../util';
import style from '../../style.less';

const columns = [
  {
    dataIndex: 'channel',
    key: 'key',
    title: '渠道大类', // 渠道大类
    className: 'col_white row_first',
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
        // obj.props.rowSpan = 0;
      }
      return obj;
    },
  },
  {
    dataIndex: 'inPartsNumberByDay',
    title: '本日进件量',
    align: 'right',
    render: (text: any, row: any, index: any) => {
      return formateWanNum(text) || 0;
    },
  },
  {
    dataIndex: 'loansMoneyByDay',
    title: '本日放款金额',
    align: 'right',
    render: (text: any, row: any, index: any) => {
      return formateWanNum(text) || 0;
    },
  },
  {
    dataIndex: 'growthBalanceByDay',
    title: '本日净增余额',
    align: 'right',
    render: (text: any, row: any, index: any) => {
      return formateWanNum(text) || 0;
    },
  },
  {
    dataIndex: 'inPartsNumberByMonth',
    title: '本月进件量',
    align: 'right',
    className: 'row_blue',
    render: (text: any, row: any, index: any) => {
      return formateWanNum(text) || 0;
    },
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
    title: '本月放款金额',
    align: 'right',
    className: 'row_blue',
    render: (text: any, row: any, index: any) => {
      return formateWanNum(text) || 0;
    },
  },
  {
    dataIndex: 'growthBalanceByMonth',
    title: '本月净增余额',
    align: 'right',
    className: 'row_blue',
    render: (text: any, row: any, index: any) => {
      return formateWanNum(text) || 0;
    },
  },
  {
    dataIndex: 'growthBalanceByYear',
    title: '本年净增余额',
    align: 'right',
    className: 'row_blue_sp',
    render: (text: any, row: any, index: any) => {
      return formateWanNum(text) || 0;
    },
  },
  {
    dataIndex: 'loanBalance',
    title: '贷款余额',
    align: 'right',
    className: 'row_blue_sp',
    render: (text: any, row: any, index: any) => {
      return formateWanNum(text) || 0;
    },
  },
];

// 需要增重的字段
const needWeightColumns: any[] = [
  '中邮钱包',
  '支付宝',
  '蚂蚁金服',
  '京东金融',
  '手机银行',
  '微信',
  '直贷中心',
];

const genColumn = (base: number) => {
  return [
    {
      dataIndex: 'channel',
      key: 'key',
      title: '渠道大类', // 渠道大类
      className: 'row_first',
      render: (text: any, row: any, index: any) => {
        return text;
      },
      onCell: (row: any, index: any) => {
        const obj: any = {};
        if (row.channel === '线上') {
          // console.log('-------')
          // console.log(row.rowSpan)
          obj.rowSpan = row.rowSpan;
        } else if (row.channel === '线下') {
          obj.rowSpan = row.rowSpan;
        } else if (row.channel === '合计') {
          obj.colSpan = 2; // 两列
        } else if (row.channel === '其他') {
          // 不作处理
        } else {
          obj.colSpan = 0;
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
        //
        if (needWeightColumns.includes(text)) {
          return <span className={style['fs_sp']}>{text}</span>;
        } else {
          return text;
        }
      },
      onCell: (row: any, index: any) => {
        const obj: any = {};
        if (row.channel === '合计') {
          obj.colSpan = 0;
        } else if (row.channel === '其他') {
          // obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      dataIndex: 'inPartsNumberByDay',
      title: '本日进件量',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateNumer(text) || 0;
      },
    },
    {
      dataIndex: 'loansMoneyByDay',
      title: '本日放款金额',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'growthBalanceByDay',
      title: '本日净增余额',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'inPartsNumberByMonth',
      title: '本月进件量',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateNumer(text) || 0;
      },
    },
    {
      dataIndex: 'passRateMonth',
      title: '本月审批通过率',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formatePercent(text);
      },
    },
    {
      dataIndex: 'loansMoneyByMonth',
      title: '本月放款金额',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'growthBalanceByMonth',
      title: '本月净增余额',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'growthBalanceByYear',
      title: '本年净增余额',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
    {
      dataIndex: 'loanBalance',
      title: '贷款余额',
      align: 'right',
      render: (text: any, row: any, index: any) => {
        return formateWanNum(text) || 0;
      },
    },
  ];
};

// console.log(testData);

export { columns, genColumn };
