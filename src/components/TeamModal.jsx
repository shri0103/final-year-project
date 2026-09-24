import React from 'react';
import { 
  X, 
  GraduationCap, 
  Users, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Building2, 
  Sparkles 
} from 'lucide-react';

export default function TeamModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const teamMembers = [
    { registerNo: "717823P332", name: "NISHANTH RAJ D", role: "Morphology Tokenization & Preprocessing Lead" },
    { registerNo: "717823P348", name: "SAKTHIVEL S", role: "Sarcasm Reasoning Engine & Graph Modeling" },
    { registerNo: "717823P353", name: "SHRIDHAR PA", role: "Continual Adaptation & EWC Memory Lead" },
    { registerNo: "717823P359", name: "VARUN VIGNESH M", role: "Full-Stack Dashboard & Customer Service Integration" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-700 shadow-2xl overflow-hidden my-8 space-y-0">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Project Dossier & Team Overview</h3>
              <p className="text-xs text-slate-400">Department of Computer Science & Engineering</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Institution Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center space-x-4">
            <Building2 className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <h4 className="text-sm font-extrabold text-white">Karpagam College of Engineering</h4>
              <p className="text-xs text-slate-300">Autonomous Institution • Affiliated to Anna University</p>
              <span className="text-[11px] text-cyan-400 font-semibold">
                Domain: Culturally Grounded Tamil Emotion Reasoning & NLP
              </span>
            </div>
          </div>

          {/* Guide Section */}
          <div className="bg-purple-950/20 border border-purple-800/40 p-4 rounded-xl space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Project Supervisor & Guide</div>
            <div className="text-base font-extrabold text-white">Dr. ARUL ANTRON VIJAY S</div>
            <div className="text-xs text-purple-300">Associate Professor, Department of Computer Science & Engineering</div>
          </div>

          {/* Team Members List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Student Research Team</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1 hover:border-cyan-500/40 transition-all">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{member.name}</span>
                    <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                      {member.registerNo}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives Summary */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Core Project Objectives</span>
            </h4>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Develop a morphology-aware AI model for recognizing emotions in Tamil customer feedback.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Enable understanding of culturally grounded Tamil expressions, idioms, and context-dependent sarcasm.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Implement continual adaptation (EWC) to learn emerging Tamil slang without complete retraining.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
