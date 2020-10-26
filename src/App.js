import './App.css';
import React from 'react'
import SubirImagen from './components/SubirImagen';
import Listar from './components/Listar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <SubirImagen />
        </Route>
        <Route path="/lista">
          <Listar />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
