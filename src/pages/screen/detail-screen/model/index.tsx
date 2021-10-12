import { useState } from 'react';
import API from './api';
import { message } from 'antd';

export const useTableModel = () => {
  const [tableList, setTableList] = useState<any[]>([]);
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
  const getTableList = async () => {
    let res = await API.getTableList();
    const data: any = res?.resObject || {};
    if (res.code === 0) {
      // 表格数据加工
      setTableList(processTable(data));
    }
  };

  return {
    tableList,
    getTableList,
  };
};

export const useLineModel = () => {
  const [rateList, setRateList] = useState<any[]>([]);
  const [workList, setWorkList] = useState<any[]>([]);

  const getRateLineList = async (params?: any) => {
    let res = await API.getRateLineList();
    const list: any[] = res?.resObject || [];
    if (res.code === 0) {
      setRateList(rateList);
    } else {
      message.warning('通过率指标折线图接口网络异常');
    }
  };

  const getWorkLineList = async (params?: any) => {
    let res = await API.getWorkLineList();
    const list: any[] = res?.resObject || [];
    console.log(list);
    if (res.code === 0) {
      setWorkList(list);
    } else {
      message.warning('业务量指标折线图接口网络异常');
    }
  };

  return {
    rateList,
    workList,
    getRateLineList,
    getWorkLineList,
  };
};
