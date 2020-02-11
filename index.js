// 1. 统计相同类型的个数
const obj = [
  {name: 'Frank', type: 1, age: 30},
  {name: 'Gold', type: 2, age: 29},
  {name: 'Peter', type: 2, age: 29},
  {name: 'Tome', type: 3, age: 29},
  {name: 'Linda', type: 1, age: 29},
  {name: 'Kobe', type: 3, age: 29},
  {name: 'James', type: 2, age: 29},
  {name: 'Li', type: 1, age: 29},
];
const statistics = obj.reduce((pre, cur) => {
  if (cur.type && cur.type in pre) {
    pre[cur.type]++;
  } else if (cur.type) {
    pre[cur.type] = 1;
  }
  return pre;
}, {});

// 2. 时间格式化相关
const moment = require('moment');
moment().subtract('month', 4).format('X'); // 四个月前
function timestamp() { // 时间戳
  return moment().unix();
}
function YYYYMMDDHHmmss() { // 时间
  return format('YYYY-MM-DD HH:mm:ss');
}
function YYYYMMDD(seperator) { // 分割的日期
  return format(`YYYY${seperator}MM${seperator}DD`);
}
function HHmmss(seperator = ':') { // 分割的时间
  return format(`HH${seperator}mm${seperator}ss`);
}
function format(formatX = 'YYYY-MM-DD HH:mm:ss', datetimeStr) { // 格式化时间
  let datetime
  if (isNaN(datetimeStr)) {
    datetime = datetimeStr ? moment(String(datetimeStr)) : moment();
  } else {
    datetime = datetimeStr ? moment(datetimeStr) : moment();
  }
  return datetime.format(formatX);
}
function weekName(date) { // 获取当前星期几
  moment.updateLocale('zh-cn', {
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  });
  moment.locale('zh-cn');
  date = date ? moment(date) : moment();
  return date.format('ddd');
}
function monthName(date) { // 获取当前几月份
  moment.updateLocale('zh-cn', {
    monthsShort: '一月_二月_三月_四月_五月_六月_七月_八月_九月_10月_11月_12月'.split('_'),
  });
  moment.locale('zh-cn');
  date = date ? moment(date) : moment();
  return date.format('MMM');
}

// 随机生成字母和数字的组合(可以用于生成用户的临时编号,例如微信号)
const randomStr = Math.random().toString(36).substr(2);
console.log(randomStr); // 88479nv1auj

// 转换布尔值
const isTrue = !0;
const isFalse = !1;
const alseFalse = !!0;
console.log(isTrue) // true
console.log(isFalse) // false 
console.log(alseFalse) // false

// 转换成数字
let numberOne = '100';
numberOne = +numberOne;
console.log(numberOne); // 100
let numberTwo = '2222';
numberTwo = ~~numberTwo;
console.log(numberTwo); // 2222

// 浮点数转整数
const intNum = 100.5 | 0;
console.log(intNum); // 100
const intNumTwo = ~~12.55;
console.log(intNumTwo); // 12

// 数组降纬度
let arrOne = [[2, 3], [4, 99], [88, 33]]; // 二维
arrOne = Array.prototype.concat.apply([], arrOne);
console.log(arrOne); // [ 2, 3, 4, 99, 88, 33 ]
let arrTwo = [[66, 99], [33], [122]]; // 二维
arrTwo = arrTwo.flat(2);
console.log(arrTwo); // [ 66, 99, 33, 122 ]
let arrThree = [[1], [2], [3], [[[4]]]]; // 多维
console.log(arrThree.flat(Infinity)); // [ 1, 2, 3, 4 ]

// 判断小数是否相等
function equal(num1, num2) {
  return Math.abs(num1 - num2) < Math.pow(2, -52);
}
console.log(equal(0.1+0.2, 0.3)); // true

// 数组去重
// 方法一:Set
Array.prototype.unique = function () {
  return [...new Set(this)];
}
const arrFour = [1, 3, 5, 3, 6, 88, 1, 6, 11, 33, 2, 6];
console.log(arrFour.unique()); // [1,  3,  5, 6, 88, 11, 33, 2]

// 方法二:Map
Array.prototype.unique = function() {
  const tmp = new Map();
  return this.filter(item => {
    return !tmp.has(item) && tmp.set(item, 1);
  })
}
const arrFive = [10, 32, 52, 32, 66, 88, 11, 6, 11, 33, 2, 66];
console.log(arrFive.unique()); // [10, 32, 52, 66, 88, 11,  6, 33,  2]

// 方法三:indexOf
Array.prototype.unique = function () {
  return this.filter((item, index) => {
    return this.indexOf(item) === index;
  })
}
const arrSix = [4, 5, 6, 4, 6, 11, 99, 88, 5];
console.log(arrSix.unique()); // [ 4, 5, 6, 11, 99, 88 ]

// 方法四:includes
Array.prototype.unique = function () {
  const newArr = [];
  this.forEach(item => {
    if (!newArr.includes(item)) {
      newArr.push(item);
    }
  });
  return newArr; 
}
const arrSeven = [114, 115, 116, 114, 116, 1111, 1199, 1188, 115];
console.log(arrSeven.unique()); // [ 114, 115, 116, 1111, 1199, 1188 ]

// 方法五:reduce
Array.prototype.unique = function () {
  return this.sort().reduce((init, current) => {
    if (init.length === 0 || init[init.length - 1] !== current) {
      init.push(current);
    }
    return init;
  }, []);
}
const arrEight = [224, 225, 226, 224, 226, 2211, 2299, 2288, 225];
console.log(arrEight.unique()); // [ 2211, 224, 225, 226, 2288, 2299 ]

// JSON.parse(JSON.strinify())
// 对简单对象实用，但是对函数，稀疏数组和正则对象则无效
// 对象的循环引用会抛出错误
// 1.针对不同类型，做特殊处理
const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;

  switch(type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};
// 2.针对正则表达式，再做区分
const getRegExp = re => {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
const clone = parent => {
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      child = [];
    } else if (isType(parent, 'RegExp')) {
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      child = new Date(parent.getTime());
    } else {
      proto = Object.getPrototypeOf(parent);
      child = Object.create(proto);
    }

    const index = parents.indexOf(parent);
    if (index != -1) {
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      child[i] = _clone(parent[i]);
    }

    return child;
  };

  return _clone(parent);
}
// 3.测试
function person(pname) {
  this.name = pname;
}
const Frank = new person('Frank');
function say() {
  console.log('hello world');
}

const oldObj = {
  a: say,
  c: new RegExp('ab+c', 'i'),
  d: Frank,
}
oldObj.b = oldObj;
const newObj = clone(oldObj);
console.log(newObj.a, oldObj.a);
console.log(newObj.b, oldObj.b);
console.log(newObj.c, oldObj.c);
console.log(newObj.d.constructor, oldObj.d.constructor); // /ab+c/i /ab+c/i

// Storage封装
const setStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key) => {
  let value = window.localStorage.getItem(key)
  try {
    value = JSON.parse(value)
  } catch (error) {}

  return value
}

const removeStorage = (key) => {
  window.localStorage.removeItem(key)
}

const clearStorage = () => {
  window.localStorage.clear()
}

const setSsionStorage = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

const getSsionStorage = (key) => {
  let value = window.sessionStorage.getItem(key)
  try {
    value = JSON.parse(value)
  } catch (error) {}

  return value
}

const removeSsionStorage = (key) => {
  window.sessionStorage.removeItem(key)
}

const clearSsionStorage = () => {
  window.sessionStorage.clear()
}

// Cookie封装
/*
 * 设置cookie
 * params [string] name [name是cookie中的名]
 * params [string] value [value是对应的值]
 * params [string] exdays [是多久过期(单位为分钟)]
 */
export const setCookie = (name, value, exdays) => {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 60 * 1000))
  const expires = 'expires=' + d.toGMTString()
  document.cookie = name + '=' + value + '; ' + expires
}

//获取cookie
/*
 * 获取cookie
 * params [string] name [name是cookie中的名]
 */
export const getCookie = (name) => {
  const arr = document.cookie.split('; ')
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].split('=')[0] === name) {
      return arr[i].split('=')[1]
    }
  }
  return ''
}

//删除cookie
/*
 * 设置cookie
 * params [string] name [name是cookie中的名]
 */
export const removeCookie = (name) => {
  setCookie(name, 1, -1)
}

// Promise封装
const Promise = require('bluebird');
function createPromiseCallback() {
  let cb;
  const promise = new Promise(function(resolve, reject) {
    cb = function(err, data) {
      if (err) return reject(err);
      return resolve(data);
    };
  });
  cb.promise = promise;
  return cb;
}