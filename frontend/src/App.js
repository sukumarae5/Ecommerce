import { Outlet } from 'react-router-dom';
import './App.css';
// import Header from './Pages/Header';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <div className='d-flex flex-direction-column'>
      <Dashboard />
      <Outlet />
    </div>
  );
}

export default App;
