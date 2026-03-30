import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Key } from './Key';

describe('Key', () => {
  it('renders letter key correctly', () => {
    render(<Key value="A" onClick={() => {}} />);
    expect(screen.getByTestId('key-A')).toBeInTheDocument();
    expect(screen.getByTestId('key-A')).toHaveTextContent('A');
  });

  it('renders BACKSPACE as ⌫ symbol', () => {
    render(<Key value="BACKSPACE" onClick={() => {}} />);
    expect(screen.getByTestId('key-BACKSPACE')).toHaveTextContent('⌫');
  });

  it('calls onClick with value when clicked', () => {
    const handleClick = vi.fn();
    render(<Key value="A" onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('key-A'));
    expect(handleClick).toHaveBeenCalledWith('A');
  });

  it('applies correct status class for correct status', () => {
    render(<Key value="A" status="correct" onClick={() => {}} />);
    expect(screen.getByTestId('key-A')).toHaveClass('bg-green-500');
  });

  it('applies correct status class for present status', () => {
    render(<Key value="A" status="present" onClick={() => {}} />);
    expect(screen.getByTestId('key-A')).toHaveClass('bg-yellow-500');
  });

  it('applies correct status class for absent status', () => {
    render(<Key value="A" status="absent" onClick={() => {}} />);
    expect(screen.getByTestId('key-A')).toHaveClass('bg-gray-500');
  });

  it('applies correct status class for empty status', () => {
    render(<Key value="A" status="empty" onClick={() => {}} />);
    expect(screen.getByTestId('key-A')).toHaveClass('bg-gray-200');
  });

  it('applies wide class for wide keys', () => {
    render(<Key value="ENTER" isWide onClick={() => {}} />);
    expect(screen.getByTestId('key-ENTER')).toHaveClass('w-16');
  });

  it('has active scale animation class', () => {
    render(<Key value="A" onClick={() => {}} />);
    expect(screen.getByTestId('key-A')).toHaveClass('active:scale-95');
  });
});
