# Fair Weather App

![Fair Weather APp](demo.gif)

## Summary

Hosted: [Fair Weather App](https://blurryq.github.io/fair-weather-app/)

A visual representation of the weather to determine if conditions are fair for activities like dog walking, motorcycle riding, or lawn mowing. This is themed with Dobermann AI generated images and contains a different experience in mobile than desktop.

## Requirements

- [weatherAPI.com](https://www.weatherapi.com/) account for the API key.

## Dependencies

- **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A fast and modern build tool optimized for front-end development, offering quick server startup and hot module replacement (HMR).
- **[TypeScript](https://www.typescriptlang.org/)**: A superset of JavaScript that adds static types to the language, improving development with better tooling and error checking.
- **[axios](https://axios-http.com/)**: A promise-based HTTP client for making requests, used for API calls to weatherAPI.
- **[date-fns](https://date-fns.org/)**: A modern JavaScript library for working with dates, offering a comprehensive set of functions for date manipulation.
- **[react-spinners](https://www.reactspinners.com/)**: A library for adding CSS-based loading spinners to React applications.
- **[ESLint](https://eslint.org/)**: A tool for identifying and fixing problems in JavaScript code.

## Setup

To get started with this project, follow the steps below:

### 1. For the Repository

First you need to fork this repo to your GitHub account by clicking fork button near the top right of this page. If you are unfamiliar with this then please follow this GitHub [guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

### 2. Clone the Repository

Next is cloning this to your local device using the follwoing command, changing the "your-username" to your GitHub username:

```
git clone git@github.com:your-username/library.git
```

### 3. Install Dependencies

Now this repo has been cloned you can install all the npm dependencies by running the following command in your terminal/ cli:

```
npm install
```

### 4. Set Up The Enviroment

Create a file called .env in the root of the cloned repo and enter the below, using your weatherAPI.com API key (which can be found in your account under Dashboard > API).

```
VITE_WEATHER_API=API_KEY_HERE

VITE_SUPABASE_URL=SUPABASE_URL_HERE
VITE_SUPABASE_PUBLIC_ANON=SUPABASE_PUBLIC_ANON_HERE
```

### 5. Run Project

Once this has installed you can type the following into terminal to run the project.

```
npm run dev
```

## Limitations

I have coded this for my useage, so there are currently limitations.

- You will only see hours 9am - 10pm, and only if the hours have not passed.
- I have limited to only displaying 4 images which the CSS reflects.
- The images are hardcoded to certain metrics, eg temperatures below 5 degrees, visibility below 2 miles, etc.

These can all be changed within the utils files, found in the utils folder

## Challenges

- **TypeScript**  
  This was my first time using TypeScript, so I had to learn about type annotations, interfaces, and strict type checking while building the project.

- **Responsive Design & Mobile Experience**  
  Creating a different experience for mobile and desktop required careful CSS adjustments and media queries. I also had to ensure that the UI remained user-friendly across various screen sizes.

- **State Management**  
  Managing state between components for handling user input, API responses, and selected locations was challenging. I had to decide what should remain in local state versus being lifted to parent components.

- **Optimizing Performance**  
  To prevent unnecessary API calls, I implemented debouncing for the location search input. This helped maintain a responsive UI while reducing redundant requests.

- **Deploying with Vite & GitHub Pages**  
  Since I used Vite for this project, I had to learn how to configure it properly for deployment on GitHub Pages, ensuring the app worked correctly after being built.
