var Flow = require('flow-platform-sdk');

module.exports = class FromJson extends Flow.Component {
  constructor() {
    
    super();
    this.name = 'From JSON';

    var text = new Flow.Property('Text', 'object');
    text.required = true;
    this.addProperty(text);

    var success = new Flow.Port('Success');
    var error = new Flow.Port('Error');

    success.addProperty(new Flow.Property('Data', 'object'));
    error.addProperty(new Flow.Property('Data', 'text'));

    this.addPort(success);
    this.addPort(error);

    this.attachTask(function() {
      let port = this.getPort('Success');
      try {
        port.getProperty('Data').data = JSON.parse(this.getProperty('Text').data);
      } catch(err) {
        port = this.getPort('Error');
        port.getProperty('Data').data = "Cannot convert to Text";
      }
      port.emit();
      this.taskComplete();
    });

  }
};