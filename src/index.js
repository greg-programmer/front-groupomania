import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import './styles/components/_post.scss'
import './styles/components/deleteMessage.scss'
import { Provider } from 'react-redux';
import { applyMiddleware,createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import {composeWithDevTools} from 'redux-devtools-extension';


const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
 <App />,  
 </Provider>, 
);


