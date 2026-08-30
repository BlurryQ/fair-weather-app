import type { CapacitorConfig } from '@capacitor/cli';

// This is a thin native shell around the deployed site: the weather data comes
// from Netlify Functions and auth from Appwrite, both of which need the real
// origin, so the WebView loads the live URL rather than the bundled `dist`.
// `webDir` still has to point at a real build for `npx cap sync` to succeed.
const config: CapacitorConfig = {
  appId: 'com.blurryq.fairweather',
  appName: 'Fair Weather App',
  webDir: 'dist',
  server: {
    url: 'https://fair-weather-app.netlify.app',
    cleartext: false,
  },
};

export default config;
