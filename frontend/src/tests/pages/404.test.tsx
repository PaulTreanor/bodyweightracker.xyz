import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import NotFoundPage from '@/pages/404';

describe('404 Page', () => {
	test('renders all the copy', () => {
		render(<NotFoundPage />);
		expect(screen.getByText('404')).toBeInTheDocument();
		expect(screen.getByText('Page Not Found')).toBeInTheDocument();
		expect(screen.getByText(/bodyweighttracker\.com only has one page/)).toBeInTheDocument();
	});

	test('renders a link back to the homepage', () => {
		render(<NotFoundPage />);
		const link = screen.getByText('Click here to return to it.');
		expect(link).toHaveAttribute('href', '/');
	});
}); 