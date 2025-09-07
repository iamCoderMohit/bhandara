import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Signin from "./components/Signin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App