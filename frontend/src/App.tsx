import { useState } from "react";
import { Mail, CheckCircle, Zap, Skull } from "lucide-react";

import bruh from "./assets/bruh.png";
import axios from "axios";

export default function SpamDetector() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const API_KEY = import.meta.env.VITE_ADMIN_KEY;

  const analyzeEmail = async () => {
    if (!email.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await axios.post(
        "https://bruh-spam.onrender.com/predict",
        {
          email_text: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
        }
      );

      setResult(response.data.prediction);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative w-full max-w-4xl z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-5 relative">
            <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full animate-pulse"></div>
            <img src={bruh} alt="mail" className="h-30 w-60 rounded-4xl" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-2">
            <span className="text-white">bruh</span>
            <span className="bg-linear-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              -spam
            </span>
          </h1>
          <p className="text-zinc-400 text-sm">
            Advanced Mail-Spam Classification system
          </p>
        </div>

        {/* Main Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-violet-600/30 to-blue-600/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-70 transition duration-500"></div>

          <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/60 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/50 to-transparent"></div>

            <div className="p-8">
              {/* Textarea */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm text-white font-medium">
                    <Mail className="w-4 h-4 text-violet-400" strokeWidth={2} />
                    Please Paste your Mail Contents -
                  </label>
                  <span className="text-xs text-zinc-500 font-mono">
                    {email.length} / ∞
                  </span>
                </div>
                <div className="relative group/input">
                  <div className="absolute -inset-px bg-linear-to-r from-violet-600/20 to-blue-600/20 rounded-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity blur"></div>
                  <textarea
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter or paste email content to classify..."
                    className="relative w-full h-44 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl px-5 py-4 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 transition-all resize-none font-mono"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={analyzeEmail}
                disabled={!email.trim() || isAnalyzing}
                className="w-full group/btn relative disabled:opacity-50 disabled:cursor-not-allowed mb-6 overflow-hidden"
              >
                <div className="absolute -inset-1 bg-linear-to-r from-violet-600 via-purple-600 to-blue-600 rounded-xl opacity-70 group-hover/btn:opacity-100 blur transition duration-300"></div>
                <div className="relative bg-linear-to-r from-violet-600 via-purple-600 to-blue-600 py-4 rounded-xl flex items-center justify-center gap-2.5 font-semibold text-white shadow-lg">
                  {isAnalyzing ? (
                    <>
                      <div className="relative">
                        <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                      </div>
                      <span className="animate-pulse">
                        Running Classification
                      </span>
                    </>
                  ) : (
                    <>
                      <Zap
                        className="w-5 h-5 group-hover/btn:animate-pulse"
                        strokeWidth={2.5}
                      />
                      Check Spam
                    </>
                  )}
                </div>
              </button>

              {result && !isAnalyzing && (
                <div className="mt-6 text-center">
                  {result === "spam" ? (
                    <div className="flex flex-row justify-center items-center gap-2">
                      <Skull
                        className="w-10 h-10 text-red-500"
                        strokeWidth={2}
                      />
                      <p className="text-red-400 font-bold text-xl">
                        SPAM MAIL ENCOUNTERED
                      </p>
                      <Skull
                        className="w-10 h-10 text-red-500"
                        strokeWidth={2}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-row justify-center items-center gap-2">
                      <CheckCircle
                        className="w-10 h-10 text-emerald-500"
                        strokeWidth={2}
                      />
                      <p className="text-emerald-400 font-bold text-xl">
                        NOT SPAM
                      </p>
                      <CheckCircle
                        className="w-10 h-10 text-emerald-500"
                        strokeWidth={2}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="text-center mt-8">
                <p className="text-xs text-zinc-500 font-mono">
                  Made by Nocturnals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
