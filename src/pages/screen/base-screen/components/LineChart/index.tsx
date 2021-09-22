import React, { useEffect, useRef } from 'react';

import * as echarts from 'echarts';
import { getMax } from './config';
import { formateMoney, formateNumer } from '../../util';
import style from '../../style.less';

const LineChart: React.FC<any> = (props: any) => {
  let { base = 1, id, type, data = [] } = props;
  const lineChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const initOptions = (columns: any[], data1: any[], data2: any[]) => {
    let max1 = getMax(data1);
    let max2 = getMax(data2);
    console.log('max: ' + max1 + ' ' + max2);
    return Object.assign(
      {},
      {
        color: ['#668EFF', '#1CD389'],
        legend: {
          // icon: 'circle',
          data: ['进件量', '净增余额'],
        },
        grid: {
          top: 35 * base,
          left: 55 * base,
          right: 60 * base,
          bottom: 30 * base,
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: columns,
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#e9e9e9',
            },
          },
          axisLabel: {
            color: 'rgba(0, 0, 0, 0.65)',
          },
        },
        yAxis: [
          {
            name: `单位：万笔数`,
            type: 'value',
            max: max1,
            splitNumber: 6,
            nameTextStyle: {
              fontSize: 12 * base,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(0,0,0,0.07)',
              },
            },
            axisLabel: {
              formatter: (val: any) => {
                return val;
              },
            },
          },
          {
            name: `单位：${type === 'month' ? '亿' : '千万'}元`,
            type: 'value',
            max: max2,
            splitNumber: 6,
            nameTextStyle: {
              fontSize: 12 * base,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              formatter: (val: any) => {
                return val;
              },
            },
          },
        ],
        series: [
          {
            name: '进件量',
            type: 'line',
            showSymbol: false,
            lineStyle: {
              width: 2 * base,
            },
            emphasis: {
              focus: 'series',
            },
            label: {
              fontSize: 12 * base,
            },
            markPoint: {
              symbol: 'circle',
              symbolSize: 4,
              label: {
                formatter: (d: any) => {
                  let coord = d.data.coord[0];
                  let value = d.value;
                  if (value === 0) {
                    return '';
                  }
                  return `${columns[coord]}: ${Math.floor(value)}`;
                },
              },
              data: [
                {
                  name: '进件量最大',
                  type: 'max',
                  label: {
                    position: [-15, -15],
                    color: '#668EFF',
                  },
                },
                {
                  name: '进件量最小',
                  type: 'min',
                  label: {
                    position: [-15, 10],
                    color: '#668EFF',
                  },
                },
              ],
            },
            data: data1,
          },
          {
            name: '净增余额',
            type: 'line',
            yAxisIndex: 1,
            showSymbol: false,
            lineStyle: {
              width: 2 * base,
            },
            emphasis: {
              focus: 'series',
            },
            label: {
              fontSize: 12 * base,
            },
            markPoint: {
              symbol: 'circle',
              symbolSize: 4,
              label: {
                formatter: (d: any) => {
                  // console.log(d);
                  let coord = d.data.coord[0];
                  let value = d.value;
                  if (value === 0) {
                    return '';
                  }
                  return `${columns[coord]}: ${value}${type === 'month' ? '亿' : '千万'}元`;
                },
              },
              data: [
                {
                  name: '净增余额最大',
                  type: 'max',
                  label: {
                    position: [-15, -15],
                    color: '#1CD389',
                  },
                },
                {
                  name: '净增余额最小',
                  type: 'min',
                  label: {
                    position: [-15, 10],
                    color: '#1CD389',
                  },
                },
              ],
            },
            data: data2,
          },
        ],
      },
    );
  };

  const initMap = () => {
    const columns: any = [];
    const data1: any = [];
    const data2: any = [];
    data.forEach((item: any) => {
      columns.push(item.name);
      data1.push(item.value1);
      data2.push(item.value2);
    });
    if (!data1.length || !data2.length) {
      return;
    }
    const options: any = initOptions(columns, data1, data2);
    lineChart.current.setOption(options);
  };

  useEffect(() => {
    const chartDom = document.getElementById(`linebox-${id}`);
    lineChart.current = echarts.init(chartDom as any);
    initMap();
    first = true;
  }, []);

  useEffect(() => {
    if (!first) {
      // console.log('重新绘制-------：', lineChart.current);
      initMap();
      lineChart.current?.resize?.();
    }
  }, [base, data]);

  return (
    <div className={style['line-box']}>
      <div id={`linebox-${id}`} className={style['line-box']}></div>
    </div>
  );
};

export default LineChart;
