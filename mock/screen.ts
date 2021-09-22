// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import moment from 'moment';
import mapJson from './util/map.json';
// 总揽数据json
import overviewJson from './screen/OverView.json';
// 漏斗数据json
import funnelJson from './screen/funnel.json';

// 年数据json
import yearJson from './screen/year.json';

// 月数据json
import monthJson from './screen/month.json';

// 月数据json
import timeJson from './screen/Time.json';

const ONE_YI = 100000000;
const TEN_MILLION = 10000000;

// 获取总揽
const getOverviewData = (req: Request, res: Response) => {
  res.json(overviewJson);
};

// 获取漏斗数据
const getFunnel = (req: Request, res: Response) => {
  res.json(funnelJson);
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
  monthJson.resObject.forEach((item) => {
    item.inPartsNumber = item.inPartsNumber * Math.random();
    item.growthBalance = Number((TEN_MILLION * Math.random() + 10 * TEN_MILLION).toFixed(0));
  });
  res.json(monthJson);
};

// 获取 年份数据
const getYearData = (req: Request, res: Response) => {
  yearJson.resObject.forEach((item) => {
    item.inPartsNumber = item.inPartsNumber * Math.random();
    item.growthBalance = Number((ONE_YI * Math.random() + 10 * ONE_YI).toFixed(0));
  });
  res.json(yearJson);
};

// 获取月份数据
const getTime = (req: Request, res: Response) => {
  res.json(timeJson);
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
      provinceName: item.properties.name,
      inPartsNumberByProvince: val,
      code: item.properties.adcode,
      extra: item.properties,
    });
  });

  testData = testData.sort((a: any, b: any) => b.value - a.value);
  res.json({
    code: 0,
    msg: '查询成功',
    resObject: testData,
  });
};

export default {
  'GET /screen/data/overview': getOverviewData,
  'GET /screen/data/funnel': getFunnel,
  'GET /screen/data/map': getChinaMap,
  'GET /screen/data/month': getMonthData,
  'GET /screen/data/year': getYearData,
  'GET /screen/data/time': getTime,
};
