import { request } from 'umi';

// 获取总揽数据
export const getOverviewData = async (params?: any) => {
  return request('/screen/data/overview', {
    method: 'get',
    params,
  });
};

// 获取总揽数据
export const getFunnel = async (params?: any) => {
  return request('/screen/data/funnel', {
    method: 'get',
    params,
  });
};

const getMonthList = async (params?: any) => {
  return request('/screen/data/month', {
    method: 'get',
    params,
  });
};

const getYearList = async (params?: any) => {
  return request('/screen/data/year', {
    method: 'get',
    params,
  });
};

const getChinaMap = async (params?: any) => {
  return request('/screen/data/map', {
    method: 'get',
    params,
  });
};

const getTimeList = async (params?: any) => {
  return request('/screen/data/time', {
    method: 'get',
    params,
  });
};

export default {
  getOverviewData,
  getFunnel,
  getMonthList,
  getYearList,
  getChinaMap,
  getTimeList,
};
