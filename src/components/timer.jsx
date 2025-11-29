import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

function Timer () {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('stopwatch');
  const [countdownTime, setCountdownTime] = useState(300);
  const [inputMinutes, setInputMinutes] = useState('5');
  const [inputSeconds, setInputSeconds] = useState('0');
  const [isFinished, setIsFinished] = useState(false);
  
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - (pausedTimeRef.current * 1000);
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTimeRef.current) / 1000);
        if (mode === 'countdown') {
          const newTime = countdownTime - elapsed;
          if (newTime <= 0) {
            setTime(0);
            setIsRunning(false);
            setIsFinished(true);
            playSound();
            pausedTimeRef.current = 0;
            clearInterval(intervalRef.current);
          } else {
            setTime(newTime);
            pausedTimeRef.current = countdownTime - newTime;
          }
        } else {
          setTime(elapsed);
          pausedTimeRef.current = elapsed;
        }
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode, countdownTime]);

  const playSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio playback not supported',error);
    }
  };

  const toggleTimer = () => {
    if (!isRunning && isFinished) {
      setIsFinished(false);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    pausedTimeRef.current = 0;
    startTimeRef.current = null;
    if (mode === 'countdown') {
      setTime(countdownTime);
    } else {
      setTime(0);
    }
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setIsFinished(false);
    setMode(newMode);
    pausedTimeRef.current = 0;
    startTimeRef.current = null;
    if (newMode === 'countdown') {
      setTime(countdownTime);
    } else {
      setTime(0);
    }
  };

  const setCountdown = () => {
    const mins = parseInt(inputMinutes) || 0;
    const secs = parseInt(inputSeconds) || 0;
    const totalSeconds = (mins * 60) + secs;
    if (totalSeconds >= 0) {
      setCountdownTime(totalSeconds);
      setTime(totalSeconds);
      pausedTimeRef.current = 0;
      setIsFinished(false);
    }
  };

    const handleMinutesChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
        setInputMinutes(value);
        }
    };

    const handleSecondsChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
        const num = parseInt(value) || 0;
        if (num <= 59) {
            setInputSeconds(value);
        }
        }
    };

    const handleMinutesBlur = () => {
        if (inputMinutes === '') setInputMinutes('0');
    };

    const handleSecondsBlur = () => {
        if (inputSeconds === '') setInputSeconds('0');
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hrs > 0) {
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

  const getProgressPercentage = () => {
      if (mode === 'countdown' && countdownTime > 0) {
      return Math.max(0, Math.min(100, (time / countdownTime) * 100));
      }
      return 0;
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - getProgressPercentage() / 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => switchMode('stopwatch')} disabled={isRunning}
            className={`px-5 py-2.5 rounded-lg font-semibold transition-all border text-sm sm:text-base ${
              mode === 'stopwatch' 
                ? 'bg-[#5e87a8] text-white shadow-lg scale-105 border-transparent' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-300'
            } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => switchMode('countdown')} disabled={isRunning}
            className={`px-5 py-2.5 rounded-lg font-semibold transition-all border text-sm sm:text-base ${
              mode === 'countdown' 
                ? 'bg-[#5e87a8] text-white shadow-lg scale-105 border-transparent' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-300'
            } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Countdown
          </button>
        </div>

        {/* Timer Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-100">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="text-[#e67e22]" size={28} />
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2c3e50]">
                {mode === 'stopwatch' ? 'Stopwatch' : 'Countdown'}
              </h1>
            </div>
          </div>
          
          {/* Display Timer */}
          <div className="relative mb-8 w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center">
            {mode === 'countdown' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="6"/>
                  {/* Progress Circle: Orange */}
                  <circle cx="50" cy="50" r="45" fill="none" className="stroke-[#e67e22]" strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{ transition: isRunning ? 'stroke-dashoffset 0.1s linear' : 'none' }} />
                </svg>
              </div>
            )}
            <div className={`text-5xl sm:text-6xl font-bold text-[#2c3e50] font-mono ${isFinished ? 'animate-pulse text-red-500' : ''}`}>
              {formatTime(time)}
            </div>
          </div>

          {/* Settings for Countdown */}
          {mode === 'countdown' && !isRunning && (
            <div className="mb-8 bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
              <h3 className="text-[#5e87a8] font-semibold mb-4 text-center">Atur Waktu</h3>
              <div className="flex gap-2 items-center justify-center mb-4">
                <input type="text" inputMode="numeric" value={inputMinutes} onChange={handleMinutesChange} onBlur={handleMinutesBlur} className="w-16 px-2 py-2 rounded-lg text-center bg-white text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#5e87a8]" placeholder="0" />
                <span className="text-slate-800 text-2xl">:</span>
                <input type="text" inputMode="numeric" value={inputSeconds} onChange={handleSecondsChange} onBlur={handleSecondsBlur} className="w-16 px-2 py-2 rounded-lg text-center bg-white text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#5e87a8]" placeholder="0" />
              </div>
              <button onClick={setCountdown} className="w-full bg-[#5e87a8] text-white py-2.5 rounded-lg font-semibold hover:bg-[#4a6b8a] transition-colors">
                Set Timer
              </button>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            {/* Start/Pause Button */}
            <button onClick={toggleTimer} disabled={mode === 'countdown' && time === 0 && !isRunning && !isFinished} className="bg-[#2c3e50] text-white px-6 py-3 rounded-xl font-bold text-base sm:text-lg hover:bg-[#1e293b] transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg disabled:opacity-50">
              {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Start</>}
            </button>
            
            {/* Reset Button */}
            <button onClick={resetTimer} className="bg-white text-slate-700 px-6 py-3 rounded-xl font-bold text-base sm:text-lg hover:bg-slate-50 transition-all transform hover:scale-105 flex items-center gap-2 border border-slate-300">
              <RotateCcw size={20} /> Reset
            </button>
          </div>

          {isFinished && (
            <div className="mt-6 text-center">
              <p className="text-red-500 text-lg sm:text-xl font-semibold animate-pulse">
                ⏰ Waktu Habis!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;