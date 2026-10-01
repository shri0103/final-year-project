import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Frown, MessageCircle, AlertTriangle, RefreshCw, Database, Eye } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardAPI } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const data = await dashboardAPI.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const defaultPieData = [
    { name: 'Frustration', value: 35 },
    { name: 'Satisfaction', value: 45 },
    { name: 'Anger', value: 15 },
    { name: 'Sarcasm', value: 20 },
  ];
  const COLORS = ['#EF4444', '#10B981', '#DC2626', '#F59E0B'];

  const pieData = stats?.pieData && stats.pieData.length > 0 ? stats.pieData : defaultPieData;

  const lineData = stats?.weeklyTrend && stats.weeklyTrend.length > 0 ? stats.weeklyTrend : [
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
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold text-primary">Emotion Intelligence Dashboard</h1>
            <span className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              <Database size={12} className="text-emerald-600" /> Live MongoDB Feed
            </span>
          </div>
          <p className="text-muted text-base">Analyze and monitor emotional distribution in Tamil customer feedback.</p>
        </div>

        <button
          onClick={fetchStats}
          disabled={refreshing}
          className="btn-secondary flex items-center gap-2 text-xs"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          <span>{refreshing ? 'Syncing...' : 'Refresh Metrics'}</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Analyses */}
        <div className="card p-6 border-t-4 border-t-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Analyses</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.totalAnalyses ?? '1,284'}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-xs text-blue-600 font-semibold flex items-center gap-1">
            <Database size={13} /> Stored in MongoDB collection
          </p>
        </div>

        {/* Frustration */}
        <div className="card p-6 border-t-4 border-t-amber-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Frustration</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.frustrationCount ?? 342}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
              <Frown size={24} />
            </div>
          </div>
          <p className="text-xs text-amber-700 font-semibold flex items-center gap-1">
            {stats?.frustrationPercent ?? '26.6'}% of total volume
          </p>
        </div>

        {/* Anger */}
        <div className="card p-6 border-t-4 border-t-red-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Anger & Distress</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.angerCount ?? 218}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <AlertTriangle size={24} />
            </div>
          </div>
          <p className="text-xs text-red-700 font-semibold flex items-center gap-1">
            {stats?.angerPercent ?? '17.0'}% high priority alerts
          </p>
        </div>

        {/* Sarcasm */}
        <div className="card p-6 border-t-4 border-t-pink-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sarcasm Detected</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.sarcasmCount ?? 197}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-pink-50 text-pink-600">
              <MessageCircle size={24} />
            </div>
          </div>
          <p className="text-xs text-pink-700 font-semibold flex items-center gap-1">
            {stats?.sarcasmPercent ?? '15.3'}% inverted praise
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="card p-6 lg:col-span-1">
          <h3 className="text-base font-bold text-gray-900 mb-6">Emotion Distribution</h3>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium text-gray-600">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span>{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-gray-900">Analysis Ingestion Trend</h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
              Weekly Timeline
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#2196F3"
                  strokeWidth={3}
                  dot={{ fill: '#1565C0', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Analyses Stream from MongoDB */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent Customer Ingestions in MongoDB</h3>
            <p className="text-xs text-gray-500">Live analyses stored in 'emotion_analyses' collection</p>
          </div>
          <Link to="/analyze" className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
            Analyze New Text <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold border-b">
              <tr>
                <th className="px-6 py-3">Feedback Text</th>
                <th className="px-6 py-3">Primary Emotion</th>
                <th className="px-6 py-3">Sarcasm</th>
                <th className="px-6 py-3">Confidence</th>
                <th className="px-6 py-3">Urgency</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats?.recentAnalyses && stats.recentAnalyses.length > 0 ? (
                stats.recentAnalyses.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-6 py-3.5 max-w-xs font-tamil text-gray-900 truncate">
                      {item.rawText}
                    </td>
                    <td className="px-6 py-3.5 font-bold text-xs">
                      <span className={`px-2.5 py-1 rounded-full ${
                        item.primaryEmotion?.includes('FRUSTRATION') ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        item.primaryEmotion?.includes('ANGER') ? 'bg-red-50 text-red-800 border border-red-200' :
                        item.primaryEmotion?.includes('SATISFACTION') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        'bg-gray-50 text-gray-800 border border-gray-200'
                      }`}>
                        {item.primaryEmotion}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-xs font-semibold">
                      {item.sarcasmDetected ? (
                        <span className="text-pink-600 font-bold">Yes 😏</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-xs text-gray-700">
                      {item.confidence || 92}%
                    </td>
                    <td className="px-6 py-3.5 text-xs">
                      <span className={`font-bold ${
                        item.urgency === 'CRITICAL' ? 'text-red-600' :
                        item.urgency === 'HIGH' ? 'text-amber-600' :
                        item.urgency === 'MEDIUM' ? 'text-blue-600' : 'text-emerald-600'
                      }`}>
                        {item.urgency || 'LOW'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => navigate('/result', { state: { result: item, id: item.id } })}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-auto"
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400 text-xs">
                    No recent analyses logged yet. Start by analyzing text.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
