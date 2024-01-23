import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import CreateDocument from "./Components/CreateDocument";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import ServerInteraction from "./Components/ServerInteraction";
import Signup from "./Components/Signup";
import UserProvider from "./store/UserContext";
import Toolbar from "./Components/Toolbar";
import Alert from "./Components/Alert";
function App() {
  return (
    <UserProvider>
      <Router>
        <Alert />
        <Navbar />
        <div className="hero">
          <Sidebar />
          <Routes>
            {/* <Route exact path="/" element={<Signup type="Login" />} /> */}
            <Route exact path="/login" element={<Signup type="Login" />} />
            <Route exact path="/signup" element={<Signup type="Sign up" />} />
            <Route exact path="/dashboard" Component={Dashboard} />
            <Route exact path="/create-document" Component={CreateDocument} />
            <Route exact path="/editor/:id" Component={Toolbar} />
            <Route exact path="/si" Component={ServerInteraction} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
