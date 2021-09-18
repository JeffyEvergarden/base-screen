import mapJson from './assets/map.json';

mapJson.features.forEach((item: any) => {
  if (item.properties.name === '海南省') {
    let arr: any[] = [];
    item.geometry.coordinates.forEach((arr1: any[]) => {
      let arr2 = arr1[0][0];
      if (arr2[1] > 18) {
        arr.push(arr1);
      }
    });
    item.geometry.coordinates = arr;
  }
});

export default mapJson;
