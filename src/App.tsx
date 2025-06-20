import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ComicGenerator from './components/ComicGenerator';
import ComicViewer from './components/ComicViewer';
import HistoryDashboard from './components/HistoryDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<ComicGenerator />} />
          <Route path="/comic/:id" element={<ComicViewer />} />
          <Route path="/history" element={<HistoryDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;