import React, { useState, useMemo } from 'react';
import style from '../../style.less';

interface RadioButtonProps {
  value: string | number;
  onChange: (val: any) => void;
  children: any;
}

interface RadioProps {
  value: string | number;
  label?: string;
  realVal?: string | number;
  children?: any;
  onClick?: (val: any) => void;
}

const RadioButton: React.FC<RadioButtonProps> = (props: RadioButtonProps) => {
  const { value, onChange, children } = props;

  // 点击按钮
  const onClick = (val: any) => {
    onChange(val);
  };

  const newChildren = children.map((child: any, index: number) => {
    return React.cloneElement(child, {
      realVal: value,
      key: index,
      onClick,
    });
  });

  return <div className={style['radio-bg']}>{newChildren}</div>;
};

const Radio: React.FC<RadioButtonProps> = (props: RadioProps) => {
  const { value, children, realVal, onClick } = props;

  const flag = realVal === value;

  const clickItem = () => {
    onClick?.(value);
  };

  return (
    <div
      className={`${style['radio-item']} ${flag ? style['radio-item_checked'] : ''}`}
      onClick={() => {
        clickItem();
      }}
    >
      {children || value}
    </div>
  );
};

(RadioButton as any).Radio = Radio;

export default RadioButton;
