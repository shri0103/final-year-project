import React, { useState } from 'react';
import { Network, Database, Brain, Sparkles, CheckCircle2, ServerCog, Fingerprint, Eye } from 'lucide-react';

export default function ContinualAdaptation() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const stats = [
    { label: 'New Expressions', value: '28', borderColor: '#0D2137' },
    { label: 'Pending Review', value: '12', borderColor: '#2196F3' },
    { label: 'Reviewed', value: '18', borderColor: '#1565C0' },
    { label: 'Adapted', value: '41', borderColor: '#BBDEFB' }
  ];

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimStep(0);

    const steps = 5;
    let current = 0;
    
    const interval = setInterval(() => {
      current++;
      setSimStep(current);
      if (current >= steps) {
        clearInterval(interval);
        setTimeout(() => setIsSimulating(false), 3000);
      }
    }, 1000);
  };

  const simulationSteps = [
    "Collecting feedback...",
    "Analyzing expression...",
    "Updating linguistic representation...",
    "Validating emotion association...",
    "Adaptation complete!"
  ];

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Continual Adaptation</h1>
        <p className="text-muted text-lg">Adapt to emerging Tamil vocabulary, slang and linguistic patterns.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="card p-6 border-t-4" style={{ borderTopColor: stat.borderColor }}>
            <p className="text-sm font-bold text-muted uppercase tracking-wider mb-2">{stat.label}</p>
            <h3 className="text-4xl font-black text-primary">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Expression Table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-card-border bg-white flex justify-between items-center">
          <h3 className="text-lg font-bold text-primary">Emerging Expressions Lexicon</h3>
          <span className="badge badge-teal">Live Updates</span>
        </div>
        <div className="overflow-x-auto">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Expression</th>
                <th>Contextual Meaning</th>
                <th>Emotion</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-tamil font-bold text-primary">"vera level waiting"</td>
                <td className="text-muted">Extremely long wait time</td>
                <td><span className="badge badge-red">Frustration</span></td>
                <td><span className="badge badge-aqua font-bold">Pending</span></td>
              </tr>
              <tr>
                <td className="font-tamil font-bold text-primary">"semma service da"</td>
                <td className="text-muted">Positive colloquial expression for great service</td>
                <td><span className="badge badge-green">Satisfaction</span></td>
                <td><span className="text-secondary font-bold flex items-center gap-1"><CheckCircle2 size={14}/> Reviewed</span></td>
              </tr>
              <tr>
                <td className="font-tamil font-bold text-primary">"oru maathiriyana experience"</td>
                <td className="text-muted">Uncomfortable or weird experience</td>
                <td><span className="badge badge-blue">Discomfort</span></td>
                <td><span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={14}/> Adapted</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Workflow Visualization & Simulation */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-gradient p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">Adaptation Pipeline</h3>
            <p className="text-white/80 mb-8 max-w-sm">Observe how the model updates its internal representation when encountering new colloquial phrases.</p>
            
            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className="btn-primary bg-white text-primary hover:bg-bg-primary hover:text-primary px-6 py-3 w-max disabled:opacity-50"
            >
              <ServerCog size={20} className="mr-2" />
              {isSimulating ? 'Simulating...' : 'Simulate Adaptation'}
            </button>
            <p className="text-xs text-highlight mt-4 flex items-center gap-1">
              <Eye size={14} /> Frontend demonstration only
            </p>
          </div>
          
          <Fingerprint size={200} className="absolute -bottom-10 -right-10 text-white opacity-5" />
        </div>

        <div className="card p-8 bg-white flex flex-col items-center justify-center min-h-[300px]">
          {!isSimulating ? (
            <div className="node-tree">
              <div className="badge badge-blue px-6 py-2 node-card bg-white shadow-sm border border-card-border font-bold">New Expression</div>
              <div className="node-connector" />
              <div className="badge badge-blue px-6 py-2 node-card bg-white shadow-sm border border-card-border font-bold">Linguistic Analysis</div>
              <div className="node-connector" />
              <div className="badge badge-blue px-6 py-2 node-card bg-white shadow-sm border border-card-border font-bold">Emotion Association</div>
              <div className="node-connector" />
              <div className="badge badge-blue px-6 py-2 node-card bg-white shadow-sm border border-card-border font-bold">Human Review</div>
              <div className="node-connector" />
              <div className="badge badge-teal px-8 py-3 node-card font-bold text-base shadow-md">Adaptation</div>
            </div>
          ) : (
            <div className="w-full space-y-6 animate-fade-in">
              <h3 className="text-center font-bold text-primary mb-8 flex items-center justify-center gap-2">
                <Sparkles className="animate-spin-slow text-accent" /> Running Simulation
              </h3>
              
              <div className="space-y-4 max-w-sm mx-auto">
                {simulationSteps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-4 transition-all duration-500 ${simStep > idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${simStep > idx + 1 ? 'bg-green-100 text-green-600' : simStep === idx + 1 ? 'bg-accent/20 text-secondary animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
                      {simStep > idx + 1 ? <CheckCircle2 size={16} /> : <Database size={14} />}
                    </div>
                    <span className={`text-sm font-medium ${simStep > idx + 1 ? 'text-primary' : simStep === idx + 1 ? 'text-secondary font-bold' : 'text-muted'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
