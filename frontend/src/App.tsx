import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signin from "./components/Signin";
import Feed from "./pages/Feed";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Post from "./pages/Post";

function App() {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:id" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
