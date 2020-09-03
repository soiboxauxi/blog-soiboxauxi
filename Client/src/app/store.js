import rootReducer from 'app/reducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: rootReducer,
})

export default store;