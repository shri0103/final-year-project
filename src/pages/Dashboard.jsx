import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Frown, MessageCircle, AlertTriangle, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const pieData = [
    { name: 'Frustration', value: 35 },
    { name: 'Satisfaction', value: 45 },
    { name: 'Anger', value: 15 },
    { name: 'Sadness', value: 5 },
  ];
  const COLORS = ['#1565C0', '#2196F3', '#0D2137', '#90CAF9'];

  const lineData = [
    { name: 'Mon', count: 120 },
    { name: 'Tue', count: 180 },
    { name: 'Wed', count: 150 },
    { name: 'Thu', count: 210 },
    { name: 'Fri', count: 250 },
    { name: 'Sat', count: 190 },
    { name: 'Sun', count: 184 },
  ];

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Emotion Intelligence Dashboard</h1>
        <p className="text-muted text-lg">Analyze and understand emotional patterns in Tamil feedback.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 border-t-4 border-t-muted">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider">Total Analyses</p>
              <h3 className="text-3xl font-bold text-primary mt-2">1,284</h3>
            </div>
            <div className="p-3 rounded-lg bg-primary/5 text-primary">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-sm text-accent font-medium flex items-center gap-1">
            <TrendingUp size={14} /> +12% this week
          </p>
        </div>

        <div className="card p-6 border-t-4 border-t-secondary">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider">Frustration</p>
              <h3 className="text-3xl font-bold text-primary mt-2">342</h3>
            </div>
            <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
              <Frown size={24} />
            </div>
          </div>
          <p className="text-sm text-secondary font-medium flex items-center gap-1">
            26.6% of total
          </p>
        </div>

        <div className="card p-6 border-t-4 border-t-primary">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider">Anger</p>
              <h3 className="text-3xl font-bold text-primary mt-2">218</h3>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <AlertTriangle size={24} />
            </div>
          </div>
          <p className="text-sm text-primary font-semibold flex items-center gap-1">
            17% of total
          </p>
        </div>

        <div className="card p-6 border-t-4 border-t-accent">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider">Sarcasm Detected</p>
              <h3 className="text-3xl font-bold text-primary mt-2">197</h3>
            </div>
            <div className="p-3 rounded-lg bg-accent/10 text-secondary">
              <MessageCircle size={24} />
            </div>
          </div>
          <p className="text-sm text-accent font-medium flex items-center gap-1">
            High complexity
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-1">
          <h3 className="text-lg font-bold text-primary mb-6">Emotion Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-muted">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-primary mb-6">Analysis Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#18C6B4', strokeWidth: 2, strokeDasharray: '4 4' }}
                />
                <Line type="monotone" dataKey="count" stroke="#166E7F" strokeWidth={3} dot={{ fill: '#166E7F', r: 4 }} activeDot={{ r: 6, fill: '#18C6B4' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Analysis Table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-card-border flex justify-between items-center bg-white">
          <h3 className="text-lg font-bold text-primary">Recent Analysis (Demo Data)</h3>
          <Link to="/analyze" className="text-sm font-semibold text-secondary hover:text-accent">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Tamil Feedback</th>
                <th>Primary Emotion</th>
                <th>Confidence</th>
                <th>Sarcasm</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-tamil font-medium text-primary">"சாப்பாடு நல்லாவே இல்லை..."</td>
                <td><span className="badge badge-red">Frustration</span></td>
                <td><div className="font-mono text-sm">87%</div></td>
                <td><span className="text-muted">No</span></td>
                <td><span className="text-green-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>Complete</span></td>
              </tr>
              <tr>
                <td className="font-tamil font-medium text-primary">"சூப்பர் சர்வீஸ்! 2 மணி நேரம் வெயிட்டிங்..."</td>
                <td><span className="badge badge-red">Frustration</span></td>
                <td><div className="font-mono text-sm">91%</div></td>
                <td><span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-accent text-primary">Yes</span></td>
                <td><span className="text-green-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>Complete</span></td>
              </tr>
              <tr>
                <td className="font-tamil font-medium text-primary">"ரொம்ப நல்லா இருந்தது, நன்றி"</td>
                <td><span className="badge badge-green">Satisfaction</span></td>
                <td><div className="font-mono text-sm">94%</div></td>
                <td><span className="text-muted">No</span></td>
                <td><span className="text-green-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>Complete</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #0D2137 0%, #1565C0 60%, #2196F3 100%)' }}>
        {/* Dot grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px', pointerEvents: 'none'
        }} />
        {/* Glow blob */}
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ background: '#90CAF9' }} />

        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#BBDEFB', border: '1px solid rgba(255,255,255,0.18)' }}>
              <Zap size={11} /> Ready to analyze
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-2">Analyze New Tamil Feedback</h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>
              Test the morphology-aware, culturally grounded emotion model with your own text.
            </p>
          </div>
          <Link
            to="/analyze"
            className="shrink-0 flex items-center gap-3 px-7 py-4 rounded-xl font-bold text-base transition-all"
            style={{
              background: 'white',
              color: '#1565C0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.30)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)'; }}
          >
            <Zap size={20} style={{ color: '#1565C0' }} />
            Start Analysis
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
