# Deprecation note
The approach suggested in this repository is outdated. Thus, the repository is not going to be supported.  
Please, choose a different solution.

## Synopsis
A middleware, reducer and actions for manipulating modal windows.  
The library provides only these things. If you want to see modal window, you could use [react-modal](https://github.com/reactjs/react-modal).  
See [working example](https://akolodeev.github.io/redux-promising-modals) at gh-pages.

## Code Example
### Adding modals' reducer:
```javascript
import { combineReducers } from 'redux';
import { modalsReducer } from 'redux-promising-modals';

export default combineReducers({
    /* your's reducers */
    modals: modalsReducer
});

```

### Creating a store:
```javascript
import { createStore, applyMiddleware } from 'redux';
import { modalsMiddleware } from 'redux-promising-modals';
import yourReducer from 'yourReducerDirectory';

const store = createStore(yourReducer, applyMiddleware(modalsMiddleware));

```

### Show single modal:  
```javascript
import { pushModalWindow } from 'redux-promising-modals';
// ToDo: bind pushModalWindow to dispatch

pushModalWindow('EDIT_FILE_DIALOG', {fileName: 'my_file.txt'})
  .then(result => { /* do something with the result */ });
```

### Show series of modals
```javascript
import { pushModalWindow } from 'redux-promising-modals';
// ToDo: bind pushModalWindow to dispatch

const promisesArray = pushModalWindow(
    ['EDIT_FILE_DIALOG', 'REMOVE_FILE_DIALOG'],
    [{fileName: 'my_file.txt'}, {fileName: 'old_file.txt', _createdOn: 1480021259507}]
);

Promise.all(promisesArray).then(() => { /* all promises are resolved (each window was closed) */ });
```

### Close current modal and return result
```javascript
import { popModalWindow } from 'redux-promising-modals';
/* ToDo: bind popModalWindow to dispatch */

popModalWindow({newFileName: 'your_file.txt'});
```

## Motivation
*For example:*  
You need to show a modal window to a user. The user manipulates with the content of the window and then closes it. You want to see the result of these manipulation.

## Installation
`npm i --save redux-promising-modals`  

## API Reference
### Actions' types
```javascript
PUSH_MODAL_WINDOW,
INSERT_MODAL_WINDOW,
POP_MODAL_WINDOW,
CLEAR_MODAL_WINDOWS
```
You can import theses types from library and handle them separately.

### Middleware
```javascript
modalsMiddleware
```
If the type of action passing through it is `PUSH_MODAL_WINDOW` or `INSERT_MODAL_WINDOW` you can expect that a Promise will be returned.  
If the type is `SHIFT_MODAL_WINDOW` or `POP_MODAL_WINDOW` the Promise will be resolved and the result will be granted.  
`CLEAR_MODAL_WINDOWS` resolves all Promises.

### Actions
`pushModalWindow(modalTypes, modalProps)` - adds modal of type modalType (expects a String type but this is not necessary)  with modalProps (could be anything) in the end of modals array. `modalTypes` and `modalProps` can be either an array or a single element (see Code Example).  
`insertModalWindow(modalTypes, modalProps)` - adds a modal in the beginning of modals array.  
`popModalWindow(values)` - removes the last window from modals array.  
`shiftModalWindow(values)` - remove the first (current) window from modals array.  
`clearModalWindows()` - clears modals array.  
`nextModalWindow()` - replaces current window by the next.  
`prevModalWindow()` - replaces current window by the previous one.

### Reducer
`modalsReducer` - a reducer for modals (keep modals types and props in an array).  

## License
MIT
