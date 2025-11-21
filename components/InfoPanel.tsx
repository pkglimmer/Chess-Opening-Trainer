import React from 'react';
import { Opening } from '../types';

interface InfoPanelProps {
    opening: Opening | null;
    moves: string[];
    currentMoveIndex: number;
    explanation: string;
    onReset: () => void;
    onNextMove: () => void;
    onPreviousMove: () => void;
}

const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 5.5a4.5 4.5 0 0 1 4.5 4.5v.5a4.5 4.5 0 0 1-4.5 4.5a4.5 4.5 0 0 1-4.5-4.5v-.5A4.5 4.5 0 0 1 12 5.5z"/>
        <path d="M12 15.5A4.5 4.5 0 0 1 7.5 11V10.5a4.5 4.5 0 1 1 9 0V11a4.5 4.5 0 0 1-4.5 4.5z"/>
        <path d="M16 11.5a2.5 2.5 0 0 1-2.5 2.5"/>
        <path d="M8 11.5a2.5 2.5 0 0 0 2.5 2.5"/>
        <path d="M12 15.5v5"/>
        <path d="M10 20.5h4"/>
    </svg>
);

const InfoPanel: React.FC<InfoPanelProps> = ({ opening, moves, currentMoveIndex, explanation, onReset, onNextMove, onPreviousMove }) => {
    if (!opening) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full flex items-center justify-center">
                <p>Select an opening to begin.</p>
            </div>
        );
    }
    
    const isPracticeFinished = currentMoveIndex >= moves.length;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full flex flex-col">
            <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-2">{opening.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 italic mb-4">{opening.description}</p>
                
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold mb-2">Move Sequence</h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                        {moves.map((move, index) => {
                             const moveNumber = Math.floor(index / 2) + 1;
                             const isWhiteMove = index % 2 === 0;
                             return (
                                 <span key={index} className={`px-2 py-1 rounded ${currentMoveIndex === index ? 'bg-blue-500 text-white font-bold' : ''}`}>
                                     {isWhiteMove ? `${moveNumber}.` : ''} {move}
                                 </span>
                             );
                        })}
                    </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[120px]">
                    <h3 className="font-semibold mb-2 flex items-center">
                        <BrainIcon className="mr-2 h-5 w-5"/>
                        Explanation
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        {explanation || 'Click "Next" to start.'}
                    </p>
                </div>

                {isPracticeFinished && (
                    <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-200 rounded-lg text-center">
                        <h3 className="font-bold text-lg">Opening Complete!</h3>
                        <p>You've successfully played the main line.</p>
                    </div>
                )}
            </div>
            
            <div className="flex-shrink-0 mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex gap-4">
                    <button
                        onClick={onPreviousMove}
                        disabled={currentMoveIndex === 0}
                        className="w-full bg-gray-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
                        Back
                    </button>
                    <button
                        onClick={onNextMove}
                        disabled={isPracticeFinished}
                        className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
                        Next
                    </button>
                    <button
                        onClick={onReset}
                        className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/></svg>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;