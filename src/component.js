var Flow = require('flow-platform-sdk');

module.exports = class Component extends Flow.Component {
  constructor() {
    
    super();
    this.name = 'JSON Component';

    var variable = new Flow.Property('Variable', 'object');
    variable.required = true;
    this.addProperty(variable);

    var success = new Flow.Port('Success');
    var error = new Flow.Port('Error');

    success.addProperty(new Flow.Property('Data', 'object'));
    error.addProperty(new Flow.Property('Data', 'object'));

    this.addPort(success);
    this.addPort(error);

  }
};