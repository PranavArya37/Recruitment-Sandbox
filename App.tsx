
import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import { generateRecruitmentAssets } from './services/geminiService';
import type { RecruitmentAssets } from './types';

function App() {
  const [rawNotes, setRawNotes] = useState<string>('');
  const [thinkingMode, setThinkingMode] = useState<boolean>(false);
  const [assets, setAssets] = useState<RecruitmentAssets | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!rawNotes.trim()) return;

    setIsLoading(true);
    setError(null);
    setAssets(null);

    try {
      const result = await generateRecruitmentAssets(rawNotes, thinkingMode);
      setAssets(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="container mx-auto px-4">
        <Header />
        <main className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <InputSection
            rawNotes={rawNotes}
            setRawNotes={setRawNotes}
            thinkingMode={thinkingMode}
            setThinkingMode={setThinkingMode}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <div className="border-t lg:border-t-0 lg:border-l border-gray-200"></div>
          <OutputSection 
            assets={assets}
            isLoading={isLoading}
            error={error}
          />
        </main>
        <footer className="text-center py-6 text-gray-500 text-sm">
            <p>&copy; 2025 Recruitment Sandbox - <a href="https://pranavarya.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Pranav Arya</a>. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
