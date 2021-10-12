const numeral = require('numeral');

export const ONE_YI = 100000000;
export const ONE_W = 10000;

export function throttle(fn: (...args: any[]) => void, second: number) {
  let timer: any = null;

  return (...args: any[]) => {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, second);
  };
}

// 格式化百分比
export function formatePercent(val: number): string {
  if (typeof val === 'number') {
    let str1 = (val * 100).toFixed(0);
    let str2 = (val * 100).toFixed(2);
    return (Number(str1) === Number(str2) ? str1 : str2) + '%';
  }
  return '0%';
}

// 格式化 亿元
export function formateMoney(val: number): string {
  if (typeof val === 'number') {
    let str1 = (val / ONE_YI).toFixed(0);
    let str2 = (val / ONE_YI).toFixed(2);
    return Number(str1) === Number(str2) ? str1 : str2;
  }
  return val;
}

// 格式化
export function formateBaseMoney(val: number): string {
  if (typeof val === 'number') {
    if (val >= ONE_YI) {
      let str1 = (val / ONE_YI).toFixed(0);
      let str2 = (val / ONE_YI).toFixed(2);
      let str = Number(str1) === Number(str2) ? str1 : str2;
      str = formateNumer(Number(str));
      return str + '亿';
    }
    if (val >= ONE_W) {
      let str1 = (val / ONE_W).toFixed(0);
      let str2 = (val / ONE_W).toFixed(2);
      let str = Number(str1) === Number(str2) ? str1 : str2;
      str = formateNumer(Number(str));
      return str + '万';
    }
    let str1 = val.toFixed(0);
    let str2 = val.toFixed(2);
    let str = Number(str1) === Number(str2) ? str1 : str2;
    str = formateNumer(Number(str));
    return str;
  }
  return val;
}

// 格式化数字 1000 => 1,000

export function formateNumer(val: number): string {
  if (isNaN(val)) {
    return '0';
  }
  let str = numeral(val).format('0,0');
  if (val % 1 !== 0) {
    str = numeral(val).format('0,0.00');
  }
  return str;
}

export function formateInt(val: number): string {
  if (isNaN(val) || !val) {
    return '0';
  }
  let str = val.toFixed(0);
  return str;
}

export function formateWanNum(val: number): string {
  val = val / ONE_W;
  if (isNaN(val) || !val) {
    return '0';
  }
  let str1 = Number(val.toFixed(0));
  let str2 = Number(val.toFixed(2));
  let str = Number(str1) === Number(str2) ? str1 : str2;
  return formateNumer(str);
}
