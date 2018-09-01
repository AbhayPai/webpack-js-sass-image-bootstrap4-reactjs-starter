// importing react
import React from 'react';
// importing reactdom
import ReactDom from 'react-dom';

/*
 * https://reactjs.org/docs/react-dom.html
 * calling render method from reactdom
 * ReactDOM.render(element, container[, callback])
 * referenced from https://reactjs.org/docs/hello-world.html
 */
ReactDom.render(
  // using JSX
  <h1>Hello World!</h1>,
  // using javascript
  document.getElementById("hello-world")
);
