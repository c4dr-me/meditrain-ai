import { useEffect, useState } from 'react';
import Header from './components/Header';
import Chat from './components/chat';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (

    <BrowserRouter>
    
    <div className="flex flex-col min-h-screen items-center justify-center overflow-y-auto noisy">
    
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          
        <Route path="/chat" element={<Chat mousePosition={mousePosition} />} />
        </Routes>
        
      </div>
      
      </BrowserRouter>
  );
}

export default App;