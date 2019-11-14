/* 
 * Tests
 *  */

var ToJson = require('./src/to-json');
var FromJson = require('./src/from-json');

const Graph = require('flow-platform-sdk').Graph;
const graph = new Graph("graph-1");

describe(`Component Tests
`, function() {

  var component = new ToJson();

  it('ToJson component should have all required ports with Data property', function(done) {
    try {
      component.getPort('Success').getProperty('Data');
      component.getPort('Error').getProperty('Data');
      done();
    } catch(e) { done(new Error('Component missing required ports')); }
  });

  component = new FromJson();

  it('FromJson component should have all required ports with Data property', function(done) {
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
    graph.addComponent(component);
    component.execute();
  });

  it(`Should successfully parse json`, function(done) {
    var component = new FromJson();
    component.getProperty('Text').data = '{ "a": "1" }';
    component.getPort('Success').onEmit(done);
    component.getPort('Error').onEmit(function() {
      done(new Error('Component does not successfully parse json'));
    });
    graph.addComponent(component);
    component.execute();
  });

  it(`Should not successfully parse invalid json`, function(done) {
    var component = new FromJson();
    component.getProperty('Text').data = '{ a": "1" }';
    component.getPort('Success').onEmit(function() {
      done(new Error('Component successfully parses invalid json'));
    });
    component.getPort('Error').onEmit(done);
    graph.addComponent(component);
    component.execute();
  });

});