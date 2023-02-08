import {createBrowserRouter, RouterProvider} from "react-router-dom";

import RootLayout from "./pages/Root.jsx";
import HomePage from "./pages/Home.jsx";
import ErrorPage from "./pages/Error";

import './App.css'
import AuthPage from "./pages/Auth";

const router = createBrowserRouter([
    {path: '/',
     element: <RootLayout />,
     errorElement: <ErrorPage />,
     children: [
        {index: true, element: <HomePage />},
        {path: 'auth', element: <AuthPage />},
     ]}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
