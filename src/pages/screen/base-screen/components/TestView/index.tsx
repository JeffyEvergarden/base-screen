import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';

import { option, testData } from './config';
import { option as option2 } from './config-test';

import style from '../../style.less';
import { isNumber } from 'lodash';

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
          top: 32 * base,
          bottom: 32 * base,
          type: 'funnel',
          gap: 11.85 * base,
          minSize: 196 * base,
          left: 120 * base,
          width: 334 * base,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
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
              var ins = d.name + ': ' + d.data.num;
              return ins;
            },
          },
          data: testData,
        },
      ],
    });
  }, [base]);

  useEffect(() => {
    var chartDom = document.getElementById('funnel');
    myChart.current = echarts.init(chartDom as any);
    myChart.current.setOption(options);
    first = true;
  }, []);

  useEffect(() => {
    if (!first) {
      console.log('重新绘制-------');
      myChart.current?.setOption?.(options);
      myChart.current?.resize?.();
    }
  }, [options]);

  return (
    <div className={style['chart_one']}>
      <div id="funnel" className={style['funnel-box']}></div>

      <div className={style['arrow_left']}>
        
      </div>
    </div>
  );
};

export default Funnel;
