import { useState } from 'react';
import { Keyboard, Clock } from './components';
import type { GuessResult } from './components';
import './App.css';

function App() {
  const [guesses, setGuesses] = useState<GuessResult[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const handleKeyPress = (key: string) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const handleEnter = () => {
    if (currentGuess.length === 5) {
      // Mock evaluation - in real game this would compare to target word
      const mockResult: GuessResult[] = currentGuess.split('').map((letter, i) => ({
        letter,
        status: i === 0 ? 'correct' : i === 1 ? 'present' : 'absent',
      }));
      setGuesses((prev) => [...prev, mockResult]);
      setCurrentGuess('');
    }
  };

  const handleBackspace = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Wordle Game</h1>
      
      {/* Digital Clock and Date Display */}
      <Clock className="mb-6" />
      
      {/* Current guess display */}
      <div className="mb-8 text-2xl font-mono tracking-widest">
        {currentGuess.padEnd(5, '_')}
      </div>

      {/* Previous guesses */}
      <div className="mb-8 space-y-2">
        {guesses.map((guess, i) => (
          <div key={i} className="flex gap-2">
            {guess.map((result, j) => (
              <span
                key={j}
                className={`w-10 h-10 flex items-center justify-center font-bold rounded ${
                  result.status === 'correct'
                    ? 'bg-green-500 text-white'
                    : result.status === 'present'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {result.letter}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Virtual Keyboard */}
      <Keyboard
        guesses={guesses}
        onKeyPress={handleKeyPress}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
      />
    </div>
  );
}

export default App;
