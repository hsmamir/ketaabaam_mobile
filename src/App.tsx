import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NavigationBar from './components/NavigationBar';
import Header from './components/Header';
import HomePage from './pages/Home/HomePage';
import LibraryPage from './pages/Library/LibraryPage';
import SettingsPage from './pages/Settings/SettingsPage';
import ExplorePage from './pages/Explore/ExplorePage';
import BookDetailsPage from './pages/BookDetails/BookDetailsPage';
import AuthorPage from './pages/Author/AuthorPage';
import PublisherPage from './pages/Publisher/PublisherPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideHeaderAndNav = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeaderAndNav && <Header />}
      {children}
      {!hideHeaderAndNav && <NavigationBar />}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ErrorBoundary>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/books/:id" element={<BookDetailsPage />} />
                <Route path="/authors/:id" element={<AuthorPage />} />
                <Route path="/publishers/:id" element={<PublisherPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </Layout>
          </Router>
        </ErrorBoundary>
      </AuthProvider>
    </Provider>
  );
}