import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hooks
import { useAuth } from "./hooks/useAuth";

//components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

//pages
import Home from "./pages/Home/Home";
import ActivePolls from "./pages/Polls/ActivePolls/ActivePolls";
import EndedPolls from "./pages/Polls/EndedPolls/EndedPolls";
import FuturePolls from "./pages/Polls/FuturePolls/FuturePolls";
import Register from "./pages/Users/Register/Register";
import Login from "./pages/Users/Login/Login";
import NewPoll from "./pages/Polls/NewPoll/NewPoll";
import MyPolls from "./pages/Polls/MyPolls/MyPolls";
import EditPoll from "./pages/Polls/EditPoll/EditPoll";
import Polls from "./pages/Polls/Polls/Polls";

function App() {
  const { auth } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activepolls" element={<ActivePolls />} />
          <Route path="/futurepolls" element={<FuturePolls />} />
          <Route path="/endedpolls" element={<EndedPolls />} />
          <Route path="/polls/:id" element={<Polls />} />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/newpoll"
            element={auth ? <NewPoll /> : <Navigate to="/login" />}
          />
          <Route
            path="/mypolls"
            element={auth ? <MyPolls /> : <Navigate to="/login" />}
          />
          <Route
            path="/editpoll/:id"
            element={auth ? <EditPoll /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
