import React, { useEffect, useRef, useMemo } from 'react';

import * as echarts from 'echarts';
import { option, genHtmlStr } from './config';
import style from '../../style.less';
import instyle from './style.less';
import { formatePercent, formateBaseMoney, formateNumer, ONE_YI, ONE_W } from '../../util';

const renderTool = (params: any, base: number = 1) => {
  // console.log(params);

  if (params.name !== '京东金融' && params.name !== '蚂蚁金服') {
    return null;
  }

  if (params.data.subData && params.data.subData.length === 0) {
    return null;
  }

  const { colStr, columnsStr, rowStr } = genHtmlStr(params.data.subData || [], base);

  return `
    <div class="${instyle['bg']}">
      <table style="table-layout: 'fixed'">
        <colgroup>
          ${colStr}
        </colgroup>
        <thead class="${instyle['table-thead']}">
          <tr>${columnsStr}</tr>
        </thead>
        <tbody>
          ${rowStr}
        </tbody>
      </table>
    </div>
  `;
};

const Pie: React.FC<any> = (props: any) => {
  let { base = 1, data = [], totalMoney = 0, fullScreen, activeEvent } = props;
  const mapChart = useRef<any>(null);

  let first = false;
  // 格式化数字
  base = isNaN(base) ? 1 : base;

  const options = useMemo(() => {
    // 贷款余额处理
    let unit = '';
    let money = totalMoney;
    if (totalMoney >= ONE_YI) {
      unit = '亿';
      money = formateNumer(totalMoney / ONE_YI);
    } else if (totalMoney >= ONE_W) {
      unit = '万';
      money = formateNumer(totalMoney / ONE_W);
    }

    let len: number = data.length ? data.length : 1;
    let total = data.reduce((total: number, cur: any) => total + cur.value, 0);
    let gadVal = total / len;
    gadVal = Math.floor(gadVal / 13);
    const targetData: any = [];
    let half = 0;
    data.forEach((item: any, i: number) => {
      // 过滤 0的数据
      if (item.value === 0) {
        return;
      }
      if (half < total / 2 && half + item.value >= total / 2) {
        item.flag = true;
      }
      half = half + item.value;
      targetData.push(
        {
          ...item,
          labelLine: {
            show: true,
            length: 20 * base,
            length2: 35 * base,
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
          emphasis: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        },
      );
    });
    // console.log(data);

    return Object.assign({}, option, {
      tooltip: {
        show: true,
        trigger: 'item',
        padding: 0,
        backgroundColor: '#fff',
        borderWidth: 0,
        appendToBody: true,
        position: function (point: any, params: any, dom: any) {
          // console.log(point, params, dom, dom.clientHeight);
          // 固定在顶部
          return [point[0] - dom.clientWidth / 2 + 8, point[1] + 16];
        },
        formatter: function (params: any) {
          return renderTool(params, base);
        },
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 8 * base,
      },
      title: {
        text: `贷款余额 (${unit}元)`,
        subtext: `¥ ${money || 0}`,
        top: '36%',
        textAlign: 'center',
        left: '46%',
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
          center: ['47%', '50%'],
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
                `${d.data.flag ? '      ' : ''}\n` +
                `¥ ${formateBaseMoney(d.value)}元${d.data.flag ? '      ' : ''}`;
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
    // console.log('disabled', e?.name);
    activeEvent?.({
      type: 'disabled',
      name: e?.name,
      color: null,
    });
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

    let color: any = e.color;

    if (typeof color !== 'string') {
      color = color?.colorStops?.[0]?.color || '#668eff';
    }
    // console.log('active', e?.name, color);
    activeEvent?.({
      type: 'active',
      name: e?.name,
      color,
    });
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
      console.log('重新绘制饼图');
      initMap();
      setTimeout(() => {
        mapChart.current?.resize?.();
      }, 200);
    }
  }, [options, fullScreen]);

  return (
    <div id="piebox" className={`${style['pie-box']} animate__animated animate__fadeInRight`}></div>
  );
};

export default Pie;
