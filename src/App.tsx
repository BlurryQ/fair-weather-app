import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// context
import { UserProvider } from './context/UserContext';

// components
import Header from './components/Header';

// props
import { WeatherDataProp } from './types/WeatherDataProp';

// types

import Loader from './components/Loader';

import Settings from './components/settings/Settings';
import WeatherPage from './components/WeatherPage';
import AuthPage from './components/AuthPage';

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherDataProp | null>(null);

  return (
    <>
      <UserProvider>
        <Header setWeatherData={setWeatherData} setLoading={setLoading} />

        <main>
          {loading ? (
            <Loader />
          ) : (
            <Routes>
              <Route
                path="/"
                element={<WeatherPage weatherData={weatherData} />}
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/signup" element={<AuthPage />} />
              <Route path="/login" element={<AuthPage />} />
            </Routes>
          )}
        </main>
      </UserProvider>
    </>
  );
}

export default App;
