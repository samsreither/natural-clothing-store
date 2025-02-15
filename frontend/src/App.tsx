import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import { Navbar } from './components/navbar';
import { AuthPage } from './pages/auth';

function App() {

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/"></Route>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/checkout"></Route>
          <Route path="/purchased-items"></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
