import React, { useEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';
import { data } from './const';
import style from './style.less';

const Demo: React.FC<any> = (props: any) => {
  let { base = 1 } = props;
  const mapChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const options1 = useMemo(() => {
    return Object.assign(
      {},
      {
        tooltip: {
          formatter: function (params: any) {
            return params.name + '<br>' + '数值:' + (params.value || 0) + '<br>';
          },
        },
        series: [
          {
            type: 'treemap',
            leafDepth: 2,
            levels: [
              {
                itemStyle: {
                  borderWidth: 0,
                  gapWidth: 5,
                },
              },
              {
                itemStyle: {
                  gapWidth: 1,
                },
              },
              {
                colorSaturation: [0.35, 0.5],
                itemStyle: {
                  gapWidth: 1,
                  borderColorSaturation: 0.6,
                },
              },
            ],
            data: data,
          },
        ],
      },
    );
  }, [base]);

  const initMap = () => {
    mapChart.current.setOption(options1);
  };

  useEffect(() => {
    const chartDom = document.getElementById('demo-box');
    mapChart.current = echarts.init(chartDom as any);
    initMap();
    first = true;
  }, []);

  useEffect(() => {
    if (!first) {
      console.log('重新绘制-------：', mapChart.current);
      mapChart.current?.setOption?.(options1);
      mapChart.current?.resize?.();
    }
  }, [options1]);

  return (
    <div className={style['screen-bg']}>
      <div id="demo-box" className={style['demo-box']}></div>
    </div>
  );
};

export default Demo;
