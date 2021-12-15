import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import TimerPage from './pages/TimerPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import StatsPage from './pages/StatsPage';
import TemplatePage from './pages/TemplatePage';
import EditorPage from './pages/EditorPage';


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/timer' element={<TimerPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/templates" element={<TemplatePage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
