// import * as echarts from 'echarts';

const colors = ['#1cd389', '#668eff', '#ffc751', '#ff6e73', '#8683e6', '#9692ff'];

// 虚拟数据源
var lineargroup = [
  {
    value: 100,
    name: '目标',
    oriname: '意向',
    number: 98756,
    color: ['rgba(29,211,137,0.8)', 'rgba(29,211,137,0)'],
  },
  {
    value: 80,
    name: '方案率',
    oriname: '方案',
    number: 88756,
    color: ['rgba(102,142,255,0.7)', 'rgba(102,142,255,0)'],
  },
  {
    value: 60,
    name: '商務率',
    oriname: '商務',
    number: 78756,
    color: ['rgba(255,198,82,0.6)', 'rgba(255,198,82,0)'],
  },
  {
    value: 40,
    name: '成交率',
    oriname: '即將成交',
    number: 68756,
    color: ['rgba(255,110,115,0.5)', 'rgba(255,110,115,0)'],
  },
  {
    value: 20,
    name: '贏單率',
    oriname: '贏單',
    number: 58756,
    color: ['rgba(134,131,230,0.4)', 'rgba(134,131,230,0)'],
  },
];
// 数据源1
var data1 = [];

for (var i = 0; i < lineargroup.length; i++) {
  var obj1 = {
    value: lineargroup[i].value,
    num: lineargroup[i].number,
    name: lineargroup[i].oriname,
  };
  data1.push(obj1);
}


var option = {
  backgroundColor: '#ffffff',
  color: colors,
  series: [
    {
      top: '5%',
      bottom: '5%',
      type: 'funnel',
      gap: 20,
      minSize: '35%',
      left: '5%',
      width: '70%',
      label: {
        show: true,
        position: 'inside',
        fontSize: '14',
        color: '#FFF',
        formatter: function (d: any) {
          var ins = d.name + '{aa|}\n' + d.data.num;
          return ins;
        },
        rich: {
          aa: {
            padding: [8, 0, 6, 0],
          },
        },
      },
      data: data1,
    },
  ],
};

export { option };
