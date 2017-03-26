/**
 * Created by Elliott on 2017/3/22.
 */
import { createStore ,applyMiddleware } from 'redux';
import rootReducer from'./reducers/reduce';
import thunk from 'redux-thunk'

const initStore={
            todos: [],
            isAll: false,
            currentUser:null,
            value: 1,
            todoId:null
};

const middleware = [ thunk ];
const store=createStore(rootReducer,initStore,applyMiddleware(...middleware));

export default store;