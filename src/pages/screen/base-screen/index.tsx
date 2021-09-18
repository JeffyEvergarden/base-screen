import React, { useState, useEffect } from 'react';
// 通用组件
import { Card, Tooltip } from 'antd';
import { Title, TitleNum } from './components/common';
import { InfoCircleOutlined } from '@ant-design/icons';
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

// 数据
import { useOverViewModel, useFunnelModel, usePieModel, useLineModal, useMapModel } from './model';

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

  // 总揽数据
  const { dayInNum, dayOutMoney, dayNetProfitMoney, getOverviewData } = useOverViewModel();

  // 更新数据
  const [updateList, setUpdateList] = useState<any[]>([
    {
      name: '核心核心核心',
      date: '2021-09-13 11:34:43',
    },
    {
      name: '百度',
      date: '2021-09-13 11:34:43',
    },
  ]);

  // 漏斗数据
  const { funnelList, getFunnel } = useFunnelModel();

  // 饼图数据
  const { pieList, getPieList } = usePieModel();

  // 直线表数据
  const { dayList, monthList, getMonthList, getYearList } = useLineModal();

  // 漏斗数据
  const { mapList, getMap } = useMapModel();

  useEffect(() => {
    getOverviewData(); // 总揽数据
    getFunnel(); // 漏斗数据
    getPieList(); // 饼图数据
    getMonthList(); // 月份数据
    getYearList(); // 年份数据
    getMap(); // 地图数据
  }, []);

  const renderHeaderIcon = (
    <div className={style['tips-box']}>
      {updateList.map((item: any, i: number) => {
        return (
          <div className={style['tips-box_item']} key={i}>
            <div className={style['left']}>{item.name}</div>
            <div className={style['right']}>数据更新于{item.date}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={style['screen-bg']}>
      {/* 标题 header栏 */}
      <div className={style['header']}>
        <div className={style['header-left']}>
          <div className={style['title']}>中邮消费金融业务实时监控</div>
        </div>
        <div className={style['time']}>
          <div>
            <div>进件数据更新时间：{time}</div>
            <div>放款数据更新时间：{time}</div>
          </div>
          <div className={style['time_icon']}>
            <Tooltip
              placement="bottomRight"
              title={renderHeaderIcon}
              trigger={'hover'}
              overlayClassName={style['fake-tips']}
              overlayStyle={{ maxWidth: '700px' }}
            >
              <InfoCircleOutlined />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className={style['screen-content_top']}>
        <div className={style['title-1']}>
          <Title title="客户数" />
        </div>
        <div className={style['title-2']}>
          <Title title="贷款余额" />
        </div>

        <TitleNum num1={dayInNum} num2={dayOutMoney} num3={dayNetProfitMoney} />
      </div>

      <div className={style['screen-content']}>
        {/* 漏斗图 */}
        <Funnel base={base} data={funnelList} />
        {/* 中国地图 */}
        <ChinaMap base={base} data={mapList} />
        {/* 饼图 */}
        <Pie base={base} data={pieList} />
      </div>

      <div className={style['screen-content_bottom']}>
        <TableView />
        <div className={style['chart_four']}>
          <div className={style['title-4']}>
            <Title title="近30天进件量与净增余额" />
          </div>

          <LineChart type="day" id="day" base={base} data={dayList} />

          <div className={style['title-5']}>
            <Title title="近1年进件量与净增余额" />
          </div>

          <LineChart type="month" id="month" base={base} data={monthList} />
        </div>
      </div>
    </div>
  );
};

export default ScreenPage;
