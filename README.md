# Flow Json component
The component converts text to JSON and JSON to text and is designed using Flow SDK.

*To get started, install the package in your NodeJS project*

```
npm i flow-json-component --save
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
```

*Execute the component*
```javascript
// add the component to a graph before executing it
const Graph = require('flow-platform-sdk').Graph;
new Graph("graph-1").addComponent(component);

component.execute();
```

#### Conclusion

And that's the Flow Json component.