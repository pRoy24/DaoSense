import logo from './logo.svg';
import './App.css';
import { Landing } from './components/landing/Landing';
import {
  Switch,
  HashRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Landing />
        </Switch>
      </Router>    
    </div>
  );
}

export default App;
