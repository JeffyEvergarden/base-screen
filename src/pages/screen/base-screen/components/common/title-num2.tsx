import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { formateNumer } from '../../util';
import style from '../../style.less';

const TitleNum: React.FC<any> = (props: any) => {
  const { cref } = props;

  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [num3, setNum3] = useState<number>(0);
  // const { num1, num2, num3 } = props;

  const timeFn: any = useRef<any>({});
  const startInterval = () => {
    const timeFnInfo: any = timeFn.current;
    const obj = timeFnInfo.origin;
    const target = timeFnInfo.target;
    timeFnInfo.fn = setInterval(() => {
      ['1', '2', '3'].forEach((key: any) => {
        const len = timeFnInfo[`len${key}`];
        const val = obj[`num${key}`];
        const targetVal = target[`num${key}`];
        const newVal = val + len;
        if (len > 0 && newVal > targetVal) {
          return;
        }
        if (len < 0 && newVal < targetVal) {
          return;
        }
        obj[`num${key}`] = newVal;
      });
      console.log('更新');
      setNum1(obj.num1);
      setNum2(obj.num2);
      setNum3(obj.num3);
    }, 500);
  };

  const startFn = (obj: any) => {
    const timeFnInfo: any = timeFn.current;
    clearInterval(timeFnInfo.fn);
    timeFnInfo.target = obj; // 目标对象
    timeFnInfo.origin = {
      num1,
      num2,
      num3,
    };
    timeFnInfo.len1 = Math.ceil((obj.num1 - num1) / 60);
    timeFnInfo.len2 = Math.ceil((obj.num2 - num2) / 60);
    timeFnInfo.len3 = Math.ceil((obj.num2 - num3) / 60);
    console.log(timeFnInfo);
    startInterval();
  };

  useImperativeHandle(
    cref,
    () => ({
      init: (obj: any) => {
        setNum1(obj.num1 || 0);
        setNum2(obj.num2 || 0);
        setNum3(obj.num3 || 0);
      },
      update: (obj: any) => {
        startFn(obj);
      },
    }),
    [],
  );

  return (
    <div className={style['center-box']}>
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
