import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';

import { option, testData, getLine } from './config';

import style from '../../style.less';

const Funnel: React.FC<any> = (props: any) => {
  let { base = 1 } = props;
  const myChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const options = useMemo(() => {
    console.log(base);
    return Object.assign({}, option, {
      series: [
        {
          top: 8 * base,
          bottom: 21 * base,
          type: 'funnel',
          gap: 11.85 * base,
          minSize: 196 * base,
          left: 120 * base,
          width: 334 * base,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 0,
            shadowColor: 'rgba(33, 59, 84, 0.16)',
            shadowOffsetX: 4 * base,
            shadowOffsetY: 4 * base,
            shadowBlur: 6 * base,
          },
          label: {
            show: true,
            position: 'inside',
            fontSize: 16 * base,
            fontWeight: 900,
            color: '#FFF',
            textBorderColor: '#FFF',
            textBorderWidth: 0,
            formatter: function (d: any) {
              const ins = d.name + ': ' + d.data.num;
              return ins;
            },
          },
          data: testData,
        },
        getLine(base, testData),
      ],
    });
  }, [base]);

  useEffect(() => {
    const chartDom = document.getElementById('funnel');
    myChart.current = echarts.init(chartDom as any);
    myChart.current.setOption(options);
    first = true;
  }, []);

  useEffect(() => {
    if (!first) {
      // console.log('重新绘制-------');
      myChart.current?.setOption?.(options);
      myChart.current?.resize?.();
    }
  }, [options]);

  return (
    <div className={style['chart_one']}>
      <div id="funnel" className={style['funnel-box']}></div>

      <div className={style['arrow_left']}></div>
    </div>
  );
};

export default Funnel;
