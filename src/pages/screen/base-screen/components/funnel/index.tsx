import React, { useEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';

import { option, getLine } from './config';
import { formateBaseMoney } from '../../util';
import style from '../../style.less';

const Funnel: React.FC<any> = (props: any) => {
  let { base = 1, data = [] } = props;
  const myChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const options = useMemo(() => {
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
            fontWeight: 700,
            color: '#FFF',
            textBorderColor: '#FFF',
            textBorderWidth: 0,
            formatter: function (d: any) {
              const ins = d.name + ': ' + formateBaseMoney(d.data.num);
              return ins;
            },
          },
          data: data,
        },
        getLine(base, data),
      ],
    });
  }, [base, data]);

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

      <div className={style['tips']}>备注：结存用户数及余额指标都已剔除abs出表</div>
    </div>
  );
};

export default Funnel;
