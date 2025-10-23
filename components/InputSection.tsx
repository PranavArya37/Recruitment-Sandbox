
import React from 'react';

interface InputSectionProps {
  rawNotes: string;
  setRawNotes: (notes: string) => void;
  thinkingMode: boolean;
  setThinkingMode: (mode: boolean) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  rawNotes,
  setRawNotes,
  thinkingMode,
  setThinkingMode,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="w-full lg:w-2/5 p-4 flex flex-col space-y-6">
      <div className="flex flex-col">
        <label htmlFor="rawNotes" className="text-lg font-medium text-gray-700 mb-2">
          Enter Raw Job Notes
        </label>
        <textarea
          id="rawNotes"
          value={rawNotes}
          onChange={(e) => setRawNotes(e.target.value)}
          placeholder="e.g., Senior React dev, 5+ yrs exp, knows TS, GraphQL, works on design system, good communicator, leads small team..."
          className="w-full h-64 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-lg border border-indigo-200">
        <div>
            <h3 className="font-semibold text-gray-800">Enable Thinking Mode</h3>
            <p className="text-sm text-gray-600">For complex roles. Uses a more advanced model.</p>
        </div>
        <label htmlFor="thinking-mode-toggle" className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            id="thinking-mode-toggle" 
            className="sr-only peer"
            checked={thinkingMode}
            onChange={(e) => setThinkingMode(e.target.checked)}
            disabled={isLoading}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !rawNotes.trim()}
        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        {isLoading ? 'Generating...' : '✨ Generate Assets'}
      </button>
    </div>
  );
};

export default InputSection;
