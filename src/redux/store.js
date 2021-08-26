import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './root-reducer'
import rootSaga from './root-saga'
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// // create the saga middleware
// const sagaMiddleware = createSagaMiddleware()
// // mount it on the Store
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
// // then run the saga
// sagaMiddleware.run(rootSaga)

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};


// const mainReducer = (state = {}, action) => action.type === HYDRATE ? action.payload : rootReducer(state, action);
const mainReducer = (state = {}, action) => {
    // console.log("ACTION", action.type)

    switch (action.type) {
        case HYDRATE:
            const res = { ...state, ...action.payload }
            // console.log("HYDRATE, ", action.payload)
            return action.payload;
        default:
            // console.log("SYSTEM_REDUCER, ", rootReducer(state, action))
            return rootReducer(state, action);
    }
}

export const makeStore = (context, initialState) => {
    // 1: Create the middleware
    const sagaMiddleware = createSagaMiddleware();

    // 2: Add an extra parameter for applying middleware:
    // const store = createStore(mainReducer, initialState, applyMiddleware(sagaMiddleware));
    const store = createStore(mainReducer, initialState, bindMiddleware([sagaMiddleware]));

    // 3: Run your sagas on server
    store.sagaTask = sagaMiddleware.run(rootSaga);

    // 4: now return the store:
    return store
}

export const wrapper = createWrapper(makeStore, { debug: false })
