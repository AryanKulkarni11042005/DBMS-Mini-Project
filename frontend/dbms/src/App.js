import './App.css';

import {createBrowserRouter ,RouterProvider} from "react-router-dom";

import AdminLogin from './components/AdminLogin';
import ClerkLogin from './components/ClerkLogin';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import ClerkDashboard from './components/ClerkDashboard';
import Lecture from './components/Lecture';
import Student from './components/Student';
import Teacher from './components/Teacher';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path:"/admin-login",  
      element: <AdminLogin />,
    },
    {
      path: "/clerk-login",
      element: <ClerkLogin />,
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/clerk-dashboard",
      element: <ClerkDashboard />,
    },
    {
      path: "/schedule",
      element: <Lecture />
    },
    {
      path: "/student",
      element: <Student />
    },
    {
      path: "/teacher",
      element: <Teacher />
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
