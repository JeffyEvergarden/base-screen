// import * as echarts from 'echarts';

// const colors = ['#00c473', '#2E65FF', '#FAA138', '#FC464C', '#975FE5', '#9692ff'];

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
        color: '#1CD389', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#00C473', // 100% 处的颜色
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
        color: '#FFC751', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#FAA138', // 100% 处的颜色
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
        color: '#FF6E73', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#FC464C', // 100% 处的颜色
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
        color: '#8683E6', // 0% 处的颜色
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
let lineargroup = [
  {
    value: 100,
    name: '目标',
    oriname: '意向',
    number: 98756,
    color: ['rgba(29,211,137,0.8)', 'rgba(29,211,137,0)'],
  },
  {
    value: 80,
    name: '方案率',
    oriname: '方案',
    number: 88756,
    color: ['rgba(102,142,255,0.7)', 'rgba(102,142,255,0)'],
  },
  {
    value: 60,
    name: '商務率',
    oriname: '商務',
    number: 78756,
    color: ['rgba(255,198,82,0.6)', 'rgba(255,198,82,0)'],
  },
  {
    value: 40,
    name: '成交率',
    oriname: '即將成交',
    number: 68756,
    color: ['rgba(255,110,115,0.5)', 'rgba(255,110,115,0)'],
  },
  {
    value: 20,
    name: '贏單率',
    oriname: '贏單',
    number: 58756,
    color: ['rgba(134,131,230,0.4)', 'rgba(134,131,230,0)'],
  },
];
// 测试数据
let testData: any = [];
for (var i = 0; i < lineargroup.length; i++) {
  var obj1 = {
    value: lineargroup[i].value,
    num: lineargroup[i].number,
    name: lineargroup[i].oriname,
  };
  testData.push(obj1);
}

const option = {
  color: colors,
  series: [
    {
      top: 32,
      bottom: 32,
      type: 'funnel',
      gap: 11.85,
      minSize: 196,
      left: 120,
      width: 334,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
        shadowColor: 'rgba(33, 59, 84, 0.16)',
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        shadowBlur: 6,
      },
      label: {
        show: true,
        position: 'inside',
        fontSize: 16,
        fontWeight: 900,
        color: '#FFF',
        textBorderColor: '#FFF',
        textBorderWidth: 0,
        formatter: function (d: any) {
          var ins = d.name + ': ' + d.data.num;
          return ins;
        },
      },
    },
  ],
};

export { option, testData };
