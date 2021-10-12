import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
// 通用组件
import TableView from './components/TableView';
import LineChart from './components/LineChart';
import { RadioButton, Title } from './components/common/index';
// 数据来源
import { useTableModel, useLineModel } from './model';
import { throttle } from '../base-screen/util';
// 通用样式
import style from './style.less';

const { Radio: ZRadio } = RadioButton as any;

const DetailScreen: React.FC<any> = (props: any) => {
  // 比率计算
  const rate = document.body.clientWidth / 1920;
  const [base, setBase] = useState<number>(rate);

  useEffect(() => {
    const fn = throttle(() => {
      const realRate = document.body.clientWidth / 1920;
      setBase(realRate);
    }, 200);
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('resize', fn);
    };
  }, []);

  // radio/tab 按钮组
  const [RadioVal, setRadioVal] = useState<'day' | 'month' | 'year'>('day');
  // 表格数据
  const { tableList, getTableList } = useTableModel();
  // 时间更新列表
  const [updateList, setUpdateList] = useState<any[]>([]);
  // 当前图表查询的数据类型
  const [typeText, setTypeText] = useState<any>('合计');

  // 切换本日/本月/本年
  const handleRadioChange = (val: any) => {
    setRadioVal(val);
  };

  const { rateList, getRateLineList, workList, getWorkLineList } = useLineModel();

  useEffect(() => {
    getTableList();
    getWorkLineList();
  }, []);

  // 点击table 的关键词
  const onClickTableText = (text: any) => {
    console.log(text);
  };

  // 提示tooltips
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
    <div className={style['screen-bg_bg']}>
      <div className={style['screen-bg']}>
        <div className={style['title-bg']}>
          <div className={style['title']}>中邮消费金融分渠道业务量监控</div>
          <div className={style['tips-bg']}>
            <Tooltip
              placement="bottomRight"
              title={renderHeaderIcon}
              trigger={'hover'}
              overlayClassName={style['fake-tips']}
              overlayStyle={{ maxWidth: '700px' }}
            >
              <InfoCircleOutlined className={style['tips']} />
            </Tooltip>
          </div>
        </div>

        {/* 上折线图 */}
        <div className={style['chart-bg_one']}>
          <Title title={`${typeText}`} />

          <LineChart id={'one'} base={base} data={workList} className={style['mr4']} />

          {/* <LineChart id={'two'} data={workList} /> */}
        </div>

        {/* 下折线图 */}

        <div className={style['chart-bg_two']}>
          {/* <LineChart id={'three'} className={style['mr4']} />

          <LineChart id={'four'} /> */}
        </div>

        {/* 表格 */}
        <div className={style['table-bg']}>
          <div className={style['table-menu']}>
            <RadioButton onChange={handleRadioChange} value={RadioVal}>
              <ZRadio value="day">本日</ZRadio>
              <ZRadio value="month">本月</ZRadio>
              <ZRadio value="year">本年</ZRadio>
            </RadioButton>

            <div className={style['text-tips']}>︵还款金额及贷款余额都已剔除abs出表︶</div>
          </div>

          <TableView data={tableList} onClick={onClickTableText} />
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
