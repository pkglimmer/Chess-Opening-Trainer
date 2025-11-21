
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Opening } from './types';
import { fetchChessOpenings } from './services/geminiService';
import OpeningsPanel from './components/OpeningsPanel';
import ChessboardComponent from './components/ChessboardComponent';
import InfoPanel from './components/InfoPanel';

const App: React.FC = () => {
    const [openings, setOpenings] = useState<Opening[]>([]);
    const [selectedOpening, setSelectedOpening] = useState<Opening | null>(null);
    const [game, setGame] = useState(new Chess());
    const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
    const [moveExplanation, setMoveExplanation] = useState<string>('');
    const [isLoadingOpenings, setIsLoadingOpenings] = useState(true);

    useEffect(() => {
        const loadOpenings = async () => {
            setIsLoadingOpenings(true);
            const fetchedOpenings = await fetchChessOpenings();
            setOpenings(fetchedOpenings);
            if (fetchedOpenings.length > 0) {
                handleSelectOpening(fetchedOpenings[0]);
            }
            setIsLoadingOpenings(false);
        };
        loadOpenings();
    }, []);

    const openingMoves = useMemo(() => {
        if (!selectedOpening) return [];
        return selectedOpening.san.replace(/\d+\.\s?/g, '').split(' ').filter(s => s);
    }, [selectedOpening]);

    const handleSelectOpening = useCallback((opening: Opening) => {
        setSelectedOpening(opening);
        const newGame = new Chess();
        setGame(newGame);
        setCurrentMoveIndex(0);
        setMoveExplanation('');
    }, []);

    const handleReset = useCallback(() => {
        if (selectedOpening) {
            handleSelectOpening(selectedOpening);
        }
    }, [selectedOpening, handleSelectOpening]);

    const handleNextMove = useCallback(() => {
        if (!selectedOpening || currentMoveIndex >= openingMoves.length) return;

        const tempGame = new Chess(game.fen());
        const expectedMoveSan = openingMoves[currentMoveIndex];
        const move = tempGame.move(expectedMoveSan);

        if (move) {
            setGame(tempGame);
            setMoveExplanation(selectedOpening.explanations[currentMoveIndex] || "No explanation for this move.");
            setCurrentMoveIndex(prev => prev + 1);
        }
    }, [game, currentMoveIndex, openingMoves, selectedOpening]);

    const handlePreviousMove = useCallback(() => {
        if (currentMoveIndex <= 0 || !selectedOpening) return;

        const newMoveIndex = currentMoveIndex - 1;
        const tempGame = new Chess();
        for (let i = 0; i < newMoveIndex; i++) {
            tempGame.move(openingMoves[i]);
        }
        
        setGame(tempGame);
        setCurrentMoveIndex(newMoveIndex);
        setMoveExplanation(newMoveIndex > 0 ? selectedOpening.explanations[newMoveIndex - 1] : '');

    }, [currentMoveIndex, openingMoves, selectedOpening]);

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
            <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chess Opening Trainer</h1>
            </header>
            <main className="p-4 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-3">
                        <OpeningsPanel
                            openings={openings}
                            selectedOpening={selectedOpening}
                            onSelectOpening={handleSelectOpening}
                            isLoading={isLoadingOpenings}
                        />
                    </div>
                    <div className="lg:col-span-5 flex justify-center items-start">
                         <ChessboardComponent
                            position={game.fen()}
                        />
                    </div>
                    <div className="lg:col-span-4">
                       <InfoPanel
                           opening={selectedOpening}
                           moves={openingMoves}
                           currentMoveIndex={currentMoveIndex}
                           explanation={moveExplanation}
                           onReset={handleReset}
                           onNextMove={handleNextMove}
                           onPreviousMove={handlePreviousMove}
                       />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;