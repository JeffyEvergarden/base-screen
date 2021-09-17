import React, { useEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';
import mapJson from './config';
import testData from './test';
import { Title } from '../common';

import style from '../../style.less';

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
            // params.name === '海南省' && console.log('params', params);
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
          zoom: 1.1,
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
              areaColor: '#8dd7fc',
            },
            label: {
              show: false,
              color: '#fff',
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
            zoom: 1.1,
            // geoIndex: 0,
            label: {
              show: false,
              color: '#fff',
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
                show: true,
                color: '#fff',
                fontWeight: '700',
                fontSize: 18 * base,
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

  // 时间计数器
  const fake = useRef<any>({});

  const select = (i: number) => {
    mapChart.current.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: i,
    });
    mapChart.current.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: i,
    });
  };
  const unselect = (i: number) => {
    mapChart.current.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: i,
    });
  };

  const clearTimeFn = () => {
    clearInterval(fake.current.fn);
    fake.current.index = -1;
    fake.current.fn = null;
  };

  const timeFn = () => {
    let i: any = fake.current.index;
    // console.log('ChinaMap执行timeFn:' + i);
    if (i >= testData.length) {
      clearTimeFn();
      return;
    }
    if (i >= 1) {
      unselect(i - 1); // 取消上一个
    }
    select(i); // 显示当前
    fake.current.index++;
  };

  const refresh = () => {
    clearTimeFn();
    let timeLen = Math.floor(100 / testData.length);
    timeLen = timeLen < 4 ? timeLen : 4;
    timeLen = timeLen > 2 ? timeLen : 2;
    fake.current.index = 0;
    fake.current.fn = setInterval(timeFn, timeLen * 1000);
  };

  useEffect(() => {
    const chartDom = document.getElementById('china-map');
    echarts.registerMap('china', mapJson as any);
    mapChart.current = echarts.init(chartDom as any);
    initMap();
    refresh();
    first = true;
    return () => {
      clearTimeFn();
    };
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
      <Title title="进见省份分布" className={style['title-map']} />

      <div id="china-map" className={style['map-box']}></div>
    </div>
  );
};

export default Funnel;
