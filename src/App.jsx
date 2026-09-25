import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AnalyzeText from './pages/AnalyzeText';
import ResultPage from './pages/ResultPage';
import ContinualAdaptation from './pages/ContinualAdaptation';
import SystemArchitecture from './pages/SystemArchitecture';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login is the entry point */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* App pages — all inside Layout (sidebar) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<AnalyzeText />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/adaptation" element={<ContinualAdaptation />} />
          <Route path="/architecture" element={<SystemArchitecture />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
