import { createStore } from 'redux';
import dataReducer from './reducer';

// Create the store with the reducer
const store = createStore(dataReducer);

// Define the AppDispatch type for TypeScript
export type AppDispatch = typeof store.dispatch;

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
