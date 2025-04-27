import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import Header from '@/components/Header';

describe('Header Component', () => {
	test('renders the title correctly', () => {
		render(<Header isLoggedIn={false} handleLogout={() => {}} />);
		expect(screen.getByText('bodyweight tracker')).toBeInTheDocument();
	});

	test('does not show logout button when user is not logged in', () => {
		render(<Header isLoggedIn={false} handleLogout={() => {}} />);
		expect(screen.queryByText('Log out')).not.toBeInTheDocument();
	});

	test('shows logout button when user is logged in', () => {
		render(<Header isLoggedIn={true} handleLogout={() => {}} />);
		expect(screen.getByText('Log out')).toBeInTheDocument();
	});

	test('calls handleLogout when logout button is clicked', async () => {
		const handleLogout = vi.fn();
		const user = userEvent.setup();
		
		render(<Header isLoggedIn={true} handleLogout={handleLogout} />);
		
		await user.click(screen.getByText('Log out'));
		expect(handleLogout).toHaveBeenCalledTimes(1);
	});
}); 