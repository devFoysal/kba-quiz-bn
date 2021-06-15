import { Route } from "react-router-dom";
import ProtectedRegLogRoute from "./components/ProtectedRegLogRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import QuizOne from "./pages/QuizOne";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Forgot password
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <ProtectedRoute path="/quiz" exact component={QuizOne} />
      <Route path="/leaderboard" exact component={Leaderboard} />
      <Route path="/verify-email" exact component={VerifyEmail} />
      <Route path="/leaderboard" exact component={Leaderboard} />
      <ProtectedRegLogRoute path="/login" exact component={Login} />
      <ProtectedRegLogRoute path="/register" exact component={Register} />
    </>
  );
}

export default App;
