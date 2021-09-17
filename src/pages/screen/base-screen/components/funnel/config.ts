// import * as echarts from 'echarts';

// 文字颜色
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

// 转换线渐变
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

// 基本配置
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

// 生产转换线
const getLine = (base: number, data: any[]) => {
  if (data.length < 5) {
    return null;
  }
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
          curveness: 8,
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
          curveness: -8,
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

export { option, getLine };
