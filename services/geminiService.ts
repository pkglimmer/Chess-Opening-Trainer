import { GoogleGenAI, Type } from "@google/genai";
import { Opening } from '../types';

// Fix: Per coding guidelines, initialize GoogleGenAI directly with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


const openingSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "The common name of the chess opening." },
        description: { type: Type.STRING, description: "A brief, one-sentence description of the opening's primary goal." },
        san: { type: Type.STRING, description: "The full opening line in Standard Algebraic Notation (SAN), up to 7-10 moves per side where applicable." },
        explanations: {
            type: Type.ARRAY,
            description: "An array of concise, beginner-friendly explanations for each individual move in the SAN line.",
            items: { type: Type.STRING }
        }
    },
    required: ["name", "description", "san", "explanations"]
};

export const fetchChessOpenings = async (): Promise<Opening[]> => {
    const prompt = `Generate a list of 12 popular and distinct chess openings suitable for beginner to intermediate players. Include a good mix of openings for White and Black. Examples include Italian Game, Sicilian Defense, Queen's Gambit, Caro-Kann Defense, Ruy López, French Defense, King's Indian Defense, Scotch Game, Slav Defense, and the London System. For each opening, provide a name, a short one-sentence description of its main idea, its main line in Standard Algebraic Notation (SAN), and a corresponding array of concise, beginner-friendly explanations for each individual move in the SAN line. The SAN line should be comprehensive, ideally between 7 and 10 moves for each side where applicable.`;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: openingSchema
                }
            }
        });
        
        const jsonString = response.text;
        const openings = JSON.parse(jsonString);
        return openings;
    } catch (error) {
        console.error("Error fetching chess openings from Gemini:", error);
        // Fallback data in case of API error
        return [
            { 
                name: "Italian Game", 
                description: "A classic opening focusing on rapid development and central control.", 
                san: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+",
                explanations: [
                    "White's King's Pawn Opening, claiming center space and opening lines for the queen and bishop.",
                    "Black mirrors the move, challenging central control.",
                    "Develops the knight to a strong central square, attacking Black's e5 pawn.",
                    "Develops a knight and defends the e5 pawn.",
                    "Develops the bishop to its most active square, putting pressure on Black's weak f7 square.",
                    "Black develops their bishop, entering the Giuoco Piano variation.",
                    "White prepares to build a strong pawn center with d4.",
                    "Develops a knight and puts pressure on White's center.",
                    "White challenges Black in the center.",
                    "Black captures the d4 pawn.",
                    "White recaptures, solidifying central control.",
                    "Black checks the white king, forcing a response."
                ] 
            },
            { 
                name: "Sicilian Defense", 
                description: "An aggressive counter-attacking defense for Black against 1. e4.", 
                san: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6",
                explanations: [
                    "White's most popular first move, controlling the center.",
                    "Black creates an imbalance, fighting for the center with a flank pawn.",
                    "Develops a knight and prepares to challenge Black's central control with d4.",
                    "Prepares to develop the queen's knight and supports the d-pawn.",
                    "White opens the center, aiming to exploit their space advantage.",
                    "Black exchanges a wing pawn for a central pawn, a key idea in the Sicilian.",
                    "White recaptures, placing the knight on a strong central square.",
                    "Develops a knight and puts pressure on White's e4 pawn.",
                    "Develops the other knight and defends the e4 pawn.",
                    "The Najdorf variation begins, preventing White's pieces from using the b5 square and preparing a queenside pawn expansion."
                ]
            },
            { 
                name: "Queen's Gambit", 
                description: "A strategic opening where White offers a pawn to dominate the center.", 
                san: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O",
                explanations: [
                    "White starts with the Queen's Pawn, controlling the center and preparing for solid development.",
                    "Black replies symmetrically, also staking a claim in the center.",
                    "The Queen's Gambit. White 'offers' a pawn to deflect Black's d5 pawn and build a strong center.",
                    "Black declines the gambit with e6, reinforcing the d5 pawn.",
                    "White develops the knight, increasing central control.",
                    "Black develops a knight and prepares to castle.",
                    "White develops the bishop, pinning the f6 knight to the queen.",
                    "Black develops the bishop and unpins the knight.",
                    "White plays a quiet move, preparing to develop the king's bishop and castle.",
                    "Black castles, moving the king to safety."
                ]
            }
        ];
    }
};