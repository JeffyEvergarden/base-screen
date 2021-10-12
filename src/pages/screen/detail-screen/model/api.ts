import { request } from 'umi';

const baseUrl = '';

// 获取总揽数据
export const getTableList = async (params?: any) => {
  return request(`${baseUrl}/screen/data/table`, {
    method: 'get',
    params,
  });
};

export const getRateLineList = async (params?: any) => {
  return request(`${baseUrl}/screen/data/line`, {
    method: 'get',
    params,
  });
};

export const getWorkLineList = async (params?: any) => {
  return request(`${baseUrl}/screen/data/line2`, {
    method: 'get',
    params,
  });
};

export default {
  getTableList,
  getRateLineList,
  getWorkLineList,
};
