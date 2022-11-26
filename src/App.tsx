import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from 'components/pages/ProjectPage';
import TokenPage from 'components/pages/TokenPage';
import AppProviders from 'components/AppProviders';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route index element={<ProjectPage />} />
          <Route path="token/:id" element={<TokenPage />} />
        </Routes>
      </Router>
    </AppProviders>
  );
}

export default App;
