const {
  simpleGenerator,
  countdownGenerator,
  fibonacciGenerator,
  delegatingGenerator,
  interactiveGenerator
} = require('../starter-code/generators');

describe('Generator Basics Kata', () => {
  describe('Exercise 1: simpleGenerator', () => {
    it('should yield the correct sequence', () => {
      const gen = simpleGenerator();
      
      expect(gen.next()).toEqual({ value: "Don't", done: false });
      expect(gen.next()).toEqual({ value: "Panic", done: false });
      expect(gen.next()).toEqual({ value: 42, done: false });
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });
  });

  describe('Exercise 2: countdownGenerator', () => {
    it('should count down from 3 to 1', () => {
      const gen = countdownGenerator(3);
      
      expect(gen.next()).toEqual({ value: 3, done: false });
      expect(gen.next()).toEqual({ value: 2, done: false });
      expect(gen.next()).toEqual({ value: 1, done: false });
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });

    it('should handle countdown from 1', () => {
      const gen = countdownGenerator(1);
      
      expect(gen.next()).toEqual({ value: 1, done: false });
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });

    it('should handle zero or negative numbers', () => {
      const gen = countdownGenerator(0);
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });
  });

  describe('Exercise 3: fibonacciGenerator', () => {
    it('should generate the first 8 fibonacci numbers', () => {
      const gen = fibonacciGenerator();
      const expected = [0, 1, 1, 2, 3, 5, 8, 13];
      
      for (const num of expected) {
        expect(gen.next()).toEqual({ value: num, done: false });
      }
    });

    it('should continue generating indefinitely', () => {
      const gen = fibonacciGenerator();
      
      // Skip first 10
      for (let i = 0; i < 10; i++) {
        gen.next();
      }
      
      // 11th fibonacci number is 55
      expect(gen.next()).toEqual({ value: 55, done: false });
    });
  });

  describe('Exercise 4: delegatingGenerator', () => {
    it('should yield values from both generators', () => {
      const gen = delegatingGenerator();
      
      expect(gen.next()).toEqual({ value: 'Hello', done: false });
      expect(gen.next()).toEqual({ value: 'from', done: false });
      expect(gen.next()).toEqual({ value: 'nested', done: false });
      expect(gen.next()).toEqual({ value: 'generator', done: false });
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });
  });

  describe('Exercise 5: interactiveGenerator', () => {
    it('should receive and transform values', () => {
      const gen = interactiveGenerator();
      
      // First yield
      expect(gen.next()).toEqual({ value: 'Ready?', done: false });
      
      // Send 10, expect 20 (doubled)
      expect(gen.next(10)).toEqual({ value: 20, done: false });
      
      // Send 5, expect 15 (tripled)
      expect(gen.next(5)).toEqual({ value: 15, done: false });
      
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });
  });

  describe('Bonus: Generator iteration', () => {
    it('should be iterable with for...of', () => {
      const gen = countdownGenerator(3);
      const values = [];
      
      for (const value of gen) {
        values.push(value);
      }
      
      expect(values).toEqual([3, 2, 1]);
    });

    it('should work with spread operator', () => {
      const gen = countdownGenerator(3);
      const values = [...gen];
      
      expect(values).toEqual([3, 2, 1]);
    });
  });
});