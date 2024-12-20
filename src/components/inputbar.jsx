import { useState, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

const LuSendHorizontal = lazy(() => import("react-icons/lu").then(module => ({ default: module.LuSendHorizontal })));
const FaMicrophone = lazy(() => import("react-icons/fa").then(module => ({ default: module.FaMicrophone })));
const FaMicrophoneSlash = lazy(() => import("react-icons/fa").then(module => ({ default: module.FaMicrophoneSlash })));

const InputBar = ({ onSendMessage }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      onSendMessage(query);
      setQuery('');
    }
  };

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const voiceQuery = event.results[0][0].transcript.toLowerCase();
      if (voiceQuery.includes("send")) {
        const cleanedQuery = voiceQuery.replace("send", "").trim();
        setQuery(cleanedQuery);
        onSendMessage(cleanedQuery);
      } else {
        setQuery(voiceQuery);
      }
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl relative flex items-center" role="search">
      <label htmlFor="query-input" className="sr-only">Ask a question</label>
      <input
        type="text"
        id="query-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question..."
        className="w-full bg-green-900/90 text-white rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-gray-500"
        aria-label="Ask a question"
      />
      <Suspense fallback={<div className="animate-pulse text-gray-400" style={{ width: 24, height: 24 }}></div>}>
        <button
          type="button"
          onClick={handleVoiceInput}
          className="absolute right-12 p-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          aria-label="Use voice input"
          title="Use voice input"
        >
          {isListening ? <FaMicrophoneSlash className="text-red-500" /> : <FaMicrophone />}
        </button>
        <button
          type="submit"
          className="absolute right-4 p-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          aria-label="Send"
          title="Send"
        >
          <LuSendHorizontal />
        </button>
      </Suspense>
    </form>
  );
};

InputBar.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default InputBar;