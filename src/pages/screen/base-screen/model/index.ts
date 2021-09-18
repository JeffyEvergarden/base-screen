import { useState } from 'react';
import API from './api';

// 总揽数据
export const useOverViewModel = () => {
  const [dayInNum, setDayInNum] = useState<any>('');
  const [dayOutMoney, setDayOutMoney] = useState<any>('');
  const [dayNetProfitMoney, setDayNetProfitMoney] = useState<any>('');

  const getOverviewData = async () => {
    const res: any = await API.getOverviewData();
    const data: any = res?.data || {};
    setDayInNum(data.dayInNum || 0);
    setDayOutMoney(data.dayOutMoney || 0);
    setDayNetProfitMoney(data.dayNetProfitMoney || 0);
  };

  return {
    dayInNum,
    dayOutMoney,
    dayNetProfitMoney,
    getOverviewData,
  };
};

// 漏斗数据
export const useFunnelModel = () => {
  const [funnelList, setFunnelList] = useState<any[]>([]);

  const getFunnel = async () => {
    const res: any = await API.getFunnel();
    const data: any = res?.data || [];
    setFunnelList(data || []);
  };

  return {
    funnelList,
    getFunnel,
  };
};

// 获取漏斗数据 和 表格数据

export const usePieModel = () => {
  const [pieList, setPieList] = useState<any[]>([]);

  const getPieList = async () => {
    const res: any = await API.getPieList();
    const data: any = res?.data || [];
    setPieList(data || []);
  };

  return {
    pieList,
    getPieList,
  };
};

// 获取 近30天进件量与净增余额 近1年进件量与净增余额

export const useLineModal = () => {
  const [dayList, setDayList] = useState<any[]>([]);
  const [monthList, setMonthList] = useState<any[]>([]);

  const getMonthList = async () => {
    const res: any = await API.getMonthList();
    const data: any = res?.data || [];
    setDayList(data || []);
  };

  const getYearList = async () => {
    const res: any = await API.getYearList();
    const data: any = res?.data || [];
    setMonthList(data || []);
  };

  return {
    dayList,
    monthList,
    getMonthList,
    getYearList,
  };
};

export const useTableModel = () => {};

// 地图数据
export const useMapModel = () => {
  const [mapList, setMapList] = useState<any[]>([]);

  const getMap = async () => {
    const res: any = await API.getChinaMap();
    const data: any = res?.data || [];
    // console.log('map', data);
    setMapList(data || []);
  };
  return {
    mapList,
    getMap,
  };
};
