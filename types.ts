export interface Opening {
  name: string;
  description: string;
  san: string; // e.g., "1. e4 e5 2. Nf3 Nc6 3. Bb5"
  explanations: string[]; // An array of explanations, one for each move in the SAN.
}
