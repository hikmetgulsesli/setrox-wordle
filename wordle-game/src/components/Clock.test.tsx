import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Clock } from './Clock';

describe('Clock', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the clock component', () => {
    render(<Clock />);
    expect(screen.getByTestId('clock')).toBeInTheDocument();
  });

  it('displays current time', () => {
    const mockDate = new Date(2024, 0, 15, 14, 30, 45);
    vi.setSystemTime(mockDate);

    render(<Clock />);
    expect(screen.getByTestId('clock-time')).toHaveTextContent('14:30:45');
  });

  it('displays current date in DD.MM.YYYY format', () => {
    const mockDate = new Date(2024, 0, 15, 14, 30, 45);
    vi.setSystemTime(mockDate);

    render(<Clock />);
    expect(screen.getByTestId('clock-date')).toHaveTextContent('15.01.2024');
  });

  it('updates time every second', () => {
    const mockDate = new Date(2024, 0, 15, 14, 30, 45);
    vi.setSystemTime(mockDate);

    render(<Clock />);
    expect(screen.getByTestId('clock-time')).toHaveTextContent('14:30:45');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('clock-time')).toHaveTextContent('14:30:46');

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByTestId('clock-time')).toHaveTextContent('14:30:48');
  });

  it('applies custom className', () => {
    render(<Clock className="custom-class" />);
    expect(screen.getByTestId('clock')).toHaveClass('custom-class');
  });
});
