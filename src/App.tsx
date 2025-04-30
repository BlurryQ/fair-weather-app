import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// components
import Header from './components/Header';

// props
import { WeatherDataProp } from './types/WeatherDataProp';

// types

import Loader from './components/Loader';

import Settings from './components/Settings';
import WeatherPage from './components/WeatherPage';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherDataProp | null>(null);

  return (
    <>
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
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
