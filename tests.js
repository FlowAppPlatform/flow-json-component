/* 
 * Tests
 *  */

var ToJson = require('./to-json');
var FromJson = require('./from-json');

describe(`Component Tests
`, function() {

  var component = new ToJson();

  it('Component should have all required properties', function(done) {
    try {
      component.getProperty('Text');
      done();
    } catch(e) { done(new Error('Component missing required properties')); }
  });

  it('Component should have all required ports with Data property', function(done) {
    try {
      component.getPort('Success').getProperty('Data');
      component.getPort('Error').getProperty('Data');
      done();
    } catch(e) { done(new Error('Component missing required ports')); }
  });

  component = new FromJson();

  it('Component should have all required properties', function(done) {
    try {
      component.getProperty('Text');
      done();
    } catch(e) { done(new Error('Component missing required properties')); }
  });

  it('Component should have all required ports with Data property', function(done) {
    try {
      component.getPort('Success').getProperty('Data');
      component.getPort('Error').getProperty('Data');
      done();
    } catch(e) { done(new Error('Component missing required ports')); }
  });

});

describe(`JSON Tests
`, function() {

  it(`Should successfully return json`, function(done) {
    var component = new ToJson();
    component.getProperty('Text').data = { a: 1 };
    component.getPort('Success').onEmit(done);
    component.getPort('Error').onEmit(function() {
      done(new Error('Component does not successfully return json'));
    });
    component.execute();
  });

  it(`Should successfully parse json`, function(done) {
    var component = new FromJson();
    component.getProperty('Text').data = '{ "a": "1" }';
    component.getPort('Success').onEmit(done);
    component.getPort('Error').onEmit(function() {
      done(new Error('Component does not successfully parse json'));
    });
    component.execute();
  });

  it(`Should not successfully parse invalid json`, function(done) {
    var component = new FromJson();
    component.getProperty('Text').data = '{ a": "1" }';
    component.getPort('Success').onEmit(function() {
      done(new Error('Component successfully parses invalid json'));
    });
    component.getPort('Error').onEmit(done);
    component.execute();
  });

});