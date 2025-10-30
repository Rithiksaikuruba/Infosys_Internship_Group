import React, { useState, useRef, useEffect } from "react";
import { MdLaptopMac, MdTipsAndUpdates } from "react-icons/md";
import { FaBrain, FaUserTie, FaStore } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiFlowChart } from "react-icons/ri";
import { AiOutlineHistory, AiOutlineCode, AiOutlineFlag, AiOutlineClockCircle } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { BiSkipNext } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";

// Toast notification at bottom right
function Toasts({ messages, remove }) {
  return (
    <div className="fixed bottom-6 right-8 z-50 flex flex-col gap-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-2xl flex items-center gap-3 animate-fadein"
          role="alert"
        >
          <span>{msg.text}</span>
          <button className="text-xl p-1 rounded hover:bg-blue-900 transition" onClick={() => remove(msg.id)} aria-label="Dismiss">&times;</button>
        </div>
      ))}
    </div>
  );
}

// Top round stepper (round progress)
function Stepper({ activeIdx }) {
  const steps = [
    { icon: <MdLaptopMac />, label: "Coding" },
    { icon: <FaBrain />, label: "Technical" },
    { icon: <RiFlowChart />, label: "System Design" },
    { icon: <FaUserTie />, label: "HR" },
  ];
  return (
    <div className="flex justify-center w-full max-w-2xl mx-auto mb-8 pt-4">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold shadow ${activeIdx === i
              ? 'bg-gradient-to-br from-blue-600 to-green-400 text-white scale-105'
              : activeIdx > i
                ? 'bg-green-200 text-green-900'
                : 'bg-gray-200 text-gray-400'
            }`}>
            {step.icon}
          </div>
          {i < steps.length - 1 && (
            <div className={`mx-2 w-14 h-1 rounded-full ${activeIdx > i ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// Timer display
function Timer({ seconds, onTimeout }) {
  const [t, setT] = useState(seconds);
  useEffect(() => { setT(seconds); }, [seconds]);
  useEffect(() => { if (t <= 0) { onTimeout && onTimeout(); return; }
    const id = setTimeout(() => setT(_ => _ - 1), 1000);
    return () => clearTimeout(id);
  }, [t, onTimeout]);
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-lg px-3 py-1 rounded-xl shadow bg-blue-600 text-white`}>
      <AiOutlineClockCircle /> {t}s
    </span>
  );
}

const ROUNDS = [
  {
    type: "Online Coding Test",
    icon: <MdLaptopMac size={28} className="text-blue-600" />,
    tip: "Discuss your plan and cover edge cases before coding."
  },
  {
    type: "Technical Interviews",
    icon: <FaBrain size={28} className="text-purple-700" />,
    tip: "Link concepts, explain trade-offs, and be concise."
  },
  {
    type: "System Design Round",
    icon: <RiFlowChart size={30} className="text-yellow-600" />,
    tip: "Think scale, discuss components, draw your schema."
  },
  {
    type: "HR Round",
    icon: <FaUserTie size={28} className="text-pink-700" />,
    tip: "Use STAR format, reflect honestly and briefly."
  }
];

const COMPANIES = {
  product: { label: "Product-Based", icon: <AiOutlineCode size={30} className="text-indigo-600" /> },
  service: { label: "Service-Based", icon: <FaStore size={30} className="text-gray-700" /> },
  startup: { label: "Startup", icon: <MdTipsAndUpdates size={30} className="text-green-600" /> }
};

const AVATARS = {
  product: "https://avatars.githubusercontent.com/u/6128107?s=200",
  service: "https://avatars.githubusercontent.com/u/9919?s=200",
  startup: "https://avatars.githubusercontent.com/u/2?s=200"
};

export default function MockInterview({ initialCompanyType }) {
  const [step, setStep] = useState(0);
  const [company, setCompany] = useState(initialCompanyType || "");
  const [session, setSession] = useState("");
  const [idx, setIdx] = useState(0);
  const [q, setQ] = useState(null);
  const [a, setA] = useState("");
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [fin, setFin] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);
  const inputRef = useRef();
  const [timer, setTimer] = useState(120);

  // Toasts
  const addToast = (text, ms=3400) => {
    const id = ++toastId.current;
    setToasts(arr => [...arr, {id, text}]);
    setTimeout(()=>setToasts(arr=>arr.filter(t=>t.id!==id)), ms);
  };
  const removeToast = (id) => setToasts(arr=>arr.filter(t=>t.id!==id));

  useEffect(() => { setTimer(120); }, [q]);
  useEffect(() => {
    let id; if (timer > 0 && q) id = setTimeout(() => setTimer(t=>t-1), 1000);
    if (timer === 0 && q) handleAnswer(false, true);
    return ()=>clearTimeout(id);
  }, [timer, q]); // eslint-disable-line

  // Mock API (replace with real API as needed)
  const api = async (url, _, data) => {
    if (url.endsWith("start")) return { session_id: "sess-"+Math.random().toString(36).slice(2,8), question: { round:1, ...ROUNDS[0], question:"Reverse a linked list (O(n))."}, total_rounds:4, };
    if (url.endsWith("answer")) {
      const i = (data.round_number||1); if (i<ROUNDS.length)
        return { question: { round: i+1, ...ROUNDS[i], question: ["Explain prototypal inheritance.",
        "System design: image hosting scale plan.", "Describe a tough team challenge."][i-1] }};
      return {};
    }
    if (url.endsWith("feedback")) return {
        strengths: "Crisp code, logical explanations.",
        weaknesses: "Could show more diagrams/trade-offs.",
        score: "9/10", tips: "Practice whiteboarding, use STAR.",
        resources: "Grokking system design, Neetcode, LeetCode top 100." };
    return {};
  };

  const startInterview = async (type) => {
    setStep(1); setCompany(type);
    const d = await api("/mock/start", "post", {company_type:type});
    setSession(d.session_id); setQ(d.question); setIdx(0); setA(""); setFeedback(null); setFin(false); setHistory([]);
    setTimeout(()=>inputRef.current?.focus(),150);
  };

  const handleAnswer = async(flag=false, skip=false) => {
    const val = flag ? "[FLAGGED]" : skip ? "[SKIPPED]" : a;
    if (!val.trim()) return addToast("Please enter an answer, or use skip/flag.");
    setHistory(h => [...h, {round: idx+1, ...q, answer: val}]);
    setA("");
    if (idx < ROUNDS.length-1) {
      const res = await api("/mock/answer", "post", { session_id:session, round_number:idx+1, answer: val });
      setIdx(idx+1); setQ(res.question); setTimer(120);
      setTimeout(()=>inputRef.current?.focus(),150);
    } else { setFin(true); setStep(2); fetchFeedback();}
  };

  const fetchFeedback = async () => setFeedback(await api("/mock/feedback","get",{session_id:session}));

  if (step === 0)
    return (
      <div className="max-w-2xl mx-auto pt-18 pb-14 px-4">
        <h2 className="text-5xl font-black mb-12 tracking-tight text-blue-800 text-center">Start Mock Interview</h2>
        <div className="flex gap-10 justify-center">
          {Object.entries(COMPANIES).map(([k, {label,icon}]) =>
            <button key={k} className="p-8 rounded-3xl text-2xl bg-white shadow hover:shadow-lg border-2 border-blue-100 hover:border-blue-400 font-bold flex flex-col items-center focus:outline-none transition-all"
              onClick={()=>startInterview(k)}
            >
              <div className="mb-2">{icon}</div>
              <span className="text-base">{label}</span>
            </button>
          )}
        </div>
        <Toasts messages={toasts} remove={removeToast} />
      </div>
    );

  if (step === 2)
    return (
      <div className="max-w-3xl mx-auto p-8 my-14 bg-white rounded-3xl shadow-xl space-y-10 border border-blue-100">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><BsCheck2Circle className="text-green-600" /> Interview Complete</h2>
          <span className="text-xs text-gray-400 font-mono">Session: {session}</span>
        </header>
        <section className="flex flex-col md:flex-row gap-8 mt-3">
          <div className="bg-green-50 rounded-2xl p-6 shadow flex-1 border border-green-200">
            <h3 className="mb-3 text-lg font-bold flex items-center gap-2 text-green-800"><MdTipsAndUpdates /> Feedback</h3>
            <ul className="text-base md:text-sm space-y-2">
              <li><b>Strengths:</b> {feedback?.strengths}</li>
              <li><b>Weaknesses:</b> {feedback?.weaknesses}</li>
              <li><b>Score:</b> {feedback?.score}</li>
              <li><b>Tips:</b> {feedback?.tips}</li>
              <li><b>Resources:</b> {feedback?.resources}</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 shadow flex-1 border border-blue-200">
            <h3 className="mb-3 text-lg font-bold flex items-center gap-2 text-blue-700"><AiOutlineHistory /> Answer History</h3>
            <ul className="space-y-2 max-h-64 overflow-auto text-xs md:text-sm">
              {history.map((h,i)=>(
                <li key={i} className="bg-white p-2 rounded shadow border">
                  <b>{h.type} (Q{h.round})</b>
                  <div className="truncate">{h.question}</div>
                  <div className="text-blue-800">{h.answer}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div className="text-center mt-2">
          <button className="px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white text-lg font-bold shadow-2xl flex items-center gap-2 mx-auto transition"
            onClick={()=>window.location.reload()}>
            <FiRefreshCw /> Restart
          </button>
        </div>
        <Toasts messages={toasts} remove={removeToast} />
      </div>
    );

  return (
    <div className="w-full min-h-screen pb-16 bg-gradient-to-b from-white to-blue-50">
      <Stepper activeIdx={idx} />
      <div className="max-w-4xl mx-auto flex flex-col gap-6 items-stretch px-1">
        {/* Interviewee/company info and timer */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <img src={AVATARS[company]} className="w-16 h-16 rounded-full border-2 border-blue-200 shadow" alt="Company avatar"/>
            <span className="font-semibold text-xl flex items-center gap-1 text-blue-800">{COMPANIES[company]?.icon} {COMPANIES[company]?.label}</span>
          </div>
          <div><Timer seconds={timer} onTimeout={()=>handleAnswer(false,true)} /></div>
        </div>
        <div className="w-full mt-1">
          {/* Main Card + Sidebar Split */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Main Card */}
            <div className="md:col-span-2 rounded-3xl bg-white border border-blue-100 p-10 flex flex-col gap-6 shadow-lg transition">
              <div className="flex items-center gap-3 mb-1">
                {ROUNDS[idx].icon}
                <h3 className="text-lg font-bold">{q?.type}</h3>
                <span className="ml-auto text-gray-400 text-base font-mono tracking-wide">{`Round ${idx+1}/${ROUNDS.length}`}</span>
              </div>
              <div className="text-lg mb-1">{q?.question}</div>
              <textarea
                ref={inputRef}
                className="w-full mb-3 p-6 rounded-xl border shadow-inner border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium bg-gradient-to-br from-white to-blue-50 transition"
                rows={6}
                value={a}
                onChange={e=>setA(e.target.value)}
                placeholder="Type your answer here..."
                autoFocus
              />
              <div className="flex gap-4 mb-2 text-xs text-gray-500">
                <span>{a.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span>{a.length} chars</span>
              </div>
              <div className="flex gap-5 mt-2">
                <button className="flex-1 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base shadow-lg transition hover:scale-105 flex items-center justify-center gap-2"
                  onClick={()=>handleAnswer(false,false)}>
                  <BsCheck2Circle /> Submit & Next
                </button>
                <button className="py-3 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white font-bold text-base shadow flex items-center gap-2"
                  title="Flag this question" onClick={()=>handleAnswer(true,false)}>
                  <AiOutlineFlag /> Flag
                </button>
                <button className="py-3 px-6 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-base shadow flex items-center gap-2"
                  title="Skip this round" onClick={()=>handleAnswer(false,true)}>
                  <BiSkipNext /> Skip
                </button>
              </div>
            </div>
            {/* Sidebar */}
            <aside className="rounded-3xl bg-white border border-gray-100 p-7 shadow flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 text-blue-700 font-bold mb-1"><HiOutlineLightBulb size={18} />Round Tip</div>
                <div className="text-base text-gray-700">{ROUNDS[idx].tip}</div>
              </div>
              <div>
                <div className="font-bold flex items-center gap-2 mb-1 text-blue-900"><AiOutlineHistory size={18} />History</div>
                <ul className="space-y-1 text-xs max-h-36 overflow-y-auto">
                  {history.length === 0 ? <li className="text-gray-400">Nothing yet.</li> :
                    history.map((h,i)=>(
                      <li key={i} className="bg-gray-50 p-2 rounded"><b>{h.type}:</b> <span className="font-mono ml-1">{h.answer.slice(0,48)}{h.answer.length>48?'...':''}</span></li>
                    ))
                  }
                </ul>
              </div>
            </aside>
          </div>
        </div>
        <Toasts messages={toasts} remove={removeToast} />
      </div>
    </div>
  );
}
