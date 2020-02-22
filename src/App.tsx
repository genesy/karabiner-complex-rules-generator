import React from 'react';
import './App.css';
import '@material-ui/core';
import 'typeface-roboto';
import AppLayout from './AppLayout';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <AppLayout>
        <Form />
      </AppLayout>
    </div>
  );
}

export default App;
