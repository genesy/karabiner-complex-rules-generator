import React from 'react';
import './App.css';
import '@material-ui/core';
import 'typeface-roboto';
import AppLayout from './AppLayout';
import { formStateReducer } from './ducks/formState';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(formStateReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppLayout />
      </div>
    </Provider>
  );
}

export default App;
