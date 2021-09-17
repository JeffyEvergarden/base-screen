import { request } from 'umi';

// 获取总揽数据
export const getOverviewData = async (params?: any) => {
  return request('/screen/base/overall', {
    method: 'get',
    params,
  });
};

// 获取总揽数据
export const getFunnel = async (params?: any) => {
  return request('/screen/base/funnel', {
    method: 'get',
    params,
  });
};

const getPieList = async (params?: any) => {
  return request('/screen/base/Pie', {
    method: 'get',
    params,
  });
};

const getMonthList = async (params?: any) => {
  return request('/screen/base/month', {
    method: 'get',
    params,
  });
};

const getYearList = async (params?: any) => {
  return request('/screen/base/year', {
    method: 'get',
    params,
  });
};

export default {
  getOverviewData,
  getFunnel,
  getPieList,
  getMonthList,
  getYearList,
};
