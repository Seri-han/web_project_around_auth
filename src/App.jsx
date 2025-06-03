import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Main from './components/Main';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Register setLoggedIn={setLoggedIn} />} />
      <Route path="/signin" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="*" element={<Navigate to={loggedIn ? "/" : "/signin"} />} />
    </Routes>
  );
}
