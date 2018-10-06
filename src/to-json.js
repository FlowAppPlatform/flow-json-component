var Flow = require('flow-platform-sdk');

module.exports = class Component extends Flow.Component {
  constructor() {
    
    super();
    this.name = 'To JSON';

    var variable = new Flow.Property('Variable', 'object');
    variable.required = true;
    this.addProperty(variable);

    var success = new Flow.Port('Success');
    var error = new Flow.Port('Error');

    success.addProperty(new Flow.Property('Data', 'object'));
    error.addProperty(new Flow.Property('Data', 'object'));

    this.addPort(success);
    this.addPort(error);

    this.attachTask(function() {
      try {
        const json = JSON.stringify(this.getProperty('Variable').data);
        const port = this.getPort('Success');
        port.getProperty('Data').data = json;
        port.emit();
        this.taskComplete();
      } catch(err) {
        const port = this.getPort('Error');
        port.getProperty('Data').data = err;
        port.emit();
        this.taskComplete();
      }
    });

  }
};