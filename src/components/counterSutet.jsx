import React,{ useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, Minus, RotateCcw } from 'lucide-react';

function CounterSutet() {
    const [candidates, setCandidates] = useState([
        { id: 1, name: 'Calon Ketua Sutet 1', votes: 0, color: '#3b82f6' },
        { id: 2, name: 'Calon Ketua Sutet 2', votes: 0, color: '#f59e0b' },
        { id: 3, name: 'Calon Ketua Sutet 3', votes: 0, color: '#ef4444' }
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
            <div className="bg-slate-800/80 backdrop-blur-sm p-3 border border-slate-600 rounded-lg text-white text-sm">
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
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Pemilihan Ketua Sutet
                </h1>
                <p className="text-slate-300 text-base sm:text-lg">
                    Total Suara: 
                    <span className="font-semibold text-xl sm:text-2xl text-yellow-300 font-mono ml-2">{totalVotes}</span>
                </p>
                </div>

                <div className="mb-10">
                    {totalVotes > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/20">
                            <h3 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4 text-center">Grafik Batang</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={candidates} margin={{ top: 5, right: 5, bottom: 60, left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                                    <XAxis 
                                        dataKey="name" 
                                        tick={{ fill: '#d1d5db', fontSize: 11 }} 
                                        interval={0}
                                        angle={-45}
                                        textAnchor="end"
                                    />
                                    <YAxis tick={{ fill: '#d1d5db', fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}/>
                                    <Bar dataKey="votes">
                                        {candidates.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/20">
                            <h3 className="text-lg sm:text-xl font-bold text-yellow-300 mb-4 text-center">Diagram Persentase</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" labelLine={false}
                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100} innerRadius={40} dataKey="value">
                                        {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={candidates[index].color} />))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend formatter={(value) => <span className="text-slate-300 text-sm">{value}</span>} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    ) : (
                    <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 sm:p-12 text-center border border-white/20">
                        <p className="text-slate-400 text-base sm:text-lg">
                        Belum ada suara yang masuk. Klik tombol '+' pada kandidat untuk memulai.
                        </p>
                    </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
                    {candidates.map(candidate => (
                        <div key={candidate.id} className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-b-4 transition-all hover:border-yellow-300" style={{ borderColor: candidate.color }}>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center h-16 flex items-center justify-center">
                                {candidate.name}
                            </h3>
                            <div className="text-5xl sm:text-6xl font-bold text-center mb-4 font-mono" style={{ color: candidate.color }}>
                                {candidate.votes}
                            </div>
                            <div className="text-center mb-6">
                                <span className="text-2xl sm:text-3xl font-semibold text-slate-200 font-mono">
                                {getPercentage(candidate.votes)}%
                                </span>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <button onClick={() => decrementVote(candidate.id)} className="bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-colors disabled:opacity-50" disabled={candidate.votes === 0}>
                                    <Minus size={24} />
                                </button>
                                <button onClick={() => incrementVote(candidate.id)} className="bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-colors">
                                    <Plus size={24} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mb-8">
                    <button onClick={resetVotes} className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-all transform hover:scale-105 shadow-lg">
                        <RotateCcw size={18} />
                        Reset Semua Suara
                    </button>
                </div>
            </div>
        </div>
     );
}

export default CounterSutet;