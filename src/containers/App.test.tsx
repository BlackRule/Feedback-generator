import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Feedback link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Feedback/i);
  expect(linkElement).toBeInTheDocument();
});
