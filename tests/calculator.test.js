import { describe, it, expect } from 'vitest';
import Calculator from '../js/calculator.js';

describe('Calculator', () => {
  describe('Unit Conversions', () => {
    it('toKg converts properly', () => {
      expect(Calculator.toKg(100, 'kg')).toBe(100);
      expect(Calculator.toKg(220.46226218, 'lb')).toBeCloseTo(100, 5);
    });

    it('fromKg converts properly', () => {
      expect(Calculator.fromKg(100, 'kg')).toBe(100);
      expect(Calculator.fromKg(100, 'lb')).toBeCloseTo(220.46226218, 5);
    });

    it('roundWeight rounds properly for kg (2.5 steps)', () => {
      expect(Calculator.roundWeight(101, 'kg')).toBe(100);
      expect(Calculator.roundWeight(101.25, 'kg')).toBe(102.5);
      expect(Calculator.roundWeight(102.4, 'kg')).toBe(102.5);
    });

    it('roundWeight rounds properly for lb (5 steps)', () => {
      expect(Calculator.roundWeight(222, 'lb')).toBe(220);
      expect(Calculator.roundWeight(223, 'lb')).toBe(225);
      expect(Calculator.roundWeight(226, 'lb')).toBe(225);
    });
  });

  describe('calculate1RM', () => {
    it('returns 0 for invalid inputs', () => {
      expect(Calculator.calculate1RM(0, 5)).toBe(0);
      expect(Calculator.calculate1RM(100, 0)).toBe(0);
    });

    it('returns weight when reps is 1', () => {
      expect(Calculator.calculate1RM(100, 1)).toBe(100);
    });

    it('calculates using epley formula', () => {
      expect(Calculator.calculate1RM(100, 5, 'epley')).toBeCloseTo(116.7, 1);
    });

    it('calculates using brzycki formula', () => {
      expect(Calculator.calculate1RM(100, 5, 'brzycki')).toBeCloseTo(112.5, 1);
    });

    it('calculates using lombardi formula', () => {
      expect(Calculator.calculate1RM(100, 5, 'lombardi')).toBeCloseTo(117.5, 1);
    });
  });

  describe('calculateRIR', () => {
    it('returns 0 for invalid inputs', () => {
      const result = Calculator.calculateRIR(0, 5, 0, 5, 0, 'kg');
      expect(result.est1RM).toBe(0);
      expect(result.nextWeight).toBe(0);
    });

    it('calculates expected RIR weight for kg', () => {
      // weight = 100, reps = 5, rir = 1
      // repsToFailure = 6
      // est1RM = 100 * (1 + 6/30) = 120
      // targetReps = 5, targetRIR = 0
      // targetRepsToFailure = 5
      // nextWeightRaw = 120 / (1 + 5/30) = 120 / 1.1666... = 102.857...
      // roundWeight(102.857, 'kg') = 102.5

      const result = Calculator.calculateRIR(100, 5, 1, 5, 0, 'kg');
      expect(result.est1RM).toBe(120);
      expect(result.nextWeight).toBe(102.5);
    });
  });
});
