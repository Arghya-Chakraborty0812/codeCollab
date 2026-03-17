import React, { useState } from 'react'
import laptop from "../assets/Pi7_laptop.png";

const LANGUAGES = ['C++', 'Python', 'JavaScript', 'Java', 'C', 'Go', 'Rust']

export default function CodeEditor() {
  const [language, setLanguage] = useState('C++')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [showLangMenu, setShowLangMenu] = useState(false)

  const roomId = 'ROOM-4821'
  const user = { name: 'Arghya Chakraborty', initial: 'A' }

  const handleRun = () => {
    setOutput(`> Running ${language} code...\n\nHello, World!`)
  }

  const handleClear = () => {
    setCode('')
    setOutput('')
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 font-mono">
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
          <div className="flex items-center gap-2">
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
        <div className="flex" style={{ height: '600px' }}>

          {/* Sidebar */}
          <div className="w-64 bg-[#1a2235] border-r border-[#243048] flex flex-col p-4">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2a3a55]">
                <img src={laptop} alt="logo" className="w-10 text-white h-9" />
              <span className="text-white font-bold tracking-wide text-sm">CODE COLLAB</span>
            </div>

            {/* Users */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-green-600 flex items-center justify-center text-white text-sm font-bold">
                  {user.initial}
                </div>
                <span className="text-white text-sm">{user.name}</span>
              </div>
            </div>

            {/* Leave Room */}
            <div className="border-t border-[#2a3a55] pt-4">
              <button className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded transition">
                LEAVE ROOM
              </button>
            </div>
          </div>

          {/* Editor + Output */}
          <div className="flex flex-1">
            {/* Code Editor */}
            <div className="flex-1 border-r border-[#243048]">
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder={`// Write your ${language} code here...`}
                className="w-full h-full bg-[#1a2235] text-green-300 text-sm p-4 resize-none outline-none placeholder-gray-600 leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Output Panel */}
            <div className="w-96 flex flex-col">
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