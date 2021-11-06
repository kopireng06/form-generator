import './Tailwind.min.css';
import './App.css'
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import DropFiles from './DropFiles';
import SignupForm from './FormGenerator'
import Framer from './Framer';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dropfiles" component={DropFiles}/>
        <Route path="/framer" component={Framer}/>
        <Route path="/tamu" component={SignupForm}/>
        <Route path="/lokasi" component={SignupForm}/>
        <Route path="/dashboard" component={SignupForm}/>
        <Route exact path="/" component={SignupForm}/>
      </Switch> 
    </Router>
  );
}

export default App;
