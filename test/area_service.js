var should = require('should');
var area_service = require('../lib/area_service');
describe('area_service', function() {
  describe('#getAge()', function() {
    it('should be ok', function() {
      area_service.getAge(19910210).should.be.aboveOrEqual(25);
    });
    it('should be ok', function() {
      should(area_service.getAge()).undefined();
    });
    it('should be ok', function() {
      var curDate = new Date();
      var preTwoYearAge = curDate.getTime() - (366 + 1) * 24 * 60 * 60 * 1000;
      curDate = new Date(preTwoYearAge);
      var year = curDate.getFullYear();
      var month = 1 + curDate.getMonth();
      var date = curDate.getDate();
      var tempBirthday = year + '' + (month < 10 ? '0' + month : month) + '' + date;
      area_service.getAge(tempBirthday).should.be.equal(1);
    });
  })
})
