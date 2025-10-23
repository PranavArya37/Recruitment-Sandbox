
import React from 'react';
import type { RecruitmentAssets } from '../types';
import Card from './Card';
import Spinner from './Spinner';

interface OutputSectionProps {
  assets: RecruitmentAssets | null;
  isLoading: boolean;
  error: string | null;
}

const JobDescriptionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const InterviewGuideIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);


const OutputSection: React.FC<OutputSectionProps> = ({ assets, isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="w-full lg:w-3/5 p-4 flex justify-center items-center">
                <Spinner />
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="w-full lg:w-3/5 p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>
            </div>
        );
    }

    if (!assets) {
        return (
            <div className="w-full lg:w-3/5 p-4 flex justify-center items-center">
                <div className="text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium">Output will appear here</h3>
                    <p className="mt-1 text-sm">Enter some notes and click generate.</p>
                </div>
            </div>
        );
    }

  return (
    <div className="w-full lg:w-3/5 p-4 flex flex-col space-y-8">
      <Card title="Job Description" icon={<JobDescriptionIcon />}>
        <div 
            className="prose prose-indigo max-w-none"
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: assets.jobDescription.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n- /g, '<br>• ') }}
        >
        </div>
      </Card>

      <Card title="Interview Guide" icon={<InterviewGuideIcon />}>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
            {assets.interviewGuide.map((question, index) => (
                <li key={index}>{question}</li>
            ))}
        </ol>
      </Card>
    </div>
  );
};

export default OutputSection;
