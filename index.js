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