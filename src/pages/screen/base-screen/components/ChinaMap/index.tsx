import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';
import mapJson from './assets/test.json';
import { option } from './config';
import testData from './test';

import style from '../../style.less';

const Funnel: React.FC<any> = (props: any) => {
  let { base = 1 } = props;
  const mapChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const options = useMemo(() => {
    return Object.assign({}, option, {
      tooltip: {
        formatter: function (params: any) {
          return params.name + '<br>' + '视频数:' + params.number + '<br>';
        },
      },
      visualMap: {
        min: 0,
        max: 2000,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true,
        // seriesIndex: [1],
        inRange: {
          color: ['white', 'red'],
        },
        show: true,
      },
      series: [
        {
          top: 32 * base,
          bottom: 32 * base,
          left: 'center',
          type: 'map',
          mapType: 'china',
          selectedMode: 'false', //是否允许选中多个区域
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          data: testData,
        },
      ],
    });
  }, [base]);

  const initMap = () => {
    mapChart.current.setOption(options);
  };

  useEffect(() => {
    const chartDom = document.getElementById('china-map');
    echarts.registerMap('china', mapJson as any);
    mapChart.current = echarts.init(chartDom as any);
    initMap();
    first = true;
  }, []);

  useEffect(() => {
    if (!first) {
      console.log('重新绘制-------：', mapChart.current);
      mapChart.current?.setOption?.(options);
      mapChart.current?.resize?.();
    }
  }, [options]);

  return (
    <div className={style['chart_two']}>
      <div id="china-map" className={style['map-box']}></div>
    </div>
  );
};

export default Funnel;
