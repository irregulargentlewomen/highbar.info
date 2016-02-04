var expect = require("chai").expect;
var _      = require("lodash");
var people = require("./../data/people.json");

describe('people data', function() {
  it('has a name for each person', function() {
    _.each(people, function(person) {
      expect(person).to.have.any.keys('name');
    });
  });

  it('has a bio for each person', function() {
    _.each(people, function(person) {
      expect(person).to.have.any.keys('bio');
    });
  });
});
