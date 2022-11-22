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
import './animate.css';
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

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

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
      if (window.screen.height - document.body.clientHeight < 6) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    }, 200);
    fn();
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
  const { funnelList, getFunnel, funnelLoading, funnelFinish } = useFunnelModel();

  // 直线表数据
  const {
    dayList,
    monthList,
    dayLoading,
    monthLoading,
    getMonthList,
    getYearList,
    dayFinished,
    monthFinished,
  } = useLineModal();

  // 地图数据
  const { mapList, getMap, mapFinish } = useMapModel();

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
      <div className={`${style['screen-bg']} ${isFullScreen ? style['screen_fullscreen'] : ''} `}>
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
          <Condition r-if={funnelFinish}>
            <div className={`${style['title-1']} animate__animated animate__fadeInLeft`}>
              <Title title="客户数" />
            </div>
          </Condition>
          <Condition r-if={overviewFinished}>
            <div className={`${style['title-2']} animate__animated animate__fadeInRight`}>
              <Title title="贷款余额" />
            </div>
          </Condition>

          <Condition r-if={overviewFinished}>
            <TitleNum num1={dayInNum} num2={dayOutMoney} num3={dayNetProfitMoney} />
          </Condition>
          {/* <TitleNum2 cref={fake} num1={dayInNum} num2={dayOutMoney} num3={dayNetProfitMoney} /> */}
        </div>

        <div className={style['screen-content']}>
          {/* 漏斗图 */}

          <div className={style['chart_one']}>
            <Condition r-if={funnelFinish}>
              <Funnel
                base={base}
                data={funnelList}
                loading={funnelLoading}
                fullScreen={isFullScreen}
              />
            </Condition>
          </div>

          {/* 中国地图 */}

          <div className={style['chart_two']}>
            <Condition r-if={mapFinish}>
              <Title
                title="进件省份分布"
                className={`${style['title-map']} animate__animated animate__fadeInDown`}
              />
              <ChinaMap base={base} data={mapList} fullScreen={isFullScreen} />
            </Condition>
          </div>

          {/* 饼图  需显示总贷款余额*/}
          <div className={style['chart_three']}>
            <Condition r-if={overviewFinished}>
              <Pie base={base} data={pieList} totalMoney={total} fullScreen={isFullScreen} />
            </Condition>
          </div>
        </div>

        <div className={style['screen-content_bottom']}>
          <TableView data={tableList} base={base} />

          <div className={style['chart_four']}>
            <div className={style['title-4']}>
              <Condition r-if={dayFinished}>
                <Title
                  title="近30天进件量与净增余额"
                  className={`animate__animated animate__fadeInRight`}
                />
              </Condition>
            </div>

            <div className={style['_line-box']}>
              <Condition r-if={dayFinished}>
                <LineChart
                  type="day"
                  id="day"
                  base={base}
                  data={dayList}
                  loading={dayLoading}
                  fullScreen={isFullScreen}
                />
              </Condition>
            </div>

            <div className={style['title-5']}>
              <Condition r-if={monthFinished}>
                <Title
                  title="近1年进件量与净增余额"
                  className={`animate__animated animate__fadeInRight`}
                />
              </Condition>
            </div>

            <div className={style['_line-box']}>
              <Condition r-if={monthFinished}>
                <LineChart
                  type="month"
                  id="month"
                  base={base}
                  data={monthList}
                  loading={monthLoading}
                  fullScreen={isFullScreen}
                />
              </Condition>
            </div>
          </div>
        </div>
      </div>
    </WaterMark>
  );
};

export default ScreenPage;
