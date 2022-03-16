import React from 'react';
import './App.css';

import Routes from "./pages/routes.jsx";

import Menu from "./components/Menu";
import Holocron from "./components/Holocron/";

function App() {
  return (
    <div className="corpoSite">
      <main>
        <Routes/>
      </main>

      <Menu/>
    </div>
  );
}

export default App;