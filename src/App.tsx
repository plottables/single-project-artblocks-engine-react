import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from 'components/pages/ProjectPage';
import TokenPage from 'components/pages/TokenPage';
import AppProviders from 'components/AppProviders';
import 'react-toastify/dist/ReactToastify.css';
import UserPage from "./components/pages/UserPage";

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route index element={<ProjectPage />} />
          <Route path="token/:id" element={<TokenPage />} />
          <Route path="user/:address" element={<UserPage />} />
        </Routes>
      </Router>
    </AppProviders>
  );
}

export default App;
