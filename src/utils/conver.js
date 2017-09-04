// Map 转 对象
import {request} from "./request";

function mapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

// 对象 转 Map
function objToMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

// Map 转 Json
function mapToJson(strMap) {
  return JSON.stringify(mapToObj(strMap));
}

// Json 转 Map
function jsonToMap(jsonStr) {
  return objToMap(JSON.parse(jsonStr));
}

// Map 转 url参数
function mapToUrlParame(map) {
  let result = '';
  for (let [key, value] of map) {
    result += `${key}=${value}&`;
  }
  return result.substr(0, result.length - 1);
}

// Map 拷贝
function extend(defaultOpt, opts) {
  let opt = new Map([...opts]);

  for (let [key, value] of defaultOpt) {
    if (!opts.has(key)) {
      opt.set(key, value);
    }
  }

  return opt
}

// object 转 url参数
function objToUrlParame(data) {
  let result = '';
  if (!data) {
    return result;
  }

  for (let item of Object.keys(data)) {
    result += `${item}=${data[item]}&`;
  }
  if (result) {
    result = result.substr(0, result.length - 1);
  }

  return result;
}

// object 转 FormData
function objToFormData(data) {
  let result = new FormData();

  if (!data) {
    return result;
  }

  for (let item of Object.keys(data)) {
   result.append(item,data[item]);
  }

  return result;
}
export default {
  extend,
  mapToJson,
  objToMap,
  mapToObj,
  jsonToMap,
  mapToUrlParame,
  objToUrlParame,
  objToFormData,
};
