import { useState } from 'react';
import { formateBaseMoney } from '../util';
import API from './api';

// 总揽数据 （这个接口 处理 总揽/饼图/表格）
export const useOverViewModel = () => {
  // 总揽数据
  const [dayInNum, setDayInNum] = useState<any>('');
  const [dayOutMoney, setDayOutMoney] = useState<any>('');
  const [dayNetProfitMoney, setDayNetProfitMoney] = useState<any>('');

  const [total, setTotal] = useState<any>('');

  // 表格数据
  const [tableList, setTableList] = useState<any>('');

  // 饼图数据
  const [pieList, setPieList] = useState<any[]>([]);

  // 处理表格数据
  const processTable = (data: any) => {
    const originTableList: any[] = [];
    const totalObj: any = data.total || {};
    const otherObj: any = data.other || {};
    const onlineList: any[] = data.onlineDataList || [];
    const offlineList: any[] = data.offlineDataList || [];
    onlineList.forEach((item: any, index: number) => {
      originTableList.push({
        ...item,
        key: `online-${index}`,
        channel: index === 0 ? '线上' : '',
        rowSpan: index === 0 ? onlineList.length : 0,
      });
    });
    offlineList.forEach((item: any, index: number) => {
      originTableList.push({
        ...item,
        key: `offline-${index}`,
        channel: index === 0 ? '线下' : '',
        rowSpan: index === 0 ? offlineList.length : 0,
      });
    });
    originTableList.push({
      ...otherObj,
      key: `other-${0}`,
      channel: '其他',
    });
    originTableList.push({
      ...totalObj,
      key: `total-${0}`,
      channel: '合计',
    });
    return originTableList;
  };

  const getOverviewData = async () => {
    const res: any = await API.getOverviewData();
    const data: any = res?.resObject || {};

    const totalObj: any = data.total || {};
    const pieDataList: any[] = data.pieDataList || [];
    if (res.code === 0) {
      // 处理总揽数据
      // 今日放款金额(万)
      const loansMoneyByDay = Math.floor((totalObj.loansMoneyByDay || 0) / 10000);
      // 今日净增余额(万)
      const growthBalanceByDay = Math.floor((totalObj.growthBalanceByDay || 0) / 10000);

      const totalVal = totalObj.loanBalance || 0;

      // 总揽数据
      setDayInNum(totalObj.inPartsNumberByDay || 0);
      setDayOutMoney(loansMoneyByDay || 0); // 处理成万
      setDayNetProfitMoney(growthBalanceByDay || 0); // 处理成万
      setTotal(totalVal);
      // 处理饼图数据
      const list = pieDataList.map((item: any) => {
        return {
          name: item.channelName, // 名称
          value: item.loalBalance, // 资本额度
          realPercent: item.rate, // 百分比
        };
      });
      setPieList(list);
      // 表格数据加工
      setTableList(processTable(data));
    }
  };

  return {
    dayInNum,
    dayOutMoney,
    dayNetProfitMoney,
    total,
    pieList,
    tableList,
    getOverviewData,
  };
};

// 漏斗数据
export const useFunnelModel = () => {
  const [funnelList, setFunnelList] = useState<any[]>([]);

  const getFunnel = async () => {
    const res: any = await API.getFunnel();
    let data: any = res?.resObject || [];
    data = data.map((item: any, i: number) => {
      return {
        name: item.custType,
        value: 5 - i,
        percent: item.percent,
        num: item.customerNumber,
      };
    });
    setFunnelList(data || []);
  };

  return {
    funnelList,
    getFunnel,
  };
};

// 获取 近30天进件量与净增余额 近1年进件量与净增余额

export const useLineModal = () => {
  const [dayList, setDayList] = useState<any[]>([]);
  const [monthList, setMonthList] = useState<any[]>([]);

  const getMonthList = async () => {
    const res: any = await API.getMonthList();
    let data: any = res?.resObject || [];
    data = data.map((item: any) => {
      return {
        name: item.day,
        value1: item.inPartsNumber,
        value2: item.growthBalance,
      };
    });
    setDayList(data || []);
  };

  const getYearList = async () => {
    const res: any = await API.getYearList();
    let data: any = res?.resObject || [];
    data = data.map((item: any) => {
      return {
        name: item.month,
        value1: item.inPartsNumber,
        value2: item.growthBalance,
      };
    });
    setMonthList(data || []);
  };

  return {
    dayList,
    monthList,
    getMonthList,
    getYearList,
  };
};

// 地图数据
export const useMapModel = () => {
  const [mapList, setMapList] = useState<any[]>([]);

  const getMap = async () => {
    const res: any = await API.getChinaMap();
    let data: any = res?.resObject || [];

    data = data.map((item: any) => {
      return {
        code: item.CODE,
        name: item.NAME,
        value: item.NUM,
      };
    });
    // console.log('map', data);
    setMapList(data || []);
  };
  return {
    mapList,
    getMap,
  };
};

// 更新时间

export const useTimeModel = () => {
  // 更新时间
  const [updateList, setUpdateList] = useState<any[]>([]);
  const getTime = async () => {
    const res: any = await API.getTimeList();
    let data: any = res?.resObject || [];

    data = data.map((item: any) => {
      return {
        name: item.updateName,
        date: item.updateTime,
      };
    });
    // console.log('map', data);
    setUpdateList(data || []);
  };
  return {
    updateList,
    getTime,
  };
};
