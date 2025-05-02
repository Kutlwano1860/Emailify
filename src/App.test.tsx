import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from './App';

test('renders Emailify heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Emailify/i);
  expect(linkElement).toBeInTheDocument();
});
