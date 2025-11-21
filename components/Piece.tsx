import React from 'react';

export type PieceSymbol = 'wP' | 'wN' | 'wB' | 'wR' | 'wQ' | 'wK' | 'bP' | 'bN' | 'bB' | 'bR' | 'bQ' | 'bK';

interface PieceProps {
    piece: PieceSymbol;
}

const PIECE_NAMES: Record<string, string> = {
    'P': 'Pawn',
    'N': 'Knight',
    'B': 'Bishop',
    'R': 'Rook',
    'Q': 'Queen',
    'K': 'King',
};

const Piece: React.FC<PieceProps> = ({ piece }) => {
    const color = piece[0] === 'w' ? 'White' : 'Black';
    const pieceType = piece[1];
    const pieceName = PIECE_NAMES[pieceType];
    const altText = `${color} ${pieceName}`;
    const imageUrl = `https://www.chess.com/chess-themes/pieces/neo/300/${piece.toLowerCase()}.png`;

    return (
        <div className="w-full h-full flex items-center justify-center cursor-pointer">
            <img 
                src={imageUrl} 
                alt={altText} 
                className="w-full h-full object-contain" 
                draggable="false"
            />
        </div>
    );
};

export default Piece;
