import { describe, it, expect } from 'vitest';
import Calculator from '../js/calculator.js';

describe('Calculator', () => {
    describe('generateAdvancedWarmUp', () => {
        // Mocks
        const purposesObj = {
            jointPrep: 'Joint Prep',
            activation: 'Activation',
            skill: 'Skill',
            acclimatization: 'Acclimatization',
            potentiation: 'Potentiation'
        };

        const cuesObj = {
            jointPrep: 'Move through full ROM',
            activation: 'Explosive reps',
            skill: 'Focus on technique',
            acclimatization: 'Feel the weight',
            potentiation: 'Move fast'
        };

        it('returns empty array when inputs are invalid', () => {
            expect(Calculator.generateAdvancedWarmUp('Squat', 0, 5, cuesObj, purposesObj, 'kg')).toEqual([]);
            expect(Calculator.generateAdvancedWarmUp('Squat', null, 5, cuesObj, purposesObj, 'kg')).toEqual([]);
            expect(Calculator.generateAdvancedWarmUp('Squat', 100, 0, cuesObj, purposesObj, 'kg')).toEqual([]);
        });

        it('generates low rep warmup (< 6 reps) correctly in kg', () => {
            const plan = Calculator.generateAdvancedWarmUp('Squat', 100, 5, cuesObj, purposesObj, 'kg');

            expect(plan.length).toBe(5);

            // First set should be standard bar 20kg
            expect(plan[0]).toEqual({
                stage: 1,
                purposeStr: 'Joint Prep',
                percent: '-',
                weight: 20,
                reps: '10-15',
                notes: 'Move through full ROM'
            });

            // 45% of 100 is 45, rounded to nearest 2.5 is 45
            expect(plan[1]).toEqual({
                stage: 2,
                purposeStr: 'Activation',
                percent: 45,
                weight: 45,
                reps: 5,
                notes: 'Explosive reps'
            });

            // 65% of 100 is 65, rounded to nearest 2.5 is 65
            expect(plan[2]).toEqual({
                stage: 3,
                purposeStr: 'Skill',
                percent: 65,
                weight: 65,
                reps: 3,
                notes: 'Focus on technique'
            });

            // 80% of 100 is 80, rounded to nearest 2.5 is 80
            expect(plan[3]).toEqual({
                stage: 4,
                purposeStr: 'Acclimatization',
                percent: 80,
                weight: 80,
                reps: 2,
                notes: 'Feel the weight'
            });

            // 90% of 100 is 90, rounded to nearest 2.5 is 90
            expect(plan[4]).toEqual({
                stage: 5,
                purposeStr: 'Potentiation',
                percent: 90,
                weight: 90,
                reps: 1,
                notes: 'Move fast'
            });
        });

        it('generates high rep warmup (>= 6 reps) correctly in lbs', () => {
            const plan = Calculator.generateAdvancedWarmUp('Squat', 200, 8, cuesObj, purposesObj, 'lb');

            expect(plan.length).toBe(5);

            // First set should be standard bar 45lbs
            expect(plan[0]).toEqual({
                stage: 1,
                purposeStr: 'Joint Prep',
                percent: '-',
                weight: 45,
                reps: '10-15',
                notes: 'Move through full ROM'
            });

            // 45% of 200 is 90, rounded to nearest 5 is 90
            expect(plan[1]).toEqual({
                stage: 2,
                purposeStr: 'Activation',
                percent: 45,
                weight: 90,
                reps: 8, // Reps change for higher rep main sets
                notes: 'Explosive reps'
            });

            // 65% of 200 is 130, rounded to nearest 5 is 130
            expect(plan[2]).toEqual({
                stage: 3,
                purposeStr: 'Skill',
                percent: 65,
                weight: 130,
                reps: 5, // Reps change for higher rep main sets
                notes: 'Focus on technique'
            });
        });

        it('handles rounding logic correctly', () => {
            // For kg: 105 * 0.45 = 47.25 -> round to nearest 2.5 is 47.5
            const planKg = Calculator.generateAdvancedWarmUp('Squat', 105, 5, cuesObj, purposesObj, 'kg');
            expect(planKg[1].weight).toBe(47.5);

            // For lb: 205 * 0.45 = 92.25 -> round to nearest 5 is 90 (well, 92.25/5 = 18.45 -> 18 * 5 = 90)
            const planLb = Calculator.generateAdvancedWarmUp('Squat', 205, 5, cuesObj, purposesObj, 'lb');
            expect(planLb[1].weight).toBe(90);
        });
    });
});
