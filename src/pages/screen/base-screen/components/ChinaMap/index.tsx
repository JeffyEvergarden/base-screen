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
        <div class="${style['tc-bg']}">
          <div class="${style['tooltips-box']}">
            <img src="${icon}" class="${style['tooltips-icon']}"/>
            <span>${params.name}</span>
          </div>
          <div class="${style['tooltips-num']}">${formateNumer(params.value)}</div>
        </div>
        <div class="${style['tt-bg']}"></div>
        <div class="${style['tt-icon']}"></div>
      </div>`;
};

const Funnel: React.FC<any> = (props: any) => {
  let { base = 1, data, fullScreen } = props;
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
        name: map.get(String(ele.code)),
      };
    });
    // console.log(newData);
    // console.log(newData)
    return Object.assign(
      {},
      {
        tooltip: {
          // confine: true,
          padding: 0,
          backgroundColor: 'transparent',
          position: function (point: any) {
            // 固定在顶部
            return [point[0] - 50, point[1] - 70];
          },
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
          left: '18%',
          bottom: '14%',
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
          center: [98, 36],
          zoom: 1.15,
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
            center: [98, 36],
            zoom: 1.15,
            // geoIndex: 0,
            label: {
              show: false,
              color: '#fff',
            },
            itemStyle: {
              areaColor: '#B2CAE0',
              borderColor: '#73bdf9',
              borderWidth: 1,
            },
            emphasis: {
              itemStyle: {
                areaColor: '#FCB344',
              },
              label: {
                show: false,
                color: '#fff',
                fontWeight: '700',
                fontSize: 12 * base,
              },
            },
            selectMode: false,
            select: {
              itemStyle: {
                areaColor: '#FCB344',
                borderColor: '#fff',
                borderWidth: 1,
              },
              label: {
                show: true,
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
    mapChart.current.dispatchAction({
      type: 'hideTip',
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
    if (i > data.length) {
      clearTimeFn();
      return;
    }
    if (i >= 1) {
      unselect(i - 1); // 取消上一个
    }
    if (i === data.length) {
      select(0);
    } else {
      select(i); // 显示当前
    }
    fake.current.index++;
  };

  const refresh = () => {
    clearTimeFn();
    // unselect(0);
    let timeLen = Math.floor(100 / data.length);
    timeLen = timeLen < 4 ? timeLen : 4;
    timeLen = timeLen > 2 ? timeLen : 2;
    fake.current.index = 0;
    fake.current.fn = setInterval(timeFn, 2 * 1000);
  };

  const initMap = () => {
    mapChart.current.setOption(options);
    refresh();
  };

  useEffect(() => {
    const chartDom = document.getElementById('china-map');
    echarts.registerMap('china', mapInfo.mapJson as any);
    mapChart.current = echarts.init(chartDom as any);
    initMap();
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
  }, [options, fullScreen]);

  // 激活更新
  useEffect(() => {
    if (!first) {
      unselect(0);
      setTimeout(() => {
        refresh();
      }, 1000);
    }
  }, [data]);

  return (
    <div
      id="china-map"
      className={`${style['map-box']} animate__animated animate__fadeInDown`}
    ></div>
  );
};

export default Funnel;
