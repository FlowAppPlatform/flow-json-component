/* 
 * Tests
 *  */

var Component = require('./src/to-json');

describe(`Component Tests
`, function() {

  var component = new Component();

  it('Component should have all required properties', function(done) {
    try {
      component.getProperty('Variable');
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

  var component = new Component();

  it(`Should successfully return json`, function(done) {
    try {
      component.getProperty('Variable').data = { a: 1 };
      component.getPort('Success').onEmit(done);
      component.getPort('Error').onEmit(function() {
        done(component.getPort('Error').getProperty('Data').data);
      });
      component.execute();
    } catch(e) { done(new Error('Component does not successfully return json')); }
  });

});