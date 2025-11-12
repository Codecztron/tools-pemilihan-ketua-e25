import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Clock } from 'lucide-react';

function Home() {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#0a0f2c] via-[#1a1a5b] to-[#3a1c5e] flex items-center justify-center p-8 text-white">
            <div className="text-center max-w-4xl mx-auto">
                
                <div className="mb-6">
                    <span className="text-6xl font-bold text-yellow-400 tracking-wider">
                        E25
                    </span>
                </div>

                {/* Judul Utama */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-wide">
                    Tools Pemilihan Ketua E25
                </h1>

                {/* Deskripsi */}
                <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                    Website ini digunakan untuk membantu dalam proses pemilihan ketua E25 dengan menyediakan fitur counter dan timer secara
                    <span className="text-yellow-300 font-semibold"> real-time.</span>
                </p>

                {/* Tombol Aksi (Call to Action) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    {/* Tombol ke Halaman Counter */}
                    <Link 
                        to="/counter" 
                        className="w-full sm:w-auto bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-yellow-500/20"
                    >
                        <BarChart2 size={24} />
                        <span>Counter</span>
                    </Link>

                    {/* Tombol ke Halaman Timer */}
                    <Link 
                        to="/timer" 
                        className="w-full sm:w-auto bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105 flex items-center justify-center gap-3 border border-white/30"
                    >
                        <Clock size={24} />
                        <span>Timer</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;