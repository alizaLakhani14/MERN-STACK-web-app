import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
import EditExercise from "./components/EditExercise";
import ExerciseList from "./components/ExerciseList.js";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <br></br>
        <Switch>
          <Route path="/" exact component={ExerciseList}></Route> 
          <Route path="/edit/:id" component={EditExercise}></Route>
          <Route path="/create" component={CreateExercise}></Route>
          <Route path="/user" component={CreateUser}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
