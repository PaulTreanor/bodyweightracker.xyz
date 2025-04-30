import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { WeightChart } from '@/components/WeightChart';
import * as weightChartUtils from '@/utils/weightChartUtils';
import type { WeightEntry } from '@/types';

// Mock ResizeObserver which is used by recharts but not available in jsdom
class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}

// Add ResizeObserver to the global scope
global.ResizeObserver = ResizeObserverMock;

// Mock the html-to-image module which is used by weightChartUtils
vi.mock('html-to-image', () => ({
	toPng: vi.fn().mockResolvedValue('mock-image-url'),
}));

// Mock the createElement and click for download functionality
global.URL.createObjectURL = vi.fn(() => 'mock-url');
global.URL.revokeObjectURL = vi.fn();

describe('WeightChart Component', () => {
	const mockData: WeightEntry[] = [
		{ date: '2023-01-15', weight: 70.5 },
		{ date: '2023-02-01', weight: 71.2 },
		{ date: '2023-02-15', weight: 70.8 },
		{ date: '2023-03-01', weight: 70.3 },
		{ date: '2023-03-15', weight: 69.9 },
		{ date: '2023-04-01', weight: 69.5 },
		{ date: '2023-04-15', weight: 69.2 },
		{ date: '2023-05-01', weight: 68.7 },
		{ date: '2023-05-15', weight: 68.5 },
	];

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2023-05-30'));
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	test('renders chart with title and time selector buttons', () => {
		render(<WeightChart data={mockData} />);
		
		// Verify title is displayed
		expect(screen.getByText('Weight Trend')).toBeInTheDocument();
		
		// Verify time selector buttons are present
		expect(screen.getByRole('button', { name: /3 months/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /12 months/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /all time/i })).toBeInTheDocument();
		
		// Verify download button is present
		expect(screen.getByRole('button', { name: /save chart as image/i })).toBeInTheDocument();
	});

	test('renders chart with empty data', () => {
		render(<WeightChart data={[]} />);
		
		expect(screen.getByText('Weight Trend')).toBeInTheDocument();
	});

	test('shows 3 months data by default', async () => {
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		render(<WeightChart data={mockData} />);
		
		expect(screen.getByRole('button', { name: /3 months/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /12 months/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /all time/i })).toBeInTheDocument();
	});

	test('renders chart container', () => {
		// Test with empty data
		render(<WeightChart data={[]} />);
		expect(document.querySelector('.chart-container')).toBeInTheDocument();
		
		// Test with single data point
		const singleDataPoint = [{ date: '2023-05-15', weight: 70.5 }];
		render(<WeightChart data={singleDataPoint} />);
		expect(document.querySelector('.chart-container')).toBeInTheDocument();
	});

	test('has download button', () => {
		render(<WeightChart data={mockData} />);
		
		const downloadButton = screen.getByRole('button', { name: /save chart as image/i });
		expect(downloadButton).toBeInTheDocument();
	});
});