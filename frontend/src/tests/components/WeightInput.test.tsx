import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import WeightInput from '@/components/WeightInput';

describe('WeightInput Component', () => {
	test('renders input form correctly', () => {
		render(<WeightInput onAddWeight={() => {}} />);
		
		expect(screen.getByLabelText('What is your weight today?')).toBeInTheDocument();
		expect(screen.getByRole('spinbutton')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Add Weight' })).toBeInTheDocument();
	});
	
	test('updates input value when user types', async () => {
		const user = userEvent.setup();
		render(<WeightInput onAddWeight={() => {}} />);
		
		const input = screen.getByRole('spinbutton');
		await user.type(input, '75.5');
		
		expect(input).toHaveValue(75.5);
	});
	
	test('calls onAddWeight with correct value when form is submitted', async () => {
		const onAddWeightMock = vi.fn();
		const user = userEvent.setup();
		render(<WeightInput onAddWeight={onAddWeightMock} />);
		
		const input = screen.getByRole('spinbutton');
		await user.type(input, '68.2');
		
		const button = screen.getByRole('button', { name: 'Add Weight' });
		await user.click(button);
		
		expect(onAddWeightMock).toHaveBeenCalledWith(68.2);
	});
	
	test('resets input field after form submission', async () => {
		const user = userEvent.setup();
		render(<WeightInput onAddWeight={() => {}} />);
		
		const input = screen.getByRole('spinbutton');
		await user.type(input, '80');
		
		const button = screen.getByRole('button', { name: 'Add Weight' });
		await user.click(button);
		
		expect(input).toHaveValue(null);
	});
});