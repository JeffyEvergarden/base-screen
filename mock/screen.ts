// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import moment from 'moment';
import mapJson from './util/map.json';

// 获取总揽
const getOverviewData = (req: Request, res: Response) => {
  res.json({
    resultCode: '000',
    data: {
      dayInNum: 28999,
      dayOutMoney: 828999,
      dayNetProfitMoney: 828999,
    },
  });
};

// 获取漏斗数据
const getFunnel = (req: Request, res: Response) => {
  // 虚拟数据源
  let lineargroup = [
    {
      value: 100,
      name: '可触达1',
      oriname: '可触达1',
      number: 98756,
      color: ['rgba(29,211,137,0.8)', 'rgba(29,211,137,0)'],
    },
    {
      value: 80,
      name: '投件',
      oriname: '投件',
      number: 88756,
      color: ['rgba(102,142,255,0.7)', 'rgba(102,142,255,0)'],
    },
    {
      value: 60,
      name: '进件',
      oriname: '进件',
      number: 78756,
      color: ['rgba(255,198,82,0.6)', 'rgba(255,198,82,0)'],
    },
    {
      value: 40,
      name: '成交率',
      oriname: '成交率',
      number: 68756,
      color: ['rgba(255,110,115,0.5)', 'rgba(255,110,115,0)'],
    },
    {
      value: 20,
      name: '贏单率',
      oriname: '贏单率',
      number: 58756,
      color: ['rgba(134,131,230,0.4)', 'rgba(134,131,230,0)'],
    },
  ];
  // 测试数据
  const testData: any = [];
  for (let i = 0; i < lineargroup.length; i++) {
    let obj1 = {
      value: lineargroup[i].value,
      num: lineargroup[i].number,
      percent: lineargroup[i].value,
      name: lineargroup[i].oriname,
    };
    testData.push(obj1);
  }

  res.json({
    resultCode: '000',
    data: testData,
  });
};

// 获取 中国地图 进件数据

// 获取饼图数据
const getPieData = (req: Request, res: Response) => {
  const testData: any = [
    { value: 1050, name: '中邮钱包', realPercent: '10%' },
    { value: 735, name: '支付宝', realPercent: '10%' },
    { value: 580, name: '微信', realPercent: '10%' },
    { value: 484, name: '手机银行', realPercent: '10%' },
    { value: 300, name: '蚂蚁金服务', realPercent: '10%' },
    { value: 250, name: 'fuck', realPercent: '10%' },
    { value: 300, name: '其他', realPercent: '10%' },
  ];
  res.json({
    resultCode: '000',
    data: testData,
  });
};

// 获取表格数据
const getTableList = (req: Request, res: Response) => {};

// 获取月份数据
const getMonthData = (req: Request, res: Response) => {
  const columns = ['09-01', '09-02', '09-03', '09-04', '09-06', '09-07'];
  const data1 = [300, 400, 700, 200, 100, 600];
  const data2 = [3000, 4030, 4700, 1200, 8000, 5600];
  const data = columns.map((item: any, i: number) => {
    return {
      name: item,
      value1: data1[i],
      value2: data2[i],
    };
  });
  res.json({
    resultCode: '000',
    data: data,
  });
};

// 获取 年份数据
const getYearData = (req: Request, res: Response) => {
  const columns = ['1月', '2月', '3月', '4月', '5月', '6月'];
  const data1 = [300, 400, 700, 200, 100, 600];
  const data2 = [3000, 4030, 4700, 1200, 8000, 5600];
  const data = columns.map((item: any, i: number) => {
    return {
      name: item,
      value1: data1[i],
      value2: data2[i],
    };
  });
  res.json({
    resultCode: '000',
    data: data,
  });
};

const getChinaMap = (req: Request, res: Response) => {
  let testData: any = [];
  function randomData() {
    return Math.round(Math.random() * 2000);
  }

  mapJson.features.forEach((item: any) => {
    let val = randomData();
    if (item.properties.name === '海南省') {
      val = 2000;
    }
    if (!item.properties.name) {
      return;
    }
    testData.push({
      name: item.properties.name,
      value: val,
      extra: item.properties,
    });
  });

  testData = testData.sort((a: any, b: any) => b.value - a.value);
};

export default {
  'GET /screen/base/overall': getOverviewData,
  'GET /screen/base/funnel': getFunnel,
  'GET /screen/base/chinaMap': getChinaMap,
  'GET /screen/base/Pie': getPieData,
  'GET /screen/base/table': getTableList,
  'GET /screen/base/month': getMonthData,
  'GET /screen/base/year': getYearData,
};
