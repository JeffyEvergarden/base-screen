// import * as echarts from 'echarts';

import { find } from 'lodash';

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

// 找最适合的刻度线
// 43 ---> 50 2位数 50倍数
// 371 --> 100  3位数 100倍数取整
// 931 --> 1000 3位数 100倍数取整
// 1400 --> 2000 1000 倍数取整
// 3600 --> 1000 倍数取整

const getLen = (max: number) => {
  max = Math.ceil(max);
  let num = 0;
  while (max > 0) {
    num++;
    max = Math.floor(max / 10);
  }
  return num;
};

const findMinSpit = (minSpit: number, MAX: number) => {
  // 获取长度
  // 输入43
  let len = getLen(minSpit);
  let k = len;

  let max = 1; // 比当前位数大一倍 的值 假如 是 43  那 max = 100
  while (k--) {
    max = max * 10;
  }
  //
  if ([1, 2].includes(max)) {
    return minSpit;
  }
  if (len === 1) {
    // 只有1位数字
    if (minSpit < 1 && MAX < 1) {
      return 0.2;
    }
    // 就一位数
    return minSpit <= 5 ? Math.ceil(minSpit) : 10;
  }
  // max = 100
  let secMax = Math.floor(max / 10);
  if (minSpit % secMax === 0) {
    // 不作处理 该值本身就符合 如果是 40 直接用 40
    return minSpit;
  }

  // secmax = 10
  if (minSpit <= max / 2) {
    // 小于 50
    let val2 = max / 4; // 作25
    if (minSpit < val2) {
      // 小于25 假如是 23
      minSpit = Math.ceil(minSpit / secMax) * secMax; // 用30
    } else {
      // 这个时候取50
      minSpit = max / 2;
    }
  } else if (minSpit > max / 2) {
    // 取100
    minSpit = max;
  }

  return minSpit;
};

// 目的是分成五份 数字得是整数（整10、整百得那种）
const getMax = (data: any[]) => {
  let max: number = 0;
  let min: number = data?.[0] || 0;
  data.forEach((val: any) => {
    if (val > max) {
      max = val;
    }
    if (min > val) {
      min = val;
    }
  });
  // 找出最大值
  // 画成5份
  // 最小值 > 0
  if (min >= 0) {
    let minSpit = findMinSpit(max / 5, max);
    // console.log(minSpit)
    let computedMax = Math.ceil(minSpit * 5);
    return computedMax;
  }

  let minSpit = findMinSpit((max - min) / 5, max);
  let computedMax = 0;
  console.log('max - min', max, ' ', max - min, ' ', (max - min) / 5);
  console.log('minSpit', minSpit);
  while (computedMax < max) {
    computedMax += minSpit;
  }
  console.log('computedMax', computedMax);
  return computedMax;
};

// 最大 最小节点显示

const getMarkPoint = (
  title: any[],
  data: number[],
  color?: string,
  MAX: number = 1,
  type?: any,
) => {
  let max = 0;
  let min: number = data[0];

  data.forEach((val: any) => {
    if (val > max) {
      max = val;
    }
    if (val < min) {
      min = val;
    }
  });
  let arr: any[] = [];

  arr.push({
    name: title[0],
    type: 'max',
    zlevel: 200,
    z: 200,
    label: {
      position: color ? [13, type === 'month' ? -7.5 : -10] : [-10, -18],
      color: color || '#668EFF',
      backgroundColor: '#fff',
      padding: 1,
    },
  });

  arr.push({
    name: title[1],
    type: 'min',
    zlevel: 200,
    z: 200,
    label: {
      position: color ? [13, type === 'month' ? -7 : -10] : [-8, -20],
      color: color || '#668EFF',
      backgroundColor: '#fff',
      padding: 1,
    },
  });

  return arr;
};

export { getMax, getMarkPoint };

// markLine: {
//   symbol: 'none',
//   silent: true,
//   data: [
//     {
//       symbol: 'none',
//       label: {
//         show: false,
//       },
//       type: 'max',
//       name: '绿-最高点',
//     },
//     {
//       symbol: 'none',
//       type: 'min',
//       label: {
//         show: false,
//       },
//       name: '绿-最低点',
//     },
//   ],
// },
