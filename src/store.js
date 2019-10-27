import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers';
// import { createLogger } from 'redux-logger';

export default () => {

  const middlewares = [applyMiddleware(promise(), thunk/*, createLogger()*/)];
  // const middlewares = [applyMiddleware(promise(), thunk, createLogger())];
  const composeMiddlewares =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
  /* eslint-enable */


  const store = createStore(
    reducers, 
    {},  
    composeMiddlewares(...middlewares)
  );

  // For hot reloading the reducers
  // if (process.env.NODE_ENV !== "production") {
  //   if (module.hot) {
  //     module.hot.accept("./reducers", () => {
  //       store.replaceReducer(reducers)
  //     })
  //   }
  // }

  return store
}