import { useEffect, useState } from 'react';
import Header from './components/Header';
import Chat from './components/chat';

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white overflow-y-auto">
      <Header />
      <Chat mousePosition={mousePosition} />
    </div>
  );
}

export default App;