import { Request, Response } from 'express';
// 总揽数据json
import overviewJson from '../screen/OverView.json';

const getTableList = (req: Request, res: Response) => {
  res.json(overviewJson);
};

const getRateLineList = (req: Request, res: Response) => {
  res.json({
    code: 0,
    msg: '成功',
    resObject: [
      {
        name: '9月1日',
        value1: 0.45,
        value2: 0.3,
      },
      {
        name: '9月2日',
        value1: 0.7,
        value2: 0.4,
      },
      {
        name: '9月3日',
        value1: 0.2,
        value2: 0.8,
      },
      {
        name: '9月4日',
        value1: 0.34,
        value2: 0.6,
      },
      {
        name: '9月5日',
        value1: 0.3,
        value2: 0.58,
      },
      {
        name: '9月6日',
        value1: 0.43,
        value2: 0.38,
      },
      {
        name: '9月7日',
        value1: 0.23,
        value2: 0.58,
      },
      {
        name: '9月8日',
        value1: 0.53,
        value2: 0.38,
      },
      {
        name: '9月9日',
        value1: 0.7,
        value2: 0.45,
      },
    ],
  });
};

const getWorkLineList = (req: Request, res: Response) => {
  res.json({
    code: 0,
    msg: '成功',
    resObject: [
      {
        name: '9月1日',
        value1: 30,
        value2: 10,
        value3: 20,
      },
      {
        name: '9月2日',
        value1: 20,
        value2: 30,
        value3: 10,
      },
      {
        name: '9月3日',
        value1: 17,
        value2: 60,
        value3: 40,
      },
      {
        name: '9月4日',
        value1: 25,
        value2: 70,
        value3: 30,
      },
      {
        name: '9月5日',
        value1: 23,
        value2: 60,
        value3: 10,
      },
      {
        name: '9月6日',
        value1: 15,
        value2: 55,
        value3: 76,
      },
      {
        name: '9月7日',
        value1: 5,
        value2: 35,
        value3: 26,
      },
      {
        name: '9月8日',
        value1: 2,
        value2: 34,
        value3: 58,
      },
      {
        name: '9月9日',
        value1: 10,
        value2: 44,
        value3: 68,
      },
    ],
  });
};

export default {
  'GET /screen/data/table': getTableList,
  'GET /screen/data/line': getRateLineList,
  'GET /screen/data/line2': getWorkLineList,
};
