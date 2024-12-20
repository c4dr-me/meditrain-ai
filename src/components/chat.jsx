import { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import DNA from "./dna";
import InputBar from "./inputbar";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

const Chat = ({ mousePosition }) => {
  const [messages, setMessages] = useState([]);
  const [hasSentQuery, setHasSentQuery] = useState(false);
  const chatEndRef = useRef(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSendMessage = async (query) => {
    if (!query.trim()) return;
    setHasSentQuery(true);

    const newMessage = { query, response: "", loading: true };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await fetch(`${BACKEND_URL}/response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();

      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? {
                ...msg,
                response: data.response || "No response.",
                loading: false,
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? { ...msg, response: "Error occurred.", loading: false }
            : msg
        )
      );
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const handleTextToSpeech = (text) => {
    try {
      const sanitizedText = DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
      // console.log("Sanitized text for speech:", sanitizedText);
      const utterance = new SpeechSynthesisUtterance(sanitizedText);
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Text-to-speech error:", error);
    }
  };

  return (
    <main
      className={`flex flex-col items-center h-full w-full p-4 overflow-hidden ${
        hasSentQuery ? "max-w-4xl mb-auto" : "max-w-md"
      }`}
    >
      {!hasSentQuery && (
        <div className="flex flex-col items-center">
          <div className="mb-5 flex items-center justify-center h-14 w-14 rounded-full bg-green-800/50 ring-1 hover:scale-110 transition-transform duration-300">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <DNA mousePosition={mousePosition} />
            </div>
          </div>
          <h1
            className="text-xl md:text-4xl text-center font-bold mb-2 text-white w-full whitespace-nowrap"
            aria-label="Welcome to MediTrain AI"
          >
            Welcome to Medi<span className="text-green-400">Train  AI</span>
          </h1>
          <p
            className="text-gray-400 mb-6 text-center max-w-md"
            aria-label="Your intelligent medical assistant with patient persona, trained to assist doctors with smart search."
          >
            Your intelligent medical assistant with patient persona, trained to assist doctors with smart search.
          </p>
        </div>
      )}

      {hasSentQuery && (
        <div className="w-full flex-grow mt-10 overflow-y-auto flex flex-col justify-start z-0 pb-20">
          {messages.map((message, index) => {
            const sanitizedResponse = DOMPurify.sanitize(message.response);
            return (
              <div key={index} className="mb-auto">
                <section
                  className="flex flex-row-reverse items-center mb-2 w-full"
                  aria-label="User query"
                >
                  <CiUser size={20} className="text-blue-400 ml-2" />
                  <article className="text-white px-3 py-2 rounded-lg w-full text-right">
                    {message.query}
                  </article>
                </section>
                <section className="flex items-center w-full" aria-label="AI response">
                  <FaRobot size={20} className="text-green-400 mr-2 mt-auto mb-6" />
                  <div className="border border-solid border-gray-400/20 text-white rounded-2xl p-4 shadow-md mb-4 w-full">
                    <div className="flex items-center border-b-2 border-gray-400/20 font-mono antialiased mb-2">
                      <MdOutlineQuestionAnswer className="mr-2" /> Answer
                    </div>
                    {message.loading ? (
                      <div className="animate-pulse">
                        <div className="h-4 bg-green-900 rounded mb-2 mt-2"></div>
                        <div className="h-4 bg-green-900 rounded mb-2"></div>
                        <div className="h-4 bg-green-900 rounded mb-2"></div>
                        <div className="h-4 bg-green-900 rounded mb-2"></div>
                        <div className="h-4 bg-green-900 rounded mb-2"></div>
                      </div>
                    ) : (
                        <article
                          className="pb-4"
                        dangerouslySetInnerHTML={{ __html: sanitizedResponse }}
                      />
                    )}
                    <button
                      onClick={() => handleTextToSpeech(message.response)}
                      className="ml-2"
                      title="Listen to response"
                      aria-label="Listen to response"
                    >
                      🔊
                    </button>
                  </div>
                </section>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>
      )}

      <div
        className={`w-full mb-2 ${
          hasSentQuery
            ? " mx-auto fixed bottom-0 left-0 right-0 p-4 bg-transparent"
            : "mt-2"
        } ${hasSentQuery ? "max-w-4xl" : "max-w-md"} px-4 py-2 rounded-lg`}
      >
        <InputBar
          onSendMessage={handleSendMessage}
          aria-label="Send message input"
        />
      </div>
    </main>
  );
};

Chat.propTypes = {
  mousePosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Chat;