import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import NavBar from "./components/Nav/NavBar";
import HomePage from "./components/HomePage/HomePage";
import ShowsList from "./components/ShowsList";
import AddShow from "./components/AddShow";
import UpDateShow from "./components/UpdateShow";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shows" component={ShowsList} />
        <Route exact path="/add" component={AddShow} />
        <Route path="/shows/:id" component={UpDateShow} />
      </Switch>
      <Footer />
      <ScrollUpButton
        style={{
          backgroundColor: "none",
          width: "35px",
          height: "35px",
          transform: "translateY(-1.75rem) translateX(1.3rem)",
          borderRadius: "5px",
          boxShadow: "#FF0000 3px 3px 5px",
        }}
      />
    </Router>
  )
};

export default App;
