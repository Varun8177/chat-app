import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Route, Routes } from 'react-router-dom';
import './style.scss'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)
  const routes = [
    { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> }
  ]
  return (
    <div className="App">
      <Routes>
        {routes.map((item) => {
          return <Route key={item.path} path={item.path} element={item.element} />
        })}
      </Routes>
    </div>
  );
}

export default App;
