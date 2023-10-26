import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
function App() {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: google_key,
  // });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
