import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NavigationBar from './components/NavigationBar';
import ForYouPage from './pages/ForYou/ForYouPage';
import LibraryPage from './pages/Library/LibraryPage';
import SettingsPage from './pages/Settings/SettingsPage';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<ForYouPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
          <NavigationBar />
        </div>
      </Router>
    </Provider>
  );
}