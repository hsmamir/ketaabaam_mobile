import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NavigationBar from './components/NavigationBar';
import ForYouPage from './pages/ForYou/ForYouPage';
import LibraryPage from './pages/Library/LibraryPage';
import SettingsPage from './pages/Settings/SettingsPage';
import ExplorePage from './pages/Explore/ExplorePage';
import BookDetailsPage from './pages/BookDetails/BookDetailsPage';
import AuthorPage from './pages/Author/AuthorPage';
import PublisherPage from './pages/Publisher/PublisherPage';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ErrorBoundary>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<ForYouPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/books/:id" element={<BookDetailsPage />} />
                <Route path="/authors/:id" element={<AuthorPage />} />
                <Route path="/publishers/:id" element={<PublisherPage />} />
              </Routes>
              <NavigationBar />
            </div>
          </Router>
        </ErrorBoundary>
      </AuthProvider>
    </Provider>
  );
}