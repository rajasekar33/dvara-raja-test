import HomePage from './components/HomePage/HomePage';
import './App.css'

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Header from './components/header/header';
import ResultPage from './components/resultPage/ResultPage';


function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
