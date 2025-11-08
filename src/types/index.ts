export interface GraphFunction {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
  lineWidth: number;
  lineStyle: 'solid' | 'dashed' | 'dotted';
}

export interface AxisConfig {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xStep: number;
  yStep: number;
  showGrid: boolean;
  showMinorGrid: boolean;
  showNumbers: boolean;
  showAxisLabels: boolean;
  xLabel: string;
  yLabel: string;
}

export interface GraphStyle {
  backgroundColor: string;
  axisColor: string;
  gridColor: string;
  minorGridColor: string;
  fontSize: number;
  fontFamily: string;
  lineWidth: number;
}

export interface Point {
  x: number;
  y: number;
  label?: string;
}

export interface CanvasDimensions {
  width: number;
  height: number;
}

export interface GraphState {
  functions: GraphFunction[];
  axisConfig: AxisConfig;
  style: GraphStyle;
  points: Point[];
  title: string;
  canvasDimensions: CanvasDimensions;
}

export type ExportFormat = 'png' | 'svg' | 'pdf';

export interface Preset {
  id: string;
  name: string;
  description: string;
  category: 'SAT' | 'ACT' | 'AP' | 'General';
  config: Partial<GraphState>;
}
