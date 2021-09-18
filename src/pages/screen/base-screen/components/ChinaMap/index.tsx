import React, { useEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';
import mapInfo from './config';
import testData from './test';
import { Title } from '../common';

import style from '../../style.less';
import icon from './assets/icon.png';
import { formateNumer } from '../../util';
// console.log('icon',icon)
// 返回str
const renderTool = (params: any) => {
  return `
      <div class="${style['tooltips-bg']}">
        <div class="${style['tooltips-box']}">
          <img src="${icon}" class="${style['tooltips-icon']}"/>
          <span>${params.name}</span>
        </div>
        <div class="${style['tooltips-num']}">${formateNumer(params.value)}</div>
      </div>`;
};

const Funnel: React.FC<any> = (props: any) => {
  let { base = 1, data } = props;
  const mapChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const options = useMemo(() => {
    let max = 0;
    const map: any = mapInfo.map;
    const newData = data.map((ele: any) => {
      if (max <= ele.value) {
        max = ele.value;
      }
      return {
        ...ele,
        name: map.get(ele.code) || ele.name,
      };
    });
    // console.log(newData)
    return Object.assign(
      {},
      {
        tooltip: {
          // confine: true,
          formatter: function (params: any) {
            // console.log(params);
            // params.name === '海南省' && console.log('params', params);
            // return params.name + '<br>' + '进件数:' + (params.value || 0) + '<br>';
            return renderTool(params);
          },
        },
        visualMap: {
          min: 0,
          max: max,
          left: '0%',
          bottom: '5%',
          text: ['高', '低'],
          calculable: false,
          seriesIndex: [0],
          handleIcon: 'image://' + icon,
          inRange: {
            color: ['#B2CAE0', '#D2EAFF', '#8AC6FD', '#45A5F8'],
          },
          outOfRange: {
            color: ['#999999'],
          },
          textStyle: {
            color: '#24CFF4',
            fontWeight: 700,
          },
          itemHeight: 60 * base,
          itemWidth: 12 * base,
        },
        geo: {
          map: 'china',
          show: true,
          center: [98, 38],
          zoom: 1,
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
            map: 'china',
            center: [98, 38],
            zoom: 1,
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
                show: false,
                color: '#fff',
                fontWeight: '700',
                fontSize: 12 * base,
              },
            },
            data: newData,
          },
        ],
      },
    );
  }, [base, data]);

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
    let timeLen = Math.floor(100 / data.length);
    timeLen = timeLen < 4 ? timeLen : 4;
    timeLen = timeLen > 2 ? timeLen : 2;
    fake.current.index = 0;
    fake.current.fn = setInterval(timeFn, timeLen * 1000);
  };

  useEffect(() => {
    const chartDom = document.getElementById('china-map');
    echarts.registerMap('china', mapInfo.mapJson as any);
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
      // console.log('重新绘制-------：', mapChart.current);
      mapChart.current?.setOption?.(options);
      mapChart.current?.resize?.();
    }
  }, [options]);

  return (
    <div className={style['chart_two']}>
      <Title title="进件省份分布" className={style['title-map']} />

      <div id="china-map" className={style['map-box']}></div>
    </div>
  );
};

export default Funnel;
