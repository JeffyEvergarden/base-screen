const testData = [
  {
    code: 110000,
    area: '北京',
    number: randomData(),
  },
  {
    code: 120000,
    area: '天津',
    number: randomData(),
  },
  {
    code: 130000,
    area: '河北',
    number: randomData(),
  },
  {
    code: 140000,
    area: '山西',
    number: randomData(),
  },
  {
    code: 150000,
    area: '内蒙古',
    number: randomData(),
  },
  {
    code: 210000,
    area: '辽宁',
    number: randomData(),
  },
  {
    code: 220000,
    area: '吉林',
    number: randomData(),
  },
  {
    code: 230000,
    area: '黑龙江',
    number: randomData(),
  },
  {
    code: 310000,
    area: '上海',
    number: randomData(),
  },
  {
    code: 320000,
    area: '江苏',
    number: randomData(),
  },
  {
    code: 330000,
    area: '浙江',
    number: randomData(),
  },
  {
    code: 340000,
    area: '安徽',
    number: randomData(),
  },
  {
    code: 350000,
    area: '福建',
    number: randomData(),
  },
  {
    code: 360000,
    area: '江西',
    number: randomData(),
  },
  {
    code: 370000,
    area: '山东',
    number: randomData(),
  },
  {
    code: 410000,
    area: '河南',
    number: randomData(),
  },
  {
    code: 420000,
    area: '湖北',
    number: randomData(),
  },
  {
    code: 430000,
    area: '湖南',
    number: randomData(),
  },
  {
    code: 440000,
    area: '广东',
    number: randomData(),
  },
  {
    code: 450000,
    area: '广西',
    number: randomData(),
  },
  {
    code: 460000,
    area: '海南',
    number: randomData(),
  },
  {
    code: 500000,
    area: '重庆',
    number: randomData(),
  },
  {
    code: 510000,
    area: '四川',
    number: randomData(),
  },
  {
    code: 520000,
    area: '贵州',
    number: randomData(),
  },
  {
    code: 530000,
    area: '云南',
    number: randomData(),
  },
  {
    code: 540000,
    area: '西藏',
    number: randomData(),
  },
  {
    code: 610000,
    area: '陕西',
    number: randomData(),
  },
  {
    code: 620000,
    area: '甘肃',
    number: randomData(),
  },
  {
    code: 630000,
    area: '青海',
    number: randomData(),
  },
  {
    code: 640000,
    area: '宁夏',
    number: randomData(),
  },
  {
    code: 650000,
    area: '新疆',
    number: randomData(),
  },
  {
    code: 710000,
    area: '台湾',
    number: randomData(),
  },
  {
    code: 810000,
    area: '香港',
    number: randomData(),
  },
  {
    code: 820000,
    area: '澳门',
    number: randomData(),
  },
];

function randomData() {
  return Math.round(Math.random() * 2000);
}

/**
 * 你可以自定义字段，
 **/
testData.map(function (i) {
  i.name = i.area;
  i.value = i.number;
  return i;
});

export default testData;
