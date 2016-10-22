##Synopsis
A middleware, reducer and actions for manipulating modal windows.  
This library provides only these things. If you want to see modal window, you could use [react-modal](https://github.com/reactjs/react-modal).

##Code Example
*Adding modal's reducer:*  
```
import { combineReducers } from 'redux';
import { modalsReducer } from 'redux-promising-modals';
export default combineReducers({
  /* your's reducers */
  modals: modalsReducer
});
```
*Creating a store:*  
```
import { createStore, applyMiddleware } from 'redux';
import { modalsMiddleware } from 'redux-promising-modals';
import yourReducer from 'yourReducerDirectory';
const store = createStore(yourReducer, applyMiddleware(modalsMiddleware));
```
*Using modals:*  
```
import { pushModalWindow } from 'redux-promising-modals';
/* ToDo: bind pushModalWindow to dispatch */

...
pushModalWindow('EDIT_FILE_DIALOG', {fileName: 'my_file.txt'})
  .then(result => /* do something with the result */);
...

/* when need to close a window with 'EDIT_FILE_DIALOG' type */
import { popModalWindow } from 'redux-promising-modals';
/* ToDo: bind popModalWindow to dispatch */
...
popModalWindow({newFileName: 'your_file.txt'});
...
```

##Motivation
*For example:*  
You need to show a modal window to a user. The user manipulates with the content of the window and then closes it. You want to see the result of these manipulation.

##Installation
`npm i --save redux-promising-modals`  

##API Reference
`PUSH_MODAL_WINDOW`, `INSERT_MODAL_WINDOW`, `POP_MODAL_WINDOW`, `CLEAR_MODAL_WINDOWS` - the types of actions.

`modalsMiddleware` - the middleware for working with modals.  
If the type of action passing through it is PUSH_MODAL_WINDOW or INSERT_MODAL_WINDOW you can expect that a Promise will be returned.  
If the type is SHIFT_MODAL_WINDOW or POP_MODAL_WINDOW the Promise will be resolved and the result will be granted.
CLEAR_MODAL_WINDOWS resolves all Promises.

`pushModalWindow(modalType, modalProps)` - adds a modal of type modalType (expects a String type but this is not necessary)  with modalProps (could be anything) in the end of modals array.  
`insertModalWindow(modalType, modalProps)` - adds a modal in the beginning of modals array.  
`popModalWindow(values)` - removes the last window from modals array.  
`shiftModalWindow(values)` - remove the first (current) window from modals array.  
`clearModalWindows()` - clears modals array.  

`modalsReducer` - a reducer for modals (keep modals types and props in an array).  

##License
MIT
