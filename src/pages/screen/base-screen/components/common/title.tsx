import React, { useEffect } from 'react';

import style from '../../style.less';

const Title: React.FC<any> = (props: any) => {
  const { title, className } = props;

  return (
    <div className={`${style['title-box']} ${className}`} data-title={title}>
      <div className={style['title_circle']}></div>
      <div className={style['title-content']}>{title}</div>
    </div>
  );
};

export default Title;
