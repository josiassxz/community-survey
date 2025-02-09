import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import SurveyForm from './components/SurveyForm';
import BiDashboard from './components/BiDashboard';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#F0F0F0', minHeight: '100vh' }}>
        <Navigation /> {/* Navegação fora das Routes */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/teste-vocacional" element={<SurveyForm />} />
            <Route path="/bi" element={<BiDashboard />} />
            <Route path="/" element={<Navigate to="/teste-vocacional" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;