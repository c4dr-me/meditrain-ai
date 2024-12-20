import { Link } from "react-router-dom";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiTailwindcss, SiFlask, SiLangchain } from "react-icons/si";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const img = new Image();
    img.src = "/image.png";
  }, []);

  return (
    <main className="min-w-screen overflow-hidden min-h-screen flex flex-col items-center justify-center noisy">
      <div className="container mx-auto px-4 pt-20 pb-32 text-center">
        <div className="mb-16 mt-16">
          <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-gray-50/80 font-sans animate-pulse">
            Medi
            <span className="text-green-300/40">Train AI</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Revolutionizing healthcare with advanced AI-powered training
            solutions
          </p>
          <Link to="/chat">
            <button
              className="
              mx-auto
              ring-1
              flex items-center gap-3 rounded-full bg-gradient-to-r from-transparent via-green-800 to-green-900 px-6 py-3 transition-all
              hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]
              mt-8 text-white font-bold shadow-md
              shadow-green-500/50
            "
            >
              Get Started
            </button>
          </Link>
        </div>

        <div className="relative max-w-md sm:max-w-4xl mx-auto px-4 sm:px-2">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-10 animate-pulse "></div>
          <div className="relative bg-gray-900/30 p-2 rounded-2xl ring-1 ring-green-500/20 shadow-2xl ">
            <img
              src="/image.png"
              alt="MediTrain AI Dashboard"
              className="rounded-xl w-full"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center text-gray-50 mb-8">
          Tech Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4  lg:gap-4">
          <FaReact size={50} className="text-blue-400" />
          <FaNodeJs size={50} className="text-green-400" />
          <FaPython size={50} className="text-yellow-400" />
          <SiFlask size={50} className="text-gray-400" />
          <SiTailwindcss size={50} className="text-teal-400" />
          <SiLangchain size={50} className="text-blue-500" />
        </div>
      </div>
    </main>
  );
};

export default Home;