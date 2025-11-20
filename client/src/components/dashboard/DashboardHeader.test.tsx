import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardHeader } from './DashboardHeader';

describe('DashboardHeader', () => {
  it('renders the logo with correct attributes', () => {
    render(<DashboardHeader />);

    const logo = screen.getByAltText('logo');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');
  });

  it('renders the theme toggle button', () => {
    render(<DashboardHeader />);

    const themeButton = screen.getByTitle(/Toggle Dark Mode/i);

    expect(themeButton).toBeInTheDocument();
  });
});
