import { describe, test, expect, vi, beforeEach } from 'vitest';
import { formatDate, exportToCsv } from '@/utils/dataHistoryViewerUtils';
import type { WeightEntry } from '@/types';

describe('dataHistoryViewerUtils', () => {
	describe('formatDate', () => {
		test('formats date string correctly', () => {
			expect(formatDate('2023-05-15')).toBe('May 15, 2023');
			expect(formatDate('2023-12-31')).toBe('December 31, 2023');
			expect(formatDate('2022-01-01')).toBe('January 1, 2022');
		});
	});

	describe('exportToCsv', () => {
		const mockData: WeightEntry[] = [
			{ date: '2023-05-15', weight: 70.5 },
			{ date: '2023-05-10', weight: 71.2 },
			{ date: '2023-05-20', weight: 70.1 }
		];
		
		let setIsExportingMock: ReturnType<typeof vi.fn>;
		let createElementSpy: ReturnType<typeof vi.spyOn>;
		let appendChildSpy: ReturnType<typeof vi.spyOn>;
		let removeChildSpy: ReturnType<typeof vi.spyOn>;
		let clickSpy: ReturnType<typeof vi.fn>;
		let mockLink: { href: string; setAttribute: ReturnType<typeof vi.fn>; click: ReturnType<typeof vi.fn> };
		let originalBlob: typeof Blob;
		
		beforeEach(() => {
			// Save original Blob implementation
			originalBlob = global.Blob;
			
			// Mock Blob
			global.Blob = vi.fn().mockImplementation((content, options) => ({
				content,
				options,
				text: () => Promise.resolve(content[0]),
				size: content[0].length,
				type: options.type
			})) as unknown as typeof Blob;
			
			// Mock Date to make tests consistent
			vi.useFakeTimers();
			vi.setSystemTime(new Date('2023-05-25'));
			
			setIsExportingMock = vi.fn();
			clickSpy = vi.fn();
			
			// Create mock link element
			mockLink = {
				href: '',
				setAttribute: vi.fn(),
				click: clickSpy
			};
			
			// Mock DOM methods
			createElementSpy = vi.spyOn(document, 'createElement').mockImplementation(() => mockLink as unknown as HTMLElement);
			appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => null);
			removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(() => null);
			
			// Mock URL.createObjectURL and revokeObjectURL
			global.URL.createObjectURL = vi.fn().mockReturnValue('mock-url');
			global.URL.revokeObjectURL = vi.fn();
		});
		
		afterEach(() => {
			vi.useRealTimers();
			vi.restoreAllMocks();
			global.Blob = originalBlob;
		});
		
		test('sets isExporting to true at start and false at end', () => {
			exportToCsv({ setIsExporting: setIsExportingMock, data: mockData });
			
			expect(setIsExportingMock).toHaveBeenCalledTimes(2);
			expect(setIsExportingMock).toHaveBeenNthCalledWith(1, true);
			expect(setIsExportingMock).toHaveBeenNthCalledWith(2, false);
		});
		
		test('creates and downloads a CSV file with correct content', () => {
			exportToCsv({ setIsExporting: setIsExportingMock, data: mockData });
			
			// Check if Blob was created with the correct content
			expect(global.Blob).toHaveBeenCalledTimes(1);
			const blobCall = (global.Blob as ReturnType<typeof vi.fn>).mock.calls[0];
			const blobContent = blobCall[0][0];
			
			const expectedContent = 'Date,Weight (kg)\n2023-05-20,70.1\n2023-05-15,70.5\n2023-05-10,71.2';
			expect(blobContent).toBe(expectedContent);
			expect(blobCall[1]).toEqual({ type: 'text/csv;charset=utf-8' });
			
			// Verify download link was created correctly
			expect(createElementSpy).toHaveBeenCalledWith('a');
			expect(mockLink.href).toBe('mock-url');
			expect(mockLink.setAttribute).toHaveBeenCalledWith('download', 'weight-data-2023-05-25.csv');
			
			// Verify link was clicked and removed
			expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
			expect(clickSpy).toHaveBeenCalled();
			expect(removeChildSpy).toHaveBeenCalledWith(mockLink);
			expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
		});
		
		test('sorts data by date in descending order in CSV', () => {
			const unsortedData: WeightEntry[] = [
				{ date: '2023-04-01', weight: 72.0 },
				{ date: '2023-06-01', weight: 69.5 },
				{ date: '2023-05-01', weight: 71.0 }
			];
			
			exportToCsv({ setIsExporting: setIsExportingMock, data: unsortedData });
			
			const blobCall = (global.Blob as ReturnType<typeof vi.fn>).mock.calls[0];
			const blobContent = blobCall[0][0];
			
			// Verify dates are sorted in descending order
			const expectedContent = 'Date,Weight (kg)\n2023-06-01,69.5\n2023-05-01,71\n2023-04-01,72';
			expect(blobContent).toBe(expectedContent);
		});
		
		test('handles errors gracefully', () => {
			vi.spyOn(document, 'createElement').mockImplementation(() => {
				throw new Error('Mock error');
			});
			
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			
			exportToCsv({ setIsExporting: setIsExportingMock, data: mockData });
			
			expect(consoleSpy).toHaveBeenCalledWith('Error exporting CSV:', expect.any(Error));
			expect(setIsExportingMock).toHaveBeenNthCalledWith(2, false);
		});
	});
});