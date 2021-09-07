import React from 'react';
// 通用组件
import { Card } from 'antd';

// 图表组件
import Funnel from './components/funnel';

//样式 和图片
import style from './style.less';
import logo from '@/assets/logo.png';
import { getCnTime } from '@/utils';

const ScreenPage: React.FC<any> = (props: any) => {
  return (
    <div className={style['screen-bg']}>
      {/* 标题 header栏 */}
      <div className={style['header']}>
        <div className={style['header-left']}>
          <img className={style['logo']} src={logo} />
          <div className={style['title']}>中邮消费金融业务实时监控大屏</div>
        </div>
        <div>{getCnTime()}</div>
      </div>

      <div className={style['screen-content_top']}>
        <div className={style['chart_one']}>
          <Card className={style['card']} title={'客户数据漏斗图'}>
              <Funnel />
          </Card>
        </div>
        <div className={style['chart_two']}>
          <Card className={style['card']}>hello</Card>
        </div>
        <div className={style['chart_three']}>
          <Card className={style['card']}>hello</Card>
        </div>
      </div>
    </div>
  );
};

export default ScreenPage;
