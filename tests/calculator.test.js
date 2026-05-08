import Calculator from '../js/calculator.js';

describe('Calculator.calculate1RM Edge Cases', () => {
    // Edge Case: missing or falsy values
    it('returns 0 when weight or reps are falsy', () => {
        expect(Calculator.calculate1RM(0, 5)).toBe(0);
        expect(Calculator.calculate1RM(100, 0)).toBe(0);
        expect(Calculator.calculate1RM('', 5)).toBe(0);
        expect(Calculator.calculate1RM(100, null)).toBe(0);
        expect(Calculator.calculate1RM(undefined, undefined)).toBe(0);
    });

    // Edge Case: 1 rep
    it('returns the exact weight when reps is 1', () => {
        expect(Calculator.calculate1RM(100, 1)).toBe(100);
        expect(Calculator.calculate1RM(225, 1)).toBe(225);
        expect(Calculator.calculate1RM('315', '1')).toBe(315); // Tests input parsing as well
    });

    // Parsing checks
    it('parses string inputs correctly and returns the correct 1RM', () => {
        // epley formula: 100 * (1 + 5/30) = 116.666... -> 116.7
        expect(Calculator.calculate1RM('100', '5')).toBe(116.7);
    });

    // NaN checks
    it('returns 0 when inputs evaluate to NaN', () => {
        expect(Calculator.calculate1RM('abc', 5)).toBe(0);
        expect(Calculator.calculate1RM(100, 'def')).toBe(0);
    });

    // Negative inputs handling
    it('handles negative inputs gracefully', () => {
        // The current implementation allows negative inputs and returns negative values or NaN
        // We will just verify the current behaviour is deterministic without causing exceptions
        expect(Calculator.calculate1RM(-100, 5)).toBe(-116.7);
        expect(Calculator.calculate1RM(100, -5)).toBe(83.3);
    });
});
