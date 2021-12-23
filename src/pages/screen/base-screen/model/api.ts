import { request } from '@/services/request';

const baseUrl = '/businessScreen';

// 获取总揽数据
export const getOverviewData = async (params?: any) => {
  return request(`${baseUrl}/screen/data/overview`, {
    method: 'get',
    params,
  });
};

// 获取总揽数据
export const getFunnel = async (params?: any) => {
  return request(`${baseUrl}/screen/data/funnel`, {
    method: 'get',
    params,
  });
};

const getMonthList = async (params?: any) => {
  return request(`${baseUrl}/screen/data/month`, {
    method: 'get',
    params,
  });
};

const getYearList = async (params?: any) => {
  return request(`${baseUrl}/screen/data/year`, {
    method: 'get',
    params,
  });
};

const getChinaMap = async (params?: any) => {
  return request(`${baseUrl}/screen/data/map`, {
    method: 'get',
    params,
  });
};

const getTimeList = async (params?: any) => {
  return request(`${baseUrl}/screen/data/time`, {
    method: 'get',
    params,
  });
};

export const getRemoteIP = async (params?: any) => {
  return request(`${baseUrl}/screen/data/ip`, {
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
  getRemoteIP,
};
