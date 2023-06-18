import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TaskList from './pages/TaskList';
/*import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
*/

export function Menu() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/listas">Listas</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          {/* Contenido de la página Home */}
        </Route>
        <Route path="/events">
          {/* Contenido de la página Events */}
        </Route>
        <Route path="/listas">
          <TaskList />
        </Route>
      </Switch>
    </Router>
  );
}
