import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Article } from "./core/component/article.jsx";
import "./App.css";
import { Home } from "./core/component/home.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/article">
          <Article />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
