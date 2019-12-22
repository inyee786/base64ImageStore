import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListOfContributors from './components/ListOfContributors';
import Header from './common/Header'


function App() {
  return (
    <div className="App">
      <Header />
      <ListOfContributors />
    </div>
  );
}

export default App;
