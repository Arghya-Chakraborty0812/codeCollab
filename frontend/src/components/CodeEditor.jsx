
import React, { useEffect, useState } from 'react'
import laptop from "../assets/Pi7_laptop.png";
import { useLocation, useNavigate } from 'react-router';
import httpClient from '../config/AxiosHelper';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { Client } from "@stomp/stompjs"; // ✅ instead of Stomp

const LANGUAGES = ['C++', 'Python', 'JavaScript', 'Java', 'C', 'Go', 'Rust']

const LANGUAGE_MAP = {
  "C++": "cpp",
  "Python": "python",
  "JavaScript": "javascript",
  "Java": "java",
  "C": "c",
  "Go": "go",
  "Rust": "rust"
}


export default function CodeEditor() {

  const location  = useLocation();
  const navigate = useNavigate();
  const stompClient = useRef(null);
  const debounceTimer = useRef(null);

  const [language, setLanguage] = useState('C++')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [showLangMenu, setShowLangMenu] = useState(false)
  const {roomId, username} = location.state || {}
  const [input, setInput] = useState('')
  const[version, setVersion] = useState(0);

  const [members, setMembers] = useState([]);

// ✅ PUT IT HERE
const fetchRoom = async () => {
  try {
    const response = await httpClient.get(`/api/v1/rooms/${roomId}`);
    setMembers(response.data.members);
  } catch (error) {
    console.error("Error fetching room:", error);
  }
};

const fetchCode = async () => {
  try {
    const res = await httpClient.get(`/api/v1/code/${roomId}`);
    setCode(res.data.code);
    setInput(res.data.input || ''); // 🔥 ADD THIS
    setVersion(res.data.version || 0); // ✅ important
  } catch (err) {
    console.error(err);
  }
};

// 🔥 WEBSOCKET CONNECTION
useEffect(() => {

  if (!roomId || !username) {
    navigate('/');
    return;
  }

  fetchRoom();
  fetchCode();

  const client = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    reconnectDelay: 5000,
  });

  client.onConnect = () => {
  console.log("Connected");

  // ✅ CODE SYNC (already there)
  client.subscribe(`/topic/code/${roomId}`, (message) => {
    const data = JSON.parse(message.body);
  
    if (data.username !== username) {
      setVersion(prevVersion => {
        if (data.version > prevVersion) {
          setCode(data.code);
          setInput(data.input || ''); // 🔥 ADD THIS
          return data.version;
        }
        return prevVersion; // ❌ ignore old updates
      });
    }
  });

  // 🔥 ADD THIS (OUTPUT SYNC)
  client.subscribe(`/topic/output/${roomId}`, (message) => {
    const data = JSON.parse(message.body);
    setOutput(data.output);
  });
};

  client.activate();
  stompClient.current = client;

  return () => {
    if (stompClient.current) {
      stompClient.current.deactivate();
    }
  };

}, [roomId, username, navigate]);

const sendCode = (newCode, newInput = input) => {

  if (debounceTimer.current) {
    clearTimeout(debounceTimer.current);
  }

  debounceTimer.current = setTimeout(() => {

    setVersion(prevVersion => {
      const newVersion = prevVersion + 1;

      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.publish({
          destination: "/app/code",
          body: JSON.stringify({
            roomId,
            code: newCode,
            input: newInput, // 🔥 send input
            username,
            version: newVersion   // ✅ send version
          })
        });
      }

      return newVersion;
    });

  }, 300);
};

  

const handleRun = async () => {
  try {
    setOutput("> Running...\n");

    const response = await httpClient.post('/api/v1/run', {
      language: LANGUAGE_MAP[language],
      code: code,
      input: input,
      roomId: roomId // 🔥 ADD THIS
    });

    // ❌ REMOVE THIS LINE (important)
    // setOutput(response.data);

  } catch (error) {
    console.error(error);
    setOutput("Error running code");
  }
};

  const handleClear = () => {
    setCode('')
    setOutput('')
  }

  const handleLeaveRoom = () => {
    if(stompClient.current){
      stompClient.current.deactivate();

    }
    setCode('');
    setOutput('');
    navigate('/');
  }

  

  return (
    <div className="h-screen bg-gray-900 flex flex-col md:items-center md:justify-center md:p-6 font-mono">
      <div className="w-full max-w-6xl bg-[#1a2235] rounded-xl overflow-hidden shadow-2xl border border-[#243048]">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1a2235] border-b border-[#243048]">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 bg-[#1e2d45] border border-[#3a4d6a] text-white text-sm px-3 py-1.5 rounded-md hover:bg-[#243555] transition"
            >
              {language}
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showLangMenu && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-[#1e2d45] border border-[#3a4d6a] rounded-md shadow-lg z-10">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setShowLangMenu(false) }}
                    className="w-full text-left px-3 py-1.5 text-sm text-white hover:bg-[#2a3f5f] transition"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Room ID */}
          <div className="text-xs text-gray-400 tracking-widest uppercase">
            Room ID : <span className="text-white font-semibold">{roomId}</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleClear}
              className="px-4 py-1.5 text-sm font-semibold text-white bg-[#1e6fa8] hover:bg-[#1a5f90] rounded-md transition"
            >
              CLEAR
            </button>
            <button
              onClick={handleRun}
              className="px-4 py-1.5 text-sm font-semibold text-white bg-[#2a7a3b] hover:bg-[#236832] rounded-md transition"
            >
              RUN
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row h-full">

          {/* Sidebar */}
          <div className="w-full md:w-64 bg-[#1a2235] border-b md:border-b-0 md:border-r border-[#243048] flex flex-col p-3 md:p-4">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2a3a55]">
                <img src={laptop} alt="logo" className="w-10 text-white h-9" />
              <span className="text-white font-bold tracking-wide text-sm">CODE COLLAB</span>
            </div>

           {/* Users List */}
           <div className="flex-1 space-y-2 max-h-32 md:max-h-full overflow-y-auto">
  {members.map((member, idx) => {
    const isCurrentUser = member === username;

    return (
      <div
        key={idx}
        className={`flex items-center gap-3 px-2 py-1 rounded-md transition
          ${isCurrentUser ? 'bg-[#2a3f5f]' : 'hover:bg-[#22314a]'}`}
      >
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center text-white text-sm font-bold
            ${isCurrentUser ? 'bg-yellow-500' : 'bg-green-600'}`}
        >
          {member[0].toUpperCase()}
        </div>

        <span
          className={`text-sm ${
            isCurrentUser ? 'text-yellow-300 font-semibold' : 'text-white'
          }`}
        >
          {member} {isCurrentUser && '(You)'}
        </span>
      </div>
    );
  })}
</div>

            {/* Leave Room */}
            <div className="border-t border-[#2a3a55] pt-4">
              <button  onClick={handleLeaveRoom} className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded transition">
                LEAVE ROOM
              </button>
            </div>
          </div>

          {/* Editor + Output */}
          <div className="flex flex-col md:flex-row flex-1">
            {/* Code Editor */}
            <div className="h-[50vh] md:h-auto flex-1 border-b md:border-b-0 md:border-r border-[#243048]">
              <Editor
                  height="100%"
                  theme="vs-dark"
                  language={LANGUAGE_MAP[language]} // 🔥 dynamic language
                  value={code}
                  onChange={(value) => {
                    setCode(value);
                    sendCode(value);
                  }}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    automaticLayout: true,
                    formatOnType: true,
                    formatOnPaste: true,
                  }}
                />
            </div>

            <div className="w-full md:w-96 h-[40vh] md:h-auto flex flex-col">

            {/* INPUT BOX 🔥 */}
            <div className="px-4 py-2 text-xs text-gray-400 border-b border-[#243048]">
              Input:
            </div>
            <textarea
              value={input}
              onChange={(e) => {
                const newInput = e.target.value;
                setInput(newInput);
                sendCode(code, newInput); // 🔥 sync input too
              }}
              className="h-24 bg-[#111827] text-white text-sm p-2 outline-none resize-none border-b border-[#243048]"
              placeholder="Enter input here..."
            />

            {/* OUTPUT */}
            <div className="px-4 py-2 text-xs text-gray-400 tracking-widest uppercase border-b border-[#243048]">
              Output :
            </div>
            <div className="flex-1 p-4 text-sm text-gray-300 whitespace-pre-wrap overflow-auto">
              {output || ''}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}