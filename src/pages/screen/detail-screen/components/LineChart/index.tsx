import { useState, useEffect, useRef } from 'react';
import { Spin } from 'antd';
import * as echarts from 'echarts';
import { colors, getMax, getMarkPoint } from './config';
import style from '../../style.less';

const LineChart: React.FC<any> = (props: any) => {
  let { base = 1, id, type, data = [], loading = false, className } = props;

  // 格式化数字
  base = isNaN(base) ? 1 : base;

  let first = false;

  const lineChart = useRef<any>(null);

  const initOptions = (columns: any[], data1: any[], data2: any[]) => {
    // 获取坐标最大节点
    let max1 = getMax(data1);

    let max2 = getMax(data2);

    console.log('max: ' + max1 + ' ' + max2);

    return Object.assign(
      {},
      {
        color: colors,
        textStyle: {
          fontFamily: 'PingFang SC, Microsoft YaHei, SimHei',
        },
        legend: {
          // icon: 'circle',
          data: ['放款金额', '净增余额'],
        },
        grid: {
          top: 34 * base,
          left: 32 * base,
          right: 40 * base,
          bottom: 43 * base,
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
            name: `单位：亿元`,
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
            name: '放款金额',
            type: 'line',
            yAxisIndex: 0,
            z: 10,
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
            labelLayout: {
              moveOverlap: 'shiftY',
            },
            markPoint: {
              symbol: 'circle',
              symbolSize: 6,
              zlevel: 10,
              data: getMarkPoint(['放款余额最大', '放款余额最小'], data2, 0, max2),
            },
            data: data1,
          },
          {
            name: '净增余额',
            type: 'line',
            yAxisIndex: 1,
            showSymbol: false,
            z: 5,
            lineStyle: {
              width: 2 * base,
            },
            emphasis: {
              focus: 'series',
            },
            label: {
              fontSize: 12 * base,
            },
            labelLayout: {
              moveOverlap: 'shiftY',
            },
            markPoint: {
              symbol: 'circle',
              symbolSize: 6,
              data: getMarkPoint(['净增余额最大', '净增余额最小'], data2, 1, max2),
            },
            data: data2,
          },
        ],
      },
    );
  };

  // 生成图表数据
  const initChart = () => {
    const columns: any = [];
    const data1: any = [];
    const data2: any = [];
    const data3: any = [];
    data.forEach((item: any) => {
      columns.push(item.name);
      data1.push(item.value1);
      data2.push(item.value2);
      data3.push(item.value3);
    });
    if (!data1.length || !data2.length) {
      return;
    }
    const options: any = initOptions(columns, data1, data2, data3);
    console.log(options);
    lineChart.current.setOption(options);
  };

  useEffect(() => {
    const chartDom = document.getElementById(`linebox-${id}`);
    lineChart.current = echarts.init(chartDom as any);
    initChart();
    first = true;
  }, []);

  useEffect(() => {
    if (!first) {
      initChart();
      lineChart.current?.resize?.();
    }
  }, [base, data]);

  return (
    <div className={`${style['line-box']} ${className}`}>
      <Spin spinning={loading}>
        <div id={`linebox-${id}`} className={style['line-box']}></div>
      </Spin>
    </div>
  );
};

export default LineChart;
