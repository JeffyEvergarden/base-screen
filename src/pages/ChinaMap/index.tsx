import React, { useEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';
import mapJson from './assets/map.json';
import testData from './test';

import style from './style.less';

const Funnel: React.FC<any> = (props: any) => {
  let { base = 1 } = props;
  const mapChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const options = useMemo(() => {
    return Object.assign(
      {},
      {
        tooltip: {
          formatter: function (params: any) {
            return params.name + '<br>' + '进件数:' + (params.value || 0) + '<br>';
          },
        },
        visualMap: {
          min: 0,
          max: 2000,
          left: '3%',
          bottom: '5%',
          calculable: true,
          seriesIndex: [0],
          inRange: {
            color: ['#B2CAE0', '#D2EAFF', '#8AC6FD', '#45A5F8'],
          },
          outOfRange: {
            color: ['#999999'],
          },
          textStyle: {
            color: '#24CFF4',
          },
        },
        geo: {
          map: 'china',
          show: true,
          center: [98, 38],
          // zoom: 1.45,
          roam: false,
          itemStyle: {
            borderColor: 'rgba(0,63,140,0.2)',
            shadowColor: 'rgba(0,63,140,0.2)',
            shadowOffsetY: 20 * base,
            shadowBlur: 30 * base,
          },
          emphasis: {
            itemStyle: {
              borderWidth: 1.6,
            },
            label: {
              show: true,
              color: '#333',
              fontWeight: '700',
              fontSize: 18 * base,
            },
          },
        },
        series: [
          {
            type: 'map',
            mapType: 'china',
            center: [98, 38],
            // geoIndex: 0,
            label: {
              show: false,
            },
            itemStyle: {
              areaColor: '#B2CAE0',
              borderColor: '#fff',
              borderWidth: 1,
            },
            emphasis: {
              itemStyle: {
                areaColor: '#8dd7fc',
              },
              label: {
                show: false,
              },
            },
            data: testData,
          },
        ],
      },
    );
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
    <div className={style['screen-bg']}>
      <div id="china-map" className={style['map-box']}></div>
    </div>
  );
};

export default Funnel;
