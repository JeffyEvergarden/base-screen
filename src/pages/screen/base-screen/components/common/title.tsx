import React, { useEffect } from 'react';

import style from '../../style.less';

const Title: React.FC<any> = (props: any) => {
  const { title } = props;

  return (
    <div className={style['title-box']} data-title={title}>
      <div className={style['title_circle']}></div>
      <div className={style['title-content']}>{title}</div>
    </div>
  );
};

export default Title;
