// import * as echarts from 'echarts';

// 渐变色
const colors = [
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#668EFF', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#2E65FF', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#36CBCB', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#1ABBBB', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#4ECB73', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#00BA6E', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#FFC751', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#FEA137', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#F6946F', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#FF8330', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#F9526E', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#FF474D', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#975FE5', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#975FE5', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
];

// 虚拟数据源
const testData: any = [
  { value: 1048, name: '中邮钱包', realPercent: '10%' },
  { value: 735, name: '支付宝', realPercent: '10%' },
  { value: 580, name: '微信', realPercent: '10%' },
  { value: 484, name: '手机银行', realPercent: '10%' },
  { value: 300, name: '蚂蚁金服务', realPercent: '10%' },
  { value: 250, name: 'fuck', realPercent: '10%' },
  { value: 300, name: '其他', realPercent: '10%' },
];

const option = {
  color: colors,
};

export { option, testData };
