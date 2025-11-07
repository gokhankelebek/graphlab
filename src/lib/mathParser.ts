import { parse, MathNode } from 'mathjs';

export class MathParser {
  private compiledExpression: MathNode | null = null;

  constructor(private expression: string) {
    this.compile();
  }

  private compile(): void {
    try {
      // Replace common shortcuts
      let expr = this.expression
        .replace(/\^/g, '^')
        .replace(/π/g, 'pi')
        .replace(/√/g, 'sqrt');

      this.compiledExpression = parse(expr);
    } catch (error) {
      console.error('Error parsing expression:', error);
      this.compiledExpression = null;
    }
  }

  evaluate(x: number): number | null {
    if (!this.compiledExpression) return null;

    try {
      const result = this.compiledExpression.evaluate({ x });

      if (typeof result === 'number' && isFinite(result)) {
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  isValid(): boolean {
    return this.compiledExpression !== null;
  }

  static evaluateExpression(expression: string, x: number): number | null {
    const parser = new MathParser(expression);
    return parser.evaluate(x);
  }
}

export function plotFunction(
  expression: string,
  xMin: number,
  xMax: number,
  samples: number = 1000
): Array<{ x: number; y: number }> {
  const parser = new MathParser(expression);
  const points: Array<{ x: number; y: number }> = [];

  if (!parser.isValid()) {
    return points;
  }

  const step = (xMax - xMin) / samples;

  for (let i = 0; i <= samples; i++) {
    const x = xMin + i * step;
    const y = parser.evaluate(x);

    if (y !== null) {
      points.push({ x, y });
    }
  }

  return points;
}
