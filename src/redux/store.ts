import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import recorderReducer from './reducers/recorderReducer';
import userEventsReducer from './reducers/eventsReducer';

const rootReducer = combineReducers({
    userEvent: userEventsReducer,
    recorder: recorderReducer
});

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;