import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
//import ReactDOM from "react-dom/";
import React from 'react';
import { Home } from './pages/Home';
import  TaskList  from './pages/TaskList';
import { SobreNosotros } from './pages/SobreNosotros';
import { Menu } from './pages/Menu';

const App = () => {
  return (
    <Router>
      <Menu/>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/TaskList" element={<TaskList />} />
        <Route path="/SobreNosotros" element={<SobreNosotros />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export default App;
