import React, { useState, useEffect, useRef } from 'react';
// 通用组件
// import { Card } from 'antd';
import { Title, TitleNum } from './components/common';
// 图表组件
import Funnel from './components/Funnel';
import ChinaMap from './components/ChinaMap';
import Pie from './components/Pie';
import TableView from './components/Table';
import LineChart from './components/LineChart';
// import TestView from './components/TestView';
//样式 和图片
import style from './style.less';
// import logo from '@/assets/logo.png';
// 方法
import { getCnTime } from '@/utils';
import { throttle } from './util';

const ScreenPage: React.FC<any> = (props: any) => {
  // 右上角时间
  const [time, setTime] = useState<string>(getCnTime());
  useEffect(() => {
    const timeFn = setInterval(() => {
      setTime(getCnTime());
    }, 1000);
    return () => {
      clearInterval(timeFn);
    };
  }, []);

  // 比率计算
  const rate = document.body.clientWidth / 1920;
  const [base, setBase] = useState<number>(rate);
  useEffect(() => {
    const fn = throttle(() => {
      const realRate = document.body.clientWidth / 1920;
      setBase(realRate);
    }, 300);
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('resize', fn);
    };
  }, []);

  return (
    <div className={style['screen-bg']}>
      {/* 标题 header栏 */}
      <div className={style['header']}>
        <div className={style['header-left']}>
          <div className={style['title']}>中邮消费金融业务实时监控</div>
        </div>
        <div className={style['time']}>{time}</div>
      </div>

      <div className={style['screen-content_top']}>
        <div className={style['title-1']}>
          <Title title="客户数" />
        </div>
        <div className={style['title-2']}>
          <Title title="贷款余额" />
        </div>

        <TitleNum num1={'228,899'} num2={'28,999'} num3={'2,288,999'} />
      </div>

      <div className={style['screen-content']}>
        {/* 漏斗地图 */}
        <Funnel base={base} />
        {/* 中国地图 */}
        <ChinaMap base={base} />
        {/* 饼图 */}
        <Pie base={base} />
      </div>

      <div className={style['screen-content_bottom']}>
        <TableView />
        <div className={style['chart_four']}>
          <div className={style['title-4']}>
            <Title title="近30天进件量与净增余额" />
          </div>

          <LineChart type="day" id="day" base={base} />

          <div className={style['title-5']}>
            <Title title="近1年进件量与净增余额" />
          </div>

          <LineChart type="month" id="month" base={base} />
        </div>
      </div>
    </div>
  );
};

export default ScreenPage;
