import React, { useEffect, useRef } from 'react';

import * as echarts from 'echarts';
import { getMax, getMarkPoint } from './config';
import { formateMoney, formateNumer } from '../../util';
import { Spin } from 'antd';
import style from '../../style.less';

const LineChart: React.FC<any> = (props: any) => {
  let { base = 1, id, type, data = [], loading, fullScreen } = props;
  const lineChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const initOptions = (columns: any[], data1: any[], data2: any[]) => {
    // 获取坐标最大节点
    let max1 = getMax(data1);

    let max2 = getMax(data2);

    // console.log('max: ' + max1 + ' ' + max2);

    return Object.assign(
      {},
      {
        color: ['#668EFF', '#1CD389'],
        textStyle: {
          fontFamily: 'PingFang SC, Microsoft YaHei, SimHei',
        },
        legend: {
          // icon: 'circle',
          data: ['进件量', '净增余额'],
        },
        grid: {
          top: 40 * base,
          left: 55 * base,
          right: 50 * base,
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
            // showMaxLabel: true,
          },
        },
        yAxis: [
          {
            name: `单位：万笔`,
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
            name: `单位：亿元`,
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
            zlevel: 20,
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
              symbolSize: 6,
              // label: {
              //   formatter: (d: any) => {
              //     let coord = d.data.coord[0];
              //     let value = d.value;
              //     // if (value === 0) {
              //     //   return '';
              //     // }
              //     return `${columns[coord]}: ${value}`;
              //   },
              // },
              data: getMarkPoint(['进件量最大', '进件量最小'], data1, '', max1, type),
            },
            data: data1,
          },
          {
            name: '净增余额',
            type: 'line',
            yAxisIndex: 1,
            zlevel: 10,
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
              symbolSize: 6,
              z: 20,
              // label: {
              //   formatter: (d: any) => {
              //     // console.log(d);
              //     let coord = d.data.coord[0];
              //     let value = d.value;
              //     if (value === 0) {
              //       return '';
              //     }
              //     return `${columns[coord]}: ${value}${type === 'month' ? '亿' : '千万'}元`;
              //   },
              // },
              data: getMarkPoint(['净增余额最大', '净增余额最小'], data2, '#1CD389', max2, type),
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
  }, [base, data, fullScreen]);

  return (
    <Spin spinning={loading}>
      <div
        id={`linebox-${id}`}
        className={`${style['line-box']} animate__animated animate__fadeInRight`}
      ></div>
    </Spin>
  );
};

export default LineChart;
