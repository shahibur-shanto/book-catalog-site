// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Footer from "./layout/Footer";
import Navbar from "./layout/Header";
import Home from "./pages/Home";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

export default App;
