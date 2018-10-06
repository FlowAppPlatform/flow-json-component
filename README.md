# Flow Json component
The component is designed using Flow SDK to change values to json or reverse the process.

*To use the component, install the package in your NodeJS project*

```
npm install flow-json-component --save
```

*Use the component as below*

```javascript
// require the component
const Component = require('flow-json-component');
```

*Create instance of component*

```javascript
// create instance of the toJson component to change content to json
const component = new Component.toJson();

// or the fromJson component to parse json content
const component = new Component.fromJson();

// provide content to change to json
component.getProperty('Variable').data = {a:1};

// or to change from json
component.getProperty('Variable').data = '{"a":"1"}';
```

*Listen in for port emit events*
```javascript
component.getPort('Success').onEmit(function(){
  // task succesfully ran
  // the content can be accessed through the 'Data' property of the port
  let content = component.getPort('Success').getProperty('Data').data;
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