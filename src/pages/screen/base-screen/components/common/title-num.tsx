import React, { useEffect } from 'react';
import { formateNumer } from '../../util';
import style from '../../style.less';

const TitleNum: React.FC<any> = (props: any) => {
  const { num1, num2, num3 } = props;

  return (
    <div className={`${style['center-box']} animate__animated animate__fadeInDown`}>
      <div className={style['center-box_left']}>
        <div className={style['tmp-box']}>
          <div className={style['center-box__header']}>
            <div className={style['icon_circle']}></div>
            <div>今日进件量</div>
          </div>
          <div className={style['center-box__content']}>{formateNumer(num1)}</div>
        </div>
      </div>
      <div className={style['center-box_center']}>
        <div className={style['center-box__header']}>
          <div className={style['icon_circle']}></div>
          <div>今日放款金额(万)</div>
        </div>
        <div className={style['center-box__content']}>{formateNumer(num2)}</div>
      </div>
      <div className={style['center-box_right']}>
        <div className={style['center-box__header']}>
          <div className={style['icon_circle']}></div>
          <div>今日净增余额(万)</div>
        </div>
        <div className={style['center-box__content']}>{formateNumer(num3)}</div>
      </div>
    </div>
  );
};

export default TitleNum;
