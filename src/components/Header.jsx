import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full flex gap-2 p-4 z-50 bg-black/10 backdrop-blur-sm">
      <h1
        className="font-bold font-mono text-xl antialiased tracking-wide underline decoration-green-600/80 decoration-2 underline-offset-2 cursor-pointer hover:decoration-slate-300"
        onClick={() => navigate('/')}
      >
        Medi<span className="text-green-400">Train</span>
      </h1>
    </header>
  );
};

export default Header;