import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage.jsx";
import { Documentation } from "./pages/Documentation.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { UserDashboard } from "./pages/UserDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }/>
          <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
