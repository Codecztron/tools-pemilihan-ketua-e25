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
                
                <div className="mb-6">
                    <span className="text-5xl sm:text-6xl font-bold text-[#2c3e50] tracking-wider uppercase">
                        Musyawarah Besar
                    </span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-wide text-[#5e87a8]">
                    Tools Pemilihan Ketua
                </h1>

                <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                    Website ini digunakan untuk membantu proses pemilihan ketua dengan menyediakan fitur counter dan timer secara
                    <span className="text-[#e67e22] font-bold"> real-time.</span>
                </p>

                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        {/* Tombol Utama: Biru Laut (#5e87a8) */}
                        {pathButton.map((path) => (
                            <Link 
                                key={path.to}
                                to={path.to} 
                                className="w-full sm:w-auto bg-[#5e87a8] text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#4a6b8a] transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-blue-900/10"
                            >
                                <BarChart2 size={20} />
                                <span>{path.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Tombol Timer: Outline Style */}
                    <Link 
                        to="/timer" 
                        className="w-full sm:w-auto bg-white border-2 border-[#5e87a8] text-[#5e87a8] px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
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