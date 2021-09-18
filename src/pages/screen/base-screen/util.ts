const numeral = require('numeral');

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
  return val;
}

// 格式化 亿元
export function formateMoney(val: number): string {
  if (typeof val === 'number') {
    let str1 = (val / 100000000).toFixed(0);
    let str2 = (val / 100000000).toFixed(2);
    return Number(str1) === Number(str2) ? str1 : str2;
  }
  return val;
}

// 格式化数字 1000 => 1,000

export function formateNumer(val: number): string {
  let str = numeral(val).format('0,0');
  return str;
}
