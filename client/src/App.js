import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/** Components */
import Login from './components/login';
import Users from './components/user/user.container';

function App() {
  return (
    <div className="App w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="users/*" element={<Users/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
