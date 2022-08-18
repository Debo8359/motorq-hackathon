import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Events from "./Events";
import Event from "./Event";
import Home from "./Home";
import Register from "./Register";
import Newevent from "./Newevent";
import Modify from "./Modify";
import Verify from "./Verify";
import Adminreg from "./Adminreg";
import Adminlogin from "./Adminlogin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/adminreg"
            element={
              <>
                <Adminreg />
              </>
            }
          />
          <Route
            path="/adminlogin"
            element={
              <>
                <Adminlogin />
              </>
            }
          />
          <Route
            path="/events/:eid"
            element={
              <>
                <Events />
              </>
            }
          />
          <Route
            path="/events"
            element={
              <>
                <Event />
              </>
            }
          />
          <Route
            path="/newevent"
            element={
              <>
                <Newevent />
              </>
            }
          />
          <Route
            path="/modify"
            element={
              <>
                <Modify />
              </>
            }
          />
          <Route
            path="/event/:id"
            element={
              <>
                <Verify />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
