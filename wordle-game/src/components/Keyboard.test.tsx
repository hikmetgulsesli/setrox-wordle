import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Keyboard } from './Keyboard';

describe('Keyboard', () => {
  const defaultProps = {
    guesses: [],
    onKeyPress: vi.fn(),
    onEnter: vi.fn(),
    onBackspace: vi.fn(),
  };

  it('renders keyboard with all rows', () => {
    render(<Keyboard {...defaultProps} />);
    expect(screen.getByTestId('keyboard')).toBeInTheDocument();
    expect(screen.getByTestId('keyboard-row-0')).toBeInTheDocument();
    expect(screen.getByTestId('keyboard-row-1')).toBeInTheDocument();
    expect(screen.getByTestId('keyboard-row-2')).toBeInTheDocument();
  });

  it('renders all Turkish QWERTY keys in correct layout', () => {
    render(<Keyboard {...defaultProps} />);
    
    // Top row: Q W E R T Y U I O P Ğ Ü
    const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü'];
    topRow.forEach(key => {
      expect(screen.getByTestId(`key-${key}`)).toBeInTheDocument();
    });

    // Middle row: A S D F G H J K L Ş İ
    const middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ'];
    middleRow.forEach(key => {
      expect(screen.getByTestId(`key-${key}`)).toBeInTheDocument();
    });

    // Bottom row: ENTER Z X C V B N M Ö Ç BACKSPACE
    const bottomRow = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç', 'BACKSPACE'];
    bottomRow.forEach(key => {
      expect(screen.getByTestId(`key-${key}`)).toBeInTheDocument();
    });
  });

  it('calls onKeyPress when letter key is clicked', () => {
    const handleKeyPress = vi.fn();
    render(<Keyboard {...defaultProps} onKeyPress={handleKeyPress} />);
    fireEvent.click(screen.getByTestId('key-A'));
    expect(handleKeyPress).toHaveBeenCalledWith('A');
  });

  it('calls onEnter when ENTER key is clicked', () => {
    const handleEnter = vi.fn();
    render(<Keyboard {...defaultProps} onEnter={handleEnter} />);
    fireEvent.click(screen.getByTestId('key-ENTER'));
    expect(handleEnter).toHaveBeenCalled();
  });

  it('calls onBackspace when BACKSPACE key is clicked', () => {
    const handleBackspace = vi.fn();
    render(<Keyboard {...defaultProps} onBackspace={handleBackspace} />);
    fireEvent.click(screen.getByTestId('key-BACKSPACE'));
    expect(handleBackspace).toHaveBeenCalled();
  });

  it('updates key colors based on guesses', () => {
    const guesses = [
      [
        { letter: 'A', status: 'correct' as const },
        { letter: 'B', status: 'present' as const },
        { letter: 'C', status: 'absent' as const },
      ],
    ];
    render(<Keyboard {...defaultProps} guesses={guesses} />);
    
    expect(screen.getByTestId('key-A')).toHaveClass('bg-green-500');
    expect(screen.getByTestId('key-B')).toHaveClass('bg-yellow-500');
    expect(screen.getByTestId('key-C')).toHaveClass('bg-gray-500');
  });

  it('prioritizes correct status over present', () => {
    const guesses = [
      [{ letter: 'A', status: 'present' as const }],
      [{ letter: 'A', status: 'correct' as const }],
    ];
    render(<Keyboard {...defaultProps} guesses={guesses} />);
    expect(screen.getByTestId('key-A')).toHaveClass('bg-green-500');
  });

  it('prioritizes present status over absent', () => {
    const guesses = [
      [{ letter: 'B', status: 'absent' as const }],
      [{ letter: 'B', status: 'present' as const }],
    ];
    render(<Keyboard {...defaultProps} guesses={guesses} />);
    expect(screen.getByTestId('key-B')).toHaveClass('bg-yellow-500');
  });

  it('handles Turkish characters correctly', () => {
    const guesses = [
      [
        { letter: 'ç', status: 'correct' as const },
        { letter: 'ş', status: 'present' as const },
        { letter: 'ğ', status: 'absent' as const },
      ],
    ];
    render(<Keyboard {...defaultProps} guesses={guesses} />);
    
    expect(screen.getByTestId('key-Ç')).toHaveClass('bg-green-500');
    expect(screen.getByTestId('key-Ş')).toHaveClass('bg-yellow-500');
    expect(screen.getByTestId('key-Ğ')).toHaveClass('bg-gray-500');
  });

  it('handles İ and I correctly', () => {
    const guesses = [
      [
        { letter: 'İ', status: 'correct' as const },
        { letter: 'I', status: 'present' as const },
      ],
    ];
    render(<Keyboard {...defaultProps} guesses={guesses} />);
    
    expect(screen.getByTestId('key-İ')).toHaveClass('bg-green-500');
    expect(screen.getByTestId('key-I')).toHaveClass('bg-yellow-500');
  });
});
