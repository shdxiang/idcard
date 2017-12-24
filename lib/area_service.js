//docs:http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201504/t20150415_712722.html
var util = require('./util');
var undefinedText = "未知";

function _checkCard(idcard) {
  if (!util.isString(idcard) || idcard.length !== 18) {
    return false;
  }
  return true;
}

function _getSexual(idcard) {
  if (!_checkCard(idcard)) {
    return undefinedText;
  }
  var sexualChar = idcard.slice(idcard.length - 2, idcard.length - 1);
  if (isNaN(Number(sexualChar))) {
    return undefinedText;
  }
  if (Number(sexualChar) % 2 === 0) {
    return "F";
  }
  return "M";
}

function _getBirthday(idcard) {
  if (!_checkCard(idcard)) {
    return undefinedText;
  }
  var birthday = idcard.slice(6, 14);
  if (isNaN(Number(birthday))) {
    return undefinedText;
  }
  if (!util.verifyBirthday(birthday)) {
    return undefinedText;
  }
  return Number(birthday);
}

function idcardinfo(idcard) {
  var info = {
    valid: true,
    gender: _getSexual(idcard),
    birthday: _getBirthday(idcard),
    cardType: 1,
    cardText: '大陆'
  }
  info.age = getAge(info.birthday);
  switch (idcard.slice(0, 6)) {
    case '710000':
      info.cardType = 2;
      info.cardText = '中国台湾';
      break;
    case '810000':
      info.cardType = 2;
      info.cardText = '中国香港';
      break;
    case '820000':
      info.cardType = 2;
      info.cardText = '中国澳门';
      break;
  }
  return info;
}

function getAge(birthday) {
  var age;
  if (!(util.isString(birthday) || util.isNumber(birthday))) {
    return age;
  }
  birthday = birthday.toString();
  var year = birthday.slice(0, 4);
  var month = birthday.slice(4, 6);
  var date = birthday.slice(6, 8);
  var curDate = new Date();
  if ((1 + curDate.getMonth() < parseInt(month)) || (1 + curDate.getMonth() === parseInt(month) && curDate.getDate() < parseInt(date))) {
    age = curDate.getFullYear() - parseInt(year) - 1;
  } else {
    age = curDate.getFullYear() - parseInt(year);
  }
  return age;
}
module.exports = {
  idcardinfo: idcardinfo,
  getAge: getAge
};
