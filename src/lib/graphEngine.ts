import { AxisConfig, GraphStyle, Point, GraphFunction } from '../types';
import { plotFunction } from './mathParser';

export class GraphEngine {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  setDimensions(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  clear(backgroundColor: string = '#ffffff'): void {
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  // Convert graph coordinates to canvas coordinates
  private toCanvasX(x: number, axisConfig: AxisConfig): number {
    const { xMin, xMax } = axisConfig;
    return ((x - xMin) / (xMax - xMin)) * this.width;
  }

  private toCanvasY(y: number, axisConfig: AxisConfig): number {
    const { yMin, yMax } = axisConfig;
    // Flip Y axis (canvas Y increases downward)
    return this.height - ((y - yMin) / (yMax - yMin)) * this.height;
  }

  drawGrid(axisConfig: AxisConfig, style: GraphStyle): void {
    const { xMin, xMax, yMin, yMax, xStep, yStep, showGrid, showMinorGrid } = axisConfig;

    if (!showGrid) return;

    this.ctx.lineWidth = 0.5;

    // Minor grid lines
    if (showMinorGrid) {
      this.ctx.strokeStyle = style.minorGridColor;
      this.ctx.setLineDash([2, 2]);

      // Vertical minor grid lines
      for (let x = Math.ceil(xMin / (xStep / 5)) * (xStep / 5); x <= xMax; x += xStep / 5) {
        if (Math.abs(x % xStep) > 0.001) {
          const canvasX = this.toCanvasX(x, axisConfig);
          this.ctx.beginPath();
          this.ctx.moveTo(canvasX, 0);
          this.ctx.lineTo(canvasX, this.height);
          this.ctx.stroke();
        }
      }

      // Horizontal minor grid lines
      for (let y = Math.ceil(yMin / (yStep / 5)) * (yStep / 5); y <= yMax; y += yStep / 5) {
        if (Math.abs(y % yStep) > 0.001) {
          const canvasY = this.toCanvasY(y, axisConfig);
          this.ctx.beginPath();
          this.ctx.moveTo(0, canvasY);
          this.ctx.lineTo(this.width, canvasY);
          this.ctx.stroke();
        }
      }
    }

    // Major grid lines
    this.ctx.strokeStyle = style.gridColor;
    this.ctx.setLineDash([]);

    // Vertical grid lines
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      if (Math.abs(x) > 0.001) { // Don't draw at origin (will be drawn as axis)
        const canvasX = this.toCanvasX(x, axisConfig);
        this.ctx.beginPath();
        this.ctx.moveTo(canvasX, 0);
        this.ctx.lineTo(canvasX, this.height);
        this.ctx.stroke();
      }
    }

    // Horizontal grid lines
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (Math.abs(y) > 0.001) {
        const canvasY = this.toCanvasY(y, axisConfig);
        this.ctx.beginPath();
        this.ctx.moveTo(0, canvasY);
        this.ctx.lineTo(this.width, canvasY);
        this.ctx.stroke();
      }
    }
  }

  drawAxes(axisConfig: AxisConfig, style: GraphStyle): void {
    const { xMin, xMax, yMin, yMax, xStep, yStep, showNumbers, showAxisLabels, xLabel, yLabel } = axisConfig;

    this.ctx.strokeStyle = style.axisColor;
    this.ctx.fillStyle = style.axisColor;
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([]);

    // X-axis
    if (yMin <= 0 && yMax >= 0) {
      const y = this.toCanvasY(0, axisConfig);
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();

      // X-axis arrow
      this.ctx.beginPath();
      this.ctx.moveTo(this.width - 10, y - 5);
      this.ctx.lineTo(this.width, y);
      this.ctx.lineTo(this.width - 10, y + 5);
      this.ctx.stroke();

      // X-axis numbers
      if (showNumbers) {
        this.ctx.font = `${style.fontSize}px ${style.fontFamily}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';

        for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
          if (Math.abs(x) > 0.001) {
            const canvasX = this.toCanvasX(x, axisConfig);
            this.ctx.fillText(Math.round(x).toString(), canvasX, y + 5);

            // Tick marks
            this.ctx.beginPath();
            this.ctx.moveTo(canvasX, y - 5);
            this.ctx.lineTo(canvasX, y + 5);
            this.ctx.stroke();
          }
        }
      }

      // X-axis label
      if (showAxisLabels && xLabel) {
        this.ctx.font = `${style.fontSize + 2}px ${style.fontFamily}`;
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(xLabel, this.width - 15, y - 10);
      }
    }

    // Y-axis
    if (xMin <= 0 && xMax >= 0) {
      const x = this.toCanvasX(0, axisConfig);
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();

      // Y-axis arrow
      this.ctx.beginPath();
      this.ctx.moveTo(x - 5, 10);
      this.ctx.lineTo(x, 0);
      this.ctx.lineTo(x + 5, 10);
      this.ctx.stroke();

      // Y-axis numbers
      if (showNumbers) {
        this.ctx.font = `${style.fontSize}px ${style.fontFamily}`;
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'middle';

        for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
          if (Math.abs(y) > 0.001) {
            const canvasY = this.toCanvasY(y, axisConfig);
            this.ctx.fillText(Math.round(y).toString(), x - 10, canvasY);

            // Tick marks
            this.ctx.beginPath();
            this.ctx.moveTo(x - 5, canvasY);
            this.ctx.lineTo(x + 5, canvasY);
            this.ctx.stroke();
          }
        }
      }

      // Y-axis label
      if (showAxisLabels && yLabel) {
        this.ctx.font = `${style.fontSize + 2}px ${style.fontFamily}`;
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(yLabel, x + 10, 15);
      }
    }

    // Origin label
    if (showNumbers && xMin <= 0 && xMax >= 0 && yMin <= 0 && yMax >= 0) {
      const originX = this.toCanvasX(0, axisConfig);
      const originY = this.toCanvasY(0, axisConfig);
      this.ctx.font = `${style.fontSize}px ${style.fontFamily}`;
      this.ctx.textAlign = 'right';
      this.ctx.textBaseline = 'top';
      this.ctx.fillText('0', originX - 5, originY + 5);
    }
  }

  drawFunction(func: GraphFunction, axisConfig: AxisConfig): void {
    if (!func.visible || !func.expression) return;

    const points = plotFunction(func.expression, axisConfig.xMin, axisConfig.xMax, 2000);

    if (points.length === 0) return;

    this.ctx.strokeStyle = func.color;
    this.ctx.lineWidth = func.lineWidth;

    // Set line style
    switch (func.lineStyle) {
      case 'dashed':
        this.ctx.setLineDash([10, 5]);
        break;
      case 'dotted':
        this.ctx.setLineDash([2, 3]);
        break;
      default:
        this.ctx.setLineDash([]);
    }

    this.ctx.beginPath();
    let isFirstPoint = true;

    for (const point of points) {
      const canvasX = this.toCanvasX(point.x, axisConfig);
      const canvasY = this.toCanvasY(point.y, axisConfig);

      // Only draw points within canvas bounds
      if (canvasY >= -100 && canvasY <= this.height + 100) {
        if (isFirstPoint) {
          this.ctx.moveTo(canvasX, canvasY);
          isFirstPoint = false;
        } else {
          this.ctx.lineTo(canvasX, canvasY);
        }
      } else {
        // Start a new path segment if we go out of bounds
        isFirstPoint = true;
      }
    }

    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  drawPoint(point: Point, axisConfig: AxisConfig, style: GraphStyle): void {
    const canvasX = this.toCanvasX(point.x, axisConfig);
    const canvasY = this.toCanvasY(point.y, axisConfig);

    this.ctx.fillStyle = style.axisColor;
    this.ctx.beginPath();
    this.ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI);
    this.ctx.fill();

    // Draw label if exists
    if (point.label) {
      this.ctx.font = `${style.fontSize}px ${style.fontFamily}`;
      this.ctx.textAlign = 'left';
      this.ctx.textBaseline = 'bottom';
      this.ctx.fillText(point.label, canvasX + 8, canvasY - 8);
    }
  }

  drawTitle(title: string, style: GraphStyle): void {
    if (!title) return;

    this.ctx.font = `bold ${style.fontSize + 4}px ${style.fontFamily}`;
    this.ctx.fillStyle = style.axisColor;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(title, this.width / 2, 10);
  }

  render(
    functions: GraphFunction[],
    axisConfig: AxisConfig,
    style: GraphStyle,
    points: Point[],
    title: string
  ): void {
    // Clear canvas
    this.clear(style.backgroundColor);

    // Draw grid first (background)
    this.drawGrid(axisConfig, style);

    // Draw axes
    this.drawAxes(axisConfig, style);

    // Draw functions
    functions.forEach((func) => this.drawFunction(func, axisConfig));

    // Draw points
    points.forEach((point) => this.drawPoint(point, axisConfig, style));

    // Draw title
    this.drawTitle(title, style);
  }
}
