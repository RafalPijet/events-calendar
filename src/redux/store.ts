import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import recorderReducer from './reducers/recorderReducer';
import userEventsReducer from './reducers/eventsReducer';

const rootReducer = combineReducers({
    userEvent: userEventsReducer,
    recorder: recorderReducer
});

export type RootState = ReturnType<typeof rootReducer>

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeEnhancers && composeEnhancers()
    ));

export default store;