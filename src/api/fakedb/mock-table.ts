// Mock Imports
import { mock } from "./mock";

const list: Row[] = [];
for (let i = 0; i < 100; i++) {
  list.push({
    id: i,
    name: "name" + i,
    age: i,
  });
}

// Mock Table
mock.onGet("/dev/table").reply((config) => {
  const { params } = config;

  // ** Filter
  const filteredRows = list.filter((item) => {
    let allowId = true;
    let allowName = true;
    let allowAge = true;

    if (params.id) {
      allowId = String(item.id).includes(String(params.id));
    }
    if (params.name) {
      allowName = String(item.name).includes(String(params.name));
    }
    if (params.age) {
      allowAge = String(item.age).includes(String(params.age));
    }

    const isAllow = [allowId, allowName, allowAge];
    return isAllow.every((item) => item);
  });

  // ** Pagination
  const page = params.page || 1;
  const size = params.pageSize || 20;
  const pagiedRows = filteredRows.slice((page - 1) * size, size);

  const body = {
    rows: pagiedRows,
    total: filteredRows.length,
  };

  return [200, body];
});
mock.onPost("/dev/table").reply((config) => {
  const { data } = config;
  return [200, data];
});
mock.onDelete("/dev/table").reply((config) => {
  const { data } = config;
  return [200, data];
});

export interface Row {
  id: number;
  name: string;
  age: number;
}
