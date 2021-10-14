/**
 * Created by TaylorTang on 2019/4/1.
 */

import { constant } from 'lodash';

// 格式化时间
export function getCurrentTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function getCnTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
}

export function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
}

// 格式化时分秒

export function getHMSTime(date: Date, flag: boolean = true): string {
  let year;
  let day;
  let month;
  if (flag) {
    year = date.getFullYear();
    month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  }
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  if (!flag) {
    return `${hour}:${minute}:${second}`;
  }
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function getIP(callback: (...args: any[]) => void) {
  const MyPeerConnection =
    window.RTCPeerConnection ||
    (window as any).mozRTCPeerConnection ||
    window.webkitRTCPeerConnection; //compatibility for firefox and chrome
  //console.log(myPeerConnection )

  const restartConfig: any = { iceServers: [] };
  // var pc = new myPeerConnection({ iceServers: [] }),
  const pc: any = new MyPeerConnection({ iceServers: [] } as any);
  const noop: any = function () {};
  const localIPs: any = {};
  const ipRegex: any = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

  function ipIterate(ip: string) {
    if (!localIPs[ip]) callback(ip);
    localIPs[ip] = true;
  }
  pc.setConfiguration(restartConfig);
  pc.createDataChannel('');
  pc.createOffer().then(function (sdp: any) {
    sdp.sdp.split('\n').forEach(function (line: any) {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(ipIterate);
    });
    pc.setLocalDescription(sdp, noop, noop);
  });
  pc.onicecandidate = function (ice: any) {
    if (
      !ice ||
      !ice.candidate ||
      !ice.candidate.candidate ||
      !ice.candidate.candidate.match(ipRegex)
    )
      return;
    ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
  };
}
