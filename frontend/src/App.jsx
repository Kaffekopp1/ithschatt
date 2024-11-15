// import { useEffect } from 'react';
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import WelcomePage from './pages/WelcomePage';
import Login from './components/Login';
import TestSida from './pages/TestSida.jsx';
import ProtectedRoutes from './components/ProtectedRoutes';
import AuthProvider from './AuthProvider';
import Header from './components/Header';
import { ThemeProvider } from './components/ThemeProvider.jsx';
// const Home = lazy(() => import('./Home.jsx'))
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const SignupForm = lazy(() => import('./components/SignupForm.jsx'));
const ImageGallery = lazy(() => import('./pages/ImageGallery.jsx'));

// import ImageGallery from './pages/ImageGallery.jsx';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/TestSida" element={<TestSida />} />
            <Route
              path="/SignupForm"
              element={
                <Suspense fallback={<>Laddar...</>}>
                  <SignupForm />
                </Suspense>
              }
            />
            <Route element={<ProtectedRoutes />}>
              <Route
                path="/homepage"
                element={
                  <Suspense fallback={<>Laddar...</>}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path="/bildgalleri"
                element={
                  <Suspense fallback={<>Laddar...</>}>
                    <ImageGallery />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
