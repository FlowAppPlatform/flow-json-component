var Component = require('./component');

module.exports = class FromJson extends Component {
  constructor() {
    
    super();
    this.name = 'From JSON';

    this.attachTask(function() {
      try {
        const object = JSON.parse(this.getProperty('Variable').data);
        const port = this.getPort('Success');
        port.getProperty('Data').data = object;
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