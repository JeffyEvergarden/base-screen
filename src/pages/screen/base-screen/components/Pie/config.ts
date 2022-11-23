// import * as echarts from 'echarts';
import { formateBaseMoney, ONE_YI, ONE_W } from '../../util';
import style from './style.less';
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

const option = {
  color: colors,
};

const columns: any[] = [
  {
    key: 'channelName',
    title: '渠道子类',
    width: 140 + 16,
  },
  {
    key: 'monthMoney',
    title: '本月净增',
    width: 120 + 16,
  },
  {
    key: 'loalBalance',
    title: '贷款余额',
    width: 120 + 16,
  },
];

const formateMoney = (val: any) => {
  if (isNaN(val)) {
    return val;
  }
};

const genHtmlStr = (data: any[], base: number = 1) => {
  let colStr = '';
  let columnsStr = '';
  let rowStr = '';

  let cols = columns.map((item: any) => {
    return `<col style="width: ${item.width * base + 'px'}" />`;
  });
  colStr = cols.join('');

  let ths = columns.map((item: any, i: number) => {
    return `<th class="${style['table-cell']}  ${i === 0 ? ' ' + style['col-first'] : ''}" >${
      item.title
    }</th>`;
  });
  columnsStr = ths.join('');

  let rows = data.map((item: any) => {
    let tds = columns.map((subitem: any, i: number) => {
      //formateBaseMoney
      let val = item[subitem.key];

      if (!isNaN(val)) {
        val = formateBaseMoney(val) + '元';
      }

      return `<td class="${style['table-cell']} ${
        i === 0 ? ' ' + style['col-first'] : ''
      }" >${val}</td>`;
    });
    return '<tr>' + tds.join('') + '</tr>';
  });
  rowStr = rows.join('');

  return {
    colStr,
    columnsStr,
    rowStr,
  };
};

export { option, columns, genHtmlStr };
