import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { WeightChartTooltip } from '@/components/WeightChartToolTip';

describe('WeightChartTooltip Component', () => {
	test('renders nothing when active is false', () => {
		const { container } = render(
			<WeightChartTooltip active={false} payload={[]} />
		);
		
		expect(container.firstChild).toBeNull();
	});
	
	test('renders nothing when payload is empty', () => {
		const { container } = render(
			<WeightChartTooltip active={true} payload={[]} />
		);
		
		expect(container.firstChild).toBeNull();
	});
	
	test('renders nothing when payload is undefined', () => {
		const { container } = render(
			<WeightChartTooltip active={true} />
		);
		
		expect(container.firstChild).toBeNull();
	});
	
	test('renders tooltip correctly with valid data', () => {
		// Mock date for consistent testing
		const mockDate = new Date('2023-05-15');
		const mockTimestamp = mockDate.getTime();
		
		const mockPayload = [
			{
				value: 70.5,
				name: 'weight',
				dataKey: 'weight',
				payload: {
					date: mockTimestamp,
					weight: 70.5
				},
				color: '#8884d8'
			}
		];
		
		render(
			<WeightChartTooltip 
				active={true} 
				payload={mockPayload} 
			/>
		);
		
		// Check if weight value is displayed
		expect(screen.getByText('70.5 kg')).toBeInTheDocument();
		
		// Check if formatted date is displayed
		expect(screen.getByText('15 May 2023')).toBeInTheDocument();
	});
});