import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loginReducer } from "./Reducers/LoginReducers";
import { userReducer } from "./Reducers/userReducers";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  userReducer: userReducer,

 

});

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
let persistor = persistStore(store);

export { store, persistor };
