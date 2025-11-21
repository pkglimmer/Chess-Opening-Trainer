
import React from 'react';
import { Opening } from '../types';

interface OpeningsPanelProps {
    openings: Opening[];
    selectedOpening: Opening | null;
    onSelectOpening: (opening: Opening) => void;
    isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        ))}
    </div>
);

const OpeningsPanel: React.FC<OpeningsPanelProps> = ({ openings, selectedOpening, onSelectOpening, isLoading }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 h-full">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-600 pb-2">Select an Opening</h2>
            {isLoading ? <LoadingSkeleton /> : (
                <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
                    {openings.map((opening) => (
                        <li key={opening.name}>
                            <button
                                onClick={() => onSelectOpening(opening)}
                                className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                                    selectedOpening?.name === opening.name
                                        ? 'bg-blue-600 text-white font-semibold shadow-md'
                                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {opening.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OpeningsPanel;
