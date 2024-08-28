import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import SignIn from './SignIn';
import Dashboard from './dashboard';
function App() {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
    </main>
  );
}

export default App;
