import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

// ─── AI Chat Login ───────────────────────────────────────────────────────────
function ChatBot() {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const callAuthAPI = async (actionData) => {
    const { type, name, email, password } = actionData;
    try {
      const { data } = await axios.post(`/api/user/${type}`, { name, email, password });
      if (data.success) {
        navigate('/');
        setUser(data.user);
        setShowUserLogin(false);
        toast.success(data.message);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              type === 'signup'
                ? `🎉 Signup successful! Welcome ${data.user?.name || name}!`
                : `✅ Login successful! Welcome back ${data.user?.name || ''}!`,
          },
        ]);
      } else {
        toast.error(data.message);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `❌ ${data.message}. Would you like to try again?` },
        ]);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong';
      toast.error(errorMsg);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `❌ ${errorMsg}. Would you like to try again?` },
      ]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const { data } = await axios.post('/api/ai/login', { messages: updatedMessages });
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      if (data.readyToSubmit && data.actionData) {
        await callAuthAPI(data.actionData);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-gray-50 rounded-lg min-h-[260px] max-h-[260px]">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center text-sm mt-10">
            Say <span className="italic">"I want to sign up"</span> or{' '}
            <span className="italic">"I want to login"</span>
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-3 py-2 rounded-xl text-sm max-w-[80%] whitespace-pre-wrap leading-relaxed ${
              msg.role === 'user'
                ? 'self-end bg-primary text-white rounded-br-sm'
                : 'self-start bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="self-start text-gray-400 text-xs flex items-center gap-1">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce [animation-delay:0.15s]">●</span>
            <span className="animate-bounce [animation-delay:0.3s]">●</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type here..."
          disabled={loading}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-primary hover:bg-primary-dull transition-all text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

// ─── Main Login Component ────────────────────────────────────────────────────
const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
  const [mode, setMode] = useState('simple'); // 'simple' | 'ai'
  const [state, setState] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
      if (data.success) {
        navigate('/');
        setUser(data.user);
        setShowUserLogin(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 sm:w-[380px] overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <p className="text-2xl font-semibold text-center mb-5">
            <span className="text-primary">VegCart</span>{' '}
            {mode === 'simple' ? (state === 'login' ? 'Login' : 'Sign Up') : 'AI Assistant'}
          </p>

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-2">
            <button
              onClick={() => setMode('simple')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'simple'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📋 Simple Form
            </button>
            <button
              onClick={() => setMode('ai')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'ai'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🤖 AI Login
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {mode === 'simple' ? (
            <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
              {state === 'signup' && (
                <div>
                  <p className="mb-1">Name</p>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Type here"
                    className="border border-gray-200 rounded-lg w-full p-2 outline-primary"
                    type="text"
                    required
                  />
                </div>
              )}
              <div>
                <p className="mb-1">Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Type here"
                  className="border border-gray-200 rounded-lg w-full p-2 outline-primary"
                  type="email"
                  required
                />
              </div>
              <div>
                <p className="mb-1">Password</p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Type here"
                  className="border border-gray-200 rounded-lg w-full p-2 outline-primary"
                  type="password"
                  required
                />
              </div>
              {state === 'login' ? (
                <p className="text-xs">
                  New here?{' '}
                  <span
                    onClick={() => setState('signup')}
                    className="text-primary cursor-pointer font-medium hover:underline"
                  >
                    Create an account
                  </span>
                </p>
              ) : (
                <p className="text-xs">
                  Already have an account?{' '}
                  <span
                    onClick={() => setState('login')}
                    className="text-primary cursor-pointer font-medium hover:underline"
                  >
                    Login here
                  </span>
                </p>
              )}
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-lg font-semibold cursor-pointer"
              >
                {state === 'signup' ? 'Create Account' : 'Login'}
              </button>
            </form>
          ) : (
            <ChatBot />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;