import React from 'react';
import { ArrowLeft, Moon, Stars, BookOpen } from 'lucide-react';

interface DreamStoryGameProps {
  onBack: () => void;
}

export default function DreamStoryGame({ onBack }: DreamStoryGameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-black/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-semibold">Dream Story Game</h1>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse" />
          <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-8 border border-white/20">
            <Moon className="w-16 h-16 text-purple-300" />
          </div>
        </div>

        <div className="max-w-md space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Stars className="w-6 h-6 text-yellow-300" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Coming Soon
            </h2>
            <Stars className="w-6 h-6 text-yellow-300" />
          </div>

          <p className="text-white/80 text-lg leading-relaxed">
            The Dream Story Game is currently under development. This interactive experience will help you explore your dreams and create personalized bedtime stories.
          </p>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-purple-300" />
              <h3 className="font-semibold text-purple-300">What to Expect</h3>
            </div>
            <ul className="text-sm text-white/70 space-y-2 text-left">
              <li>• Interactive dream journaling</li>
              <li>• Personalized bedtime stories</li>
              <li>• Sleep-enhancing narratives</li>
              <li>• Dream pattern analysis</li>
            </ul>
          </div>

          <div className="pt-4">
            <p className="text-white/60 text-sm">
              Stay tuned for updates on this exciting new feature!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}