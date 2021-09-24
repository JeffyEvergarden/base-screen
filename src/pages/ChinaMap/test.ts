import mapJson from './assets/map.json';

const testData: any = [];
const map = new Map();

function randomData() {
  return Math.round(Math.random() * 2000);
}

mapJson.features.forEach((item: any) => {
  console.log(item.properties.name);
  testData.push({
    name: item.properties.name,
    value: randomData(),
    extra: item.properties,
  });
  map.set(item.properties.adcode, item.properties.name);
});

console.log(map);

export default testData;
