import React, { useEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';
import { option } from './config';
import style from '../../style.less';

import { formatePercent, formateBaseMoney, formateNumer } from '../../util';

const Pie: React.FC<any> = (props: any) => {
  let { base = 1, data = [], totalMoney = 0 } = props;
  const mapChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const options = useMemo(() => {
    // 贷款余额处理
    let unit = '';
    let money = totalMoney;
    if (totalMoney >= 100000000) {
      unit = '亿';
      money = formateNumer(totalMoney / 10000000);
    } else if (totalMoney >= 10000) {
      unit = '万';
      money = formateNumer(totalMoney / 10000);
    }

    let len: number = data.length ? data.length : 1;
    let gadVal = data.reduce((total: number, cur: any) => total + cur.value, 0) / len;
    gadVal = Math.floor(gadVal / 13);
    const targetData: any = [];
    data.forEach((item: any, i: number) => {
      targetData.push(
        {
          ...item,
          labelLine: {
            show: true,
            length: 20 * base,
            length2: (i === 0 ? 40 : 10) * base,
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
    // console.log(data);

    return Object.assign({}, option, {
      tooltip: {
        formatter: function (params: any) {
          if (!params.name) {
            return '';
          }
          return params.name + ':' + params.value + '<br>';
        },
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      title: {
        text: `贷款余额 (${unit}元)`,
        subtext: `¥ ${money}`,
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
            scaleSize: 16 * base,
            labelLine: {
              show: true,
              length: 25 * base,
              lineStyle: {
                color: '#B7B7B7',
                lineHeight: 18,
                width: 1,
              },
            },
          },
          label: {
            show: true,
            fontWeight: '700',
            fontSize: 14 * base,
            lineHeight: 22 * base,
            formatter: function (d: any) {
              if (!d.name) {
                return '';
              }
              // console.log(d);
              const ins =
                d.name +
                ' | ' +
                formatePercent(d.data.realPercent) +
                '\n' +
                `¥ ${formateBaseMoney(d.value)}元`;
              return ins;
            },
          },
          data: targetData,
        },
      ],
    });
  }, [base, data, totalMoney]);

  const initMap = () => {
    mapChart.current.setOption(options);
    // console.log('dispatchAction', mapChart.current.dispatchAction);
    // 触发激活 最大值
    // 前置要求 排好序
    mapChart.current.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 0,
    });
  };

  const moveOutFn = (e: any) => {
    // 移除事件
    // console.log('mouseout:', e);
    if (e.dataIndex !== 0) {
      mapChart.current.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0,
      });
    }
  };
  const moveInFn = (e: any) => {
    // 移除事件
    if (e.dataIndex !== 0) {
      mapChart.current.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0,
      });
    }
  };

  useEffect(() => {
    const chartDom = document.getElementById('piebox');
    mapChart.current = echarts.init(chartDom as any);
    initMap();
    mapChart.current.on('mouseout', moveOutFn);
    mapChart.current.on('mouseover', moveInFn);
    first = true;
    return () => {
      mapChart.current.off('mouseout', moveOutFn);
      mapChart.current.off('mouseover', moveInFn);
    };
  }, []);

  useEffect(() => {
    if (!first) {
      // console.log('重新绘制-------：', mapChart.current);
      initMap();
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