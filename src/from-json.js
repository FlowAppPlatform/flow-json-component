var Component = require('./component');

module.exports = class ToJson extends Component {
  constructor() {
    
    super();
    this.name = 'To JSON';

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