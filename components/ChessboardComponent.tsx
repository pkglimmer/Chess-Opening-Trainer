
import React, { useMemo } from 'react';
import Piece, { PieceSymbol } from './Piece';

interface ChessboardComponentProps {
    position: string;
}

const ChessboardComponent: React.FC<ChessboardComponentProps> = ({ position }) => {
    
    const pieces = useMemo(() => {
        const board: (PieceSymbol | null)[] = [];
        const fenBoard = position.split(' ')[0];
        const ranks = fenBoard.split('/');

        for (const rank of ranks) {
            for (const char of rank) {
                if (isNaN(parseInt(char, 10))) {
                    const color = char === char.toUpperCase() ? 'w' : 'b';
                    const type = char.toUpperCase();
                    board.push(`${color}${type}` as PieceSymbol);
                } else {
                    for (let i = 0; i < parseInt(char, 10); i++) {
                        board.push(null);
                    }
                }
            }
        }
        return board;
    }, [position]);
    
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    const boardSquares = useMemo(() => {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isLight = (row + col) % 2 !== 0;
            const pieceIndex = i;
            
            squares.push(
                <div key={i} className={`w-full h-full ${isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}`}>
                    {pieces[pieceIndex] && <Piece piece={pieces[pieceIndex]!} />}
                </div>
            );
        }
        return squares;
    }, [pieces]);

    return (
        <div className="w-full max-w-[400px] md:max-w-full lg:w-[500px] aspect-square shadow-2xl rounded-lg overflow-hidden font-mono select-none">
            <div className="relative w-full h-full">
                <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                    {boardSquares}
                </div>
                {ranks.map((rank, i) => (
                    <div key={`rank-${rank}`} className="absolute text-xs font-bold text-[#b58863] dark:text-[#f0d9b5] opacity-80" style={{ top: `${i * 12.5 + 1}%`, left: '1%' }}>{rank}</div>
                ))}
                {files.map((file, i) => (
                     <div key={`file-${file}`} className="absolute text-xs font-bold text-[#b58863] dark:text-[#f0d9b5] opacity-80" style={{ bottom: '1%', left: `${i * 12.5 + 4.5}%` }}>{file}</div>
                ))}
            </div>
        </div>
    );
};

export default ChessboardComponent;