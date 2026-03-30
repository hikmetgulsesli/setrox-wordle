import React, { useMemo } from 'react';
import { Key, KeyStatus } from './Key';

export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface GuessResult {
  letter: string;
  status: LetterStatus;
}

export interface KeyboardProps {
  guesses: GuessResult[][];
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

// Turkish QWERTY layout with Turkish characters
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

// Extended Turkish layout with Turkish characters in their standard positions
const TURKISH_KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç', 'BACKSPACE'],
];

export const Keyboard: React.FC<KeyboardProps> = ({
  guesses,
  onKeyPress,
  onEnter,
  onBackspace,
}) => {
  // Compute letter statuses from all guesses - priority: correct > present > absent > empty
  const letterStatuses = useMemo(() => {
    const statuses: Record<string, KeyStatus> = {};

    for (const guess of guesses) {
      for (const { letter, status } of guess) {
        const upperLetter = letter.toUpperCase();
        const currentStatus = statuses[upperLetter];

        // Priority: correct > present > absent > empty
        if (status === 'correct') {
          statuses[upperLetter] = 'correct';
        } else if (status === 'present' && currentStatus !== 'correct') {
          statuses[upperLetter] = 'present';
        } else if (status === 'absent' && currentStatus !== 'correct' && currentStatus !== 'present') {
          statuses[upperLetter] = 'absent';
        }
      }
    }

    return statuses;
  }, [guesses]);

  const handleKeyClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter();
    } else if (value === 'BACKSPACE') {
      onBackspace();
    } else {
      onKeyPress(value);
    }
  };

  return (
    <div data-testid="keyboard" className="flex flex-col gap-1.5 sm:gap-2 p-2">
      {TURKISH_KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          data-testid={`keyboard-row-${rowIndex}`}
          className="flex justify-center gap-1 sm:gap-1.5"
        >
          {row.map((key) => (
            <Key
              key={key}
              value={key}
              status={letterStatuses[key] || 'empty'}
              onClick={handleKeyClick}
              isWide={key === 'ENTER' || key === 'BACKSPACE'}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
