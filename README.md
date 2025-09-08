# Fair Weather App

![Fair Weather App Demo](demo.gif)

## Summary  

Hosted: [Fair Weather App](https://fair-weather-app.netlify.app/)

The **Fair Weather App** is my weather companion project that goes beyond forecasts. It helps quickly decide if conditions are right for activities like **dog walking, motorcycle riding, or lawn mowing**, while giving a **visual and customizable experience**.  

I originally built this for personal use, but it’s grown into a **user-based platform** with:  
- **Customizable metrics** (choose units in °C/°F, miles/km, time ranges, and thresholds).  
- **User-uploaded images** triggered by weather conditions (rain, visibility, UV, etc).  
- **Authentication with Supabase**, including signup, login, and password recovery.  
- **Default Dobermann-themed AI images** if you don’t upload your own.  
- **Responsive design**, with different layouts for desktop and mobile.  

It combines **WeatherAPI** for forecasts, **Supabase** for auth and storage, and a **React + Vite frontend** for speed and responsiveness.  

---

## Requirements

- A free account on [weatherAPI.com](https://www.weatherapi.com/) for the API key.  
- A [Supabase](https://supabase.com/) project for auth and storage.  

---

## Tech Stack & Dependencies

- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)  
- **Backend/Services:** [Supabase](https://supabase.com/) for auth, storage, and database  
- **API:** [WeatherAPI](https://www.weatherapi.com/)  
- **HTTP Client:** [axios](https://axios-http.com/)  
- **Date Handling:** [date-fns](https://date-fns.org/)  
- **UI Helpers:** [react-spinners](https://www.reactspinners.com/) for loaders  
- **Build & Quality:** ESLint, TypeScript, Vite  
- **Deployment:** Netlify with [@netlify/functions](https://docs.netlify.com/functions/overview/)  

---

## Setup & Installation

1. **Fork the Repository**  
   Click **Fork** in the top-right of this repo.  
   (See GitHub’s [guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) if you’re new.)  

2. **Clone the Repository**  
    ```
    git clone git@github.com:your-username/fair-weather-app.git
    cd fair-weather-app
    ```

3. **Install Dependencies**
    ```
    npm install
    ```

4. **Environment Variables**
Create a .env file in the project root:

    ```
    WEATHER_API=YOUR_WEATHER_API_KEY

    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_PUBLIC_ANON=YOUR_SUPABASE_PUBLIC_ANON_KEY
    ```

5. **Run Locally**
    ```
    npm run dev
    ```

## Features

- 🔑 **Authentication** – Signup, login, logout, and password reset

- ⚙️ **User Preferences** – Customize metrics, thresholds, and display hours

- 🎨 **Custom Uploads** – Add your own images for specific triggers (rain, UV, etc)

- 📱 **Responsive Design** – Different experiences for desktop and mobile

- ⏱️ **Performance** – Debounced searches and optimized API calls

## Challenges & Learnings

- **TypeScript Adoption**
My first project using TypeScript – I had to learn type annotations, interfaces, and strict type checking while still moving quickly.

- **From Static Prototype → User Platform**
It started as a hardcoded personal project, but expanding it to support auth, user preferences, and database storage meant redesigning state management and building a proper schema in Supabase.

- **Authentication & Database Integration**
Implementing secure signup/login with auto-provisioned rows for new users was a milestone. Adding “forgotten password” recovery gave me hands-on experience with Supabase Auth.

- **Custom File Uploads**
Letting users upload their own images for conditions like rain, fog, or high UV required learning how to handle file uploads in Supabase and dynamically render them in React.

- **Responsive Design & UX**
Providing different layouts for desktop and mobile was more than just CSS tweaks. Once I added user uploads and preferences, it became a real design challenge to keep both versions clean and usable.

- **Performance & API Usage**
To avoid hammering WeatherAPI, I implemented debounced search inputs and optimized fetches to balance responsiveness with efficiency.

- **Deployment Pipeline**
Making everything work with Vite, Netlify, serverless functions, and Supabase taught me a lot about environment variables, auth in production, and smooth deployment workflows.

## Future Improvements

- Toggle settings on or off

- Create your own AI images for custom triggers

- User profile with account settings

- Allow users to choose the amount of forecasted days (default 3)

- Multiple saved profiles/ themes (e.g., Dog Walking vs Motorcycle Riding)

- Notifications/reminders based on weather conditions