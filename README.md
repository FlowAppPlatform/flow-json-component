# Flow Json component
The component is designed using Flow SDK to convert text to JSON or to convert JSON to text.

*To use the component, install the package in your NodeJS project*

```
npm install flow-json-component --save
```

*Use the component as below*

```javascript
// require the component
const Component = require('flow-json-component');
```

*To change text to json*

```javascript
// create instance of the toJSON component
const component = new Component.toJSON();

// provide text to change to json
component.getProperty('Text').data = { name: "Allan Wise" };
```

*To change json to text*

```javascript
// create instance of the fromJSON component
const component = new Component.fromJSON();

// provide json to change to text
component.getProperty('Text').data = '{"shape":"circle"}';
```

*Listen in for port emit events*
```javascript
component.getPort('Success').onEmit(function(){
  // task succesfully ran
  // the result can be accessed through the 'Data' property of the port
  let result = component.getPort('Success').getProperty('Data').data;
});

component.getPort('Error').onEmit(function(){
  // an error occured
  // the actual error can be accessed through the 'Data' property of the port
  let err = component.getPort('Error').getProperty('Data').data;
});


// mandatory to execute the component
component.execute();
```

#### Conclusion

And that's the Flow Json component.