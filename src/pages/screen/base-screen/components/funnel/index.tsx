import React, { useEffect, useLayoutEffect, useRef } from 'react';

import * as echarts from 'echarts';

import { option } from './config';
import { option as option2 } from './config-test';

import style from '../../style.less';

const Funnel: React.FC<any> = (props: any) => {
  const myChart = useRef<any>(null);

  useEffect(() => {
    var chartDom = document.getElementById('funnel');
    myChart.current = echarts.init(chartDom as any);
    myChart.current.setOption(option2);
  }, []);

  return (
    <>
      <div id="funnel" className={style['funnel-box']}></div>
    </>
  );
};

export default Funnel;
