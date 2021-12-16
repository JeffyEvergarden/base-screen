import React, { useState, useEffect, useRef } from 'react';
// 通用组件
import { Tooltip, Spin } from 'antd';
import { Title, TitleNum, TitleNum2 } from './components/common';
import { InfoCircleOutlined } from '@ant-design/icons';
import { WaterMark } from '@ant-design/pro-layout';
// 图表组件
import Funnel from './components/funnel';
import ChinaMap from './components/ChinaMap';
import Pie from './components/Pie';
import TableView from './components/Table';
import LineChart from './components/LineChart';
// import TestView from './components/TestView';
//样式 和图片
import style from './style.less';
// import logo from '@/assets/logo.png';
// 方法
// import { getCnTime, getIP } from '@/utils';
import { throttle } from './util';

// 数据
import { useOverViewModel, useFunnelModel, useLineModal, useMapModel, useTimeModel } from './model';
import { getRemoteIP } from './model/api';
import Condition from './components/common/Condition';

const ScreenPage: React.FC<any> = (props: any) => {
  // 比率计算
  const rate = document.body.clientWidth / 1920;
  const [base, setBase] = useState<number>(rate);

  const [ip, setIP] = useState<string>('');

  useEffect(() => {
    getRemoteIP()
      .then((res: any) => {
        console.log('接口获取ip');
        // console.log(res)
        res = res?.resObject || '';
        setIP(ip || res || '');
      })
      .catch((err) => {
        console.log('err');
        console.log(err);
      });
    const fn = throttle(() => {
      const realRate = document.body.clientWidth / 1920;
      setBase(realRate);
    }, 200);
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('resize', fn);
    };
  }, []);

  // 总揽数据 饼图数据
  const {
    dayInNum,
    dayOutMoney,
    dayNetProfitMoney,
    total,
    pieList,
    tableList,
    overviewFinished,
    getOverviewData,
  } = useOverViewModel();

  // 更新数据
  const { tipsTime, tipsTime2, updateList, getTime } = useTimeModel();

  // 漏斗数据
  const { funnelList, getFunnel, funnelLoading } = useFunnelModel();

  // 直线表数据
  const { dayList, monthList, dayLoading, monthLoading, getMonthList, getYearList } =
    useLineModal();

  // 漏斗数据
  const { mapList, getMap } = useMapModel();

  const getList = () => {
    getOverviewData(); // 总揽数据
    getFunnel(); // 漏斗数据
    getMonthList(); // 月份数据
    getYearList(); // 年份数据
    getMap(); // 地图数据
    getTime();
  };

  useEffect(() => {
    getList(); // 获取数据

    // 计时
    const fake = setInterval(() => {
      getList();
    }, 2 * 60 * 1000);
    return () => {
      clearInterval(fake);
    };
  }, []);

  // const fake: any = useRef<any>(null);

  // const callback = (obj: any) => {
  //   console.log('fake')
  //   fake.current.update(obj);
  // };

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
    <WaterMark content={ip}>
      <div className={style['screen-bg']}>
        {/* 标题 header栏 */}
        <div className={style['header']}>
          <div className={style['header-left']}>
            <div className={style['title']}>中邮消费金融基础业务量监控</div>
          </div>
          <div className={style['time']}>
            <div>
              <div>进件数据更新时间：{tipsTime}</div>
              <div>放款数据更新时间：{tipsTime2}</div>
            </div>
            <div className={style['time_icon']}>
              <Tooltip
                placement="bottomRight"
                title={renderHeaderIcon}
                trigger={'hover'}
                overlayClassName={style['fake-tips']}
                overlayStyle={{ maxWidth: '700px' }}
              >
                <div className={style['inner-tips']}>
                  <InfoCircleOutlined />
                </div>
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
          {/* <TitleNum2 cref={fake} num1={dayInNum} num2={dayOutMoney} num3={dayNetProfitMoney} /> */}
        </div>

        <div className={style['screen-content']}>
          {/* 漏斗图 */}
          <Funnel base={base} data={funnelList} loading={funnelLoading} />
          {/* 中国地图 */}
          <ChinaMap base={base} data={mapList} />
          {/* 饼图  需显示总贷款余额*/}
          <Condition r-if={overviewFinished}>
            <Pie base={base} data={pieList} totalMoney={total} />
          </Condition>
        </div>

        <div className={style['screen-content_bottom']}>
          <TableView data={tableList} base={base} />
          <div className={style['title-tips']}>
            备注：结存用户数及余额指标都已剔除abs出表，金额单位为：万元
          </div>
          <div className={style['chart_four']}>
            <div className={style['title-4']}>
              <Title title="近30天进件量与净增余额" />
            </div>

            <LineChart type="day" id="day" base={base} data={dayList} loading={dayLoading} />

            <div className={style['title-5']}>
              <Title title="近1年进件量与净增余额" />
            </div>

            <LineChart
              type="month"
              id="month"
              base={base}
              data={monthList}
              loading={monthLoading}
            />
          </div>
        </div>
      </div>
    </WaterMark>
  );
};

export default ScreenPage;
