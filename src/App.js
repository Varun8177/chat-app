import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Route, Routes } from 'react-router-dom';
import './style.scss'
function App() {
  const routes = [
    { path: "/", element: <Home /> },
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
