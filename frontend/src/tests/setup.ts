import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll } from 'vitest';

// Extend Window interface for Gatsby's navigate function
declare global {
	interface Window {
		___navigate: (pathname: string) => void;
	}
}

// Mock Gatsby's navigate function
window.___navigate = vi.fn();

// Add any global test setup here
beforeAll(() => {
	// Set up any global test environment
});

afterAll(() => {
	// Clean up any global test environment
}); 