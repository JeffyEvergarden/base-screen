import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';
import { option, testData } from './config';
import style from '../../style.less';

const Pie: React.FC<any> = (props: any) => {
  let { base = 1 } = props;
  const mapChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const options = useMemo(() => {
    let len: number = testData.length ? testData.length : 1;
    let gadVal = testData.reduce((total: number, cur: any) => total + cur.value, 0) / len;
    gadVal = Math.floor(gadVal / 13);
    const data: any = [];
    testData.forEach((item: any) => {
      data.push(
        {
          ...item,
          labelLine: {
            show: true,
            length: 15 * base,
            lineStyle: {
              color: '#B7B7B7',
              lineHeight: 18,
              width: 1,
            },
          },
        },
        {
          value: gadVal,
          name: '',
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0,
          },
        },
      );
    });
    return Object.assign({}, option, {
      tooltip: {
        formatter: function (params: any) {
          if (!params.name) {
            return '';
          }
          return params.name + ':' + params.value + '<br>';
        },
      },
      title: {
        text: '贷款余额 (亿元)',
        subtext: `${'123,224'}`,
        top: '35%',
        textAlign: 'center',
        left: '49%',
        textStyle: {
          color: '#1A2B5B',
          fontSize: 18 * base,
          fontWeight: 700,
        },
        subtextStyle: {
          padding: 10 * base,
          color: '#1A2B5B',
          fontSize: 36 * base,
          fontWeight: 700,
          lineHeight: 44 * base,
        },
      },
      series: [
        {
          name: '饼图',
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['63%', '85%'],
          avoidLabelOverlap: true,
          itemStyle: {
            shadowColor: 'rgba(33, 59, 84, 0.16)',
            shadowBlur: 6,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14 * base,
              fontWeight: 'bold',
            },
          },
          label: {
            show: true,
            fontSize: 14 * base,
            formatter: function (d: any) {
              if (!d.name) {
                return '';
              }
              // console.log(d);
              const ins = d.name + ' | ' + d.data.realPercent + '\n' + `¥${d.value}元`;
              return ins;
            },
          },
          data: data,
        },
      ],
    });
  }, [base]);

  const initMap = () => {
    mapChart.current.setOption(options);
  };

  useEffect(() => {
    const chartDom = document.getElementById('piebox');
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
    <div className={style['chart_three']}>
      <div id="piebox" className={style['pie-box']}></div>
    </div>
  );
};

export default Pie;
