import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

/** Routes */
import PrivateRoute from './components/routes/private';
import PublicRoute from './components/routes/public';

/** Layouts */
import Layout from './components/layouts/layout';

/** Components */
import Login from './components/login';

function App() {
  return (
    <div className="App w-full">
      <Router>
        <Routes>
          <Route exact path="/" element={<PublicRoute element={<Login/>} />} />
          <Route path="/*" element={ <PrivateRoute element={<Layout/>} /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
