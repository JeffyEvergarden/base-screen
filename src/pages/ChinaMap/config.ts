const option = {
  /**
   * 你可以自定义样式
   **/
  tooltip: {
    formatter: function (info: any) {
      return info.name + '<br>数值:' + info.number + '<br>';
    },
  },
  series: [
    {
      type: 'map',
      mapType: 'china',
      selectedMode: 'false', //是否允许选中多个区域
      label: {
        normal: {
          show: true,
        },
        emphasis: {
          show: true,
        },
      },
    },
  ],
};

export { option };
