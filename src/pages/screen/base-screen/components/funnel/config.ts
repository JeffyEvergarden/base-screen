// import * as echarts from 'echarts';

const labelColors = ['#00c473', '#2E65FF', '#FAA138', '#FC464C', '#975FE5', '#9692ff'];

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

const lineColors = [
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: '#1CD389', // 0% 处的颜色
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
    y: 1,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#FAA138', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#668EFF', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: '#FFC751', // 0% 处的颜色
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
        color: '#975FE5', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#FF6E73', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 1,
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
    name: '可触达',
    oriname: '可触达',
    number: 98756,
    color: ['rgba(29,211,137,0.8)', 'rgba(29,211,137,0)'],
  },
  {
    value: 80,
    name: '投件',
    oriname: '投件',
    number: 88756,
    color: ['rgba(102,142,255,0.7)', 'rgba(102,142,255,0)'],
  },
  {
    value: 60,
    name: '进件',
    oriname: '进件',
    number: 78756,
    color: ['rgba(255,198,82,0.6)', 'rgba(255,198,82,0)'],
  },
  {
    value: 40,
    name: '成交率',
    oriname: '成交率',
    number: 68756,
    color: ['rgba(255,110,115,0.5)', 'rgba(255,110,115,0)'],
  },
  {
    value: 20,
    name: '贏单率',
    oriname: '贏单率',
    number: 58756,
    color: ['rgba(134,131,230,0.4)', 'rgba(134,131,230,0)'],
  },
];
// 测试数据
const testData: any = [];
for (let i = 0; i < lineargroup.length; i++) {
  let obj1 = {
    value: lineargroup[i].value,
    num: lineargroup[i].number,
    name: lineargroup[i].oriname,
  };
  testData.push(obj1);
}

const option = {
  color: colors,
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
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
          const ins = d.name + ': ' + d.data.num;
          return ins;
        },
      },
    },
  ],
};

const getLine = (base: number, data: any[]) => {
  return {
    // 画箭头线
    z: 1,
    top: 30 * base,
    height: 320 * base,
    type: 'graph',
    layout: 'none',
    symbolSize: 0,
    roam: false,
    edgeSymbol: ['circle', 'arrow'],
    lineStyle: {
      width: 2,
    },
    edgeLabel: {
      show: true,
      position: 'middle',
      rotate: 0,
      borderRadius: 4,
      color: '#333',
      fontWeight: 700,
      verticalAlign: 'middle',
      fontSize: 18 * base,
      formatter: function (d: any) {
        const i = d.data.source;
        const ins = data[i].value + '%\n\n';
        return ins;
      },
    },
    data: [
      {
        name: '0',
        x: 296 * base,
        y: 0,
      },
      {
        name: '1',
        x: 296 * base,
        y: 15,
      },
      {
        name: '2',
        x: 296 * base,
        y: 30,
      },
      {
        name: '3',
        x: 296 * base,
        y: 45,
      },
      {
        name: '4',
        x: 296 * base,
        y: 60,
      },
      {
        name: '5',
        x: 296 * base,
        y: 80,
      },
    ],
    links: [
      {
        source: '0',
        target: '1',
        lineStyle: {
          curveness: 9,
          color: lineColors[0],
        },
        label: {
          color: labelColors[1],
        },
      },
      {
        source: '1',
        target: '2',

        lineStyle: {
          curveness: -9,
          color: lineColors[1],
        },
        label: {
          color: labelColors[2],
        },
      },
      {
        source: '2',
        target: '3',

        lineStyle: {
          curveness: 7,
          color: lineColors[2],
        },
        label: {
          color: labelColors[3],
        },
      },
      {
        source: '3',
        target: '4',

        lineStyle: {
          curveness: -7,
          color: lineColors[3],
        },
        label: {
          color: labelColors[4],
        },
      },
    ],
  };
};

export { option, testData, getLine };
