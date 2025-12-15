import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Clock } from 'lucide-react';

function Home() {
    const pathButton = [
        { to: '/counter-sutet', label: 'Counter Sutet' },
        { to: '/counter-dpm', label: 'Counter DPM' },
    ];
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8">
            <div className="text-center max-w-4xl mx-auto">
                
                <div className="mb-4">
                    {/* Efek teks Emas dengan Shadow Biru (Meniru Banner) */}
                    <span className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500 tracking-wider drop-shadow-sm filter">
                        KOMISI PEMILIHAN KAHIM
                    </span>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-wide text-blue-100">
                    Tools Pemilihan Kahim
                </h1>

                <p className="text-base sm:text-xl text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Website ini digunakan untuk membantu proses pemilihan kahim dengan menyediakan fitur timer secara
                    <span className="text-yellow-400 font-bold"> real-time.</span>
                </p>

                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        {/* Tombol Utama: Kuning Emas (High Contrast) */}
                        {pathButton.map((path) => (
                            <Link 
                                key={path.to}
                                to={path.to} 
                                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:from-yellow-300 hover:to-yellow-400 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-yellow-500/20"
                            >
                                <BarChart2 size={20} />
                                <span>{path.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Tombol Timer: Transparan/Glass */}
                    <Link 
                        to="/timer" 
                        className="w-full sm:w-auto bg-white/5 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white/10 transition-all transform hover:scale-105 flex items-center justify-center gap-3 backdrop-blur-sm"
                    >
                        <Clock size={20} />
                        <span>Timer</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
