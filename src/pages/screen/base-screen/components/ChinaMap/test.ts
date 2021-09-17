import mapJson from './assets/map.json';

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

const data = testData.sort((a: any, b: any) => b.value - a.value);

export default data;
