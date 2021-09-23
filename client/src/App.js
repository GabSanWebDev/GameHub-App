import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import VideogameCreate from './components/VideogameCreate';
import Detail from './components/Detail';
import NotFound from './components/404';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route exact path='/videogame' component={VideogameCreate} />
          <Route exact path='/videogame/:id' component={Detail} />
          <Route path='*' component={NotFound} />
        </Switch>

      </div>
  
    </BrowserRouter>
  );
}

export default App;
