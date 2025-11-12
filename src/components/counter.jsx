import React,{ useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, Minus, RotateCcw } from 'lucide-react';

function Counter() {
    const [candidates, setCandidates] = useState([
        { id: 1, name: 'Nabil Fatahillah', votes: 0, color: '#3b82f6' },
        { id: 2, name: 'Bagas S. Wicaksono', votes: 0, color: '#f59e0b' },
        { id: 3, name: 'Rifat Maulana Ismail', votes: 0, color: '#ef4444' }
    ]);

    const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

    const incrementVote = (id) => {
        setCandidates(candidates.map(c => 
        c.id === id ? { ...c, votes: c.votes + 1 } : c
        ));
    };

    const decrementVote = (id) => {
        setCandidates(candidates.map(c => 
        c.id === id && c.votes > 0 ? { ...c, votes: c.votes - 1 } : c
        ));
    };

    const resetVotes = () => {
        setCandidates(candidates.map(c => ({ ...c, votes: 0 })));
    };

    const getPercentage = (votes) => {
        return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
    };

    const pieData = candidates.map(c => ({
        name: c.name,
        value: c.votes
    }));
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
            <div className="bg-slate-800/80 backdrop-blur-sm p-3 border border-slate-600 rounded-lg text-white">
                <p className="font-bold mb-1">{label}</p>
                <p style={{ color: payload[0].color }}>{`Jumlah Suara: ${payload[0].value}`}</p>
            </div>
            );
        }
        return null;
    };

    return ( 
        <div className="min-h-screen bg-linear-to-br from-[#0a0f2c] via-[#1a1a5b] to-[#3a1c5e] p-4 sm:p-6 md:p-8 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                    Pemilihan Ketua Angkatan
                </h1>
                <p className="text-slate-300 text-lg">
                    Total Suara: 
                    <span className="font-semibold text-2xl text-yellow-300 font-mono ml-2">{totalVotes}</span>
                </p>
                </div>

                <div className="mb-10">
                    {totalVotes > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-yellow-300 mb-4 text-center">Grafik Batang</h3>
                            {/* PERUBAHAN: Menambahkan margin bawah dan tinggi pada container untuk memberi ruang label */}
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={candidates} margin={{ top: 20, right: 20, bottom: 50, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                                    {/* 
                                        PERBAIKAN UTAMA: 
                                        - interval={0} untuk menampilkan semua label.
                                        - angle={-25} dan textAnchor="end" untuk memiringkan label.
                                    */}
                                    <XAxis 
                                        dataKey="name" 
                                        tick={{ fill: '#d1d5db', fontSize: 12 }} 
                                        interval={0}
                                        angle={-25}
                                        textAnchor="end"
                                    />
                                    <YAxis tick={{ fill: '#d1d5db' }} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}/>
                                    <Bar dataKey="votes">
                                        {candidates.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-bold text-yellow-300 mb-4 text-center">Diagram Persentase</h3>
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                    <Pie data={pieData} cx="50%" cy="50%" labelLine={false}
                                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                        outerRadius={120} fill="#8884d8" dataKey="value">
                                        {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={candidates[index].color} />))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend formatter={(value) => <span className="text-slate-300">{value}</span>} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    ) : (
                    <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-lg p-12 text-center border border-white/20">
                        <p className="text-slate-400 text-lg">
                        Belum ada suara yang masuk. Klik tombol '+' pada kandidat untuk memulai perhitungan.
                        </p>
                    </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {candidates.map(candidate => (
                        <div key={candidate.id} className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-b-4 transition-all hover:border-yellow-300" style={{ borderColor: candidate.color }}>
                            <h3 className="text-2xl font-bold text-white mb-4 text-center h-16 flex items-center justify-center">
                                {candidate.name}
                            </h3>
                            <div className="text-6xl font-bold text-center mb-4 font-mono" style={{ color: candidate.color }}>
                                {candidate.votes}
                            </div>
                            <div className="text-center mb-6">
                                <span className="text-3xl font-semibold text-slate-200 font-mono">
                                {getPercentage(candidate.votes)}%
                                </span>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <button onClick={() => decrementVote(candidate.id)} className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors disabled:opacity-50" disabled={candidate.votes === 0}>
                                    <Minus size={24} />
                                </button>
                                <button onClick={() => incrementVote(candidate.id)} className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors">
                                    <Plus size={24} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mb-8">
                    <button onClick={resetVotes} className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-all transform hover:scale-105 shadow-lg">
                        <RotateCcw size={20} />
                        Reset Semua Suara
                    </button>
                </div>
            </div>
        </div>
     );
}

export default Counter;