import mapJson from './assets/map.json';

const testData: any = [];

function randomData() {
  return Math.round(Math.random() * 2000);
}

mapJson.features.forEach((item: any) => {
  testData.push({
    name: item.properties.name,
    value: randomData(),
    extra: item.properties,
  });
});

export default testData;
