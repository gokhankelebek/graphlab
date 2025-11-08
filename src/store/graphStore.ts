import { create } from 'zustand';
import { GraphState, GraphFunction, AxisConfig, GraphStyle, Point, CanvasDimensions } from '../types';

const defaultAxisConfig: AxisConfig = {
  xMin: -10,
  xMax: 10,
  yMin: -10,
  yMax: 10,
  xStep: 2,
  yStep: 2,
  showGrid: true,
  showMinorGrid: false,
  showNumbers: true,
  showAxisLabels: true,
  showFrame: false,
  xLabel: 'x',
  yLabel: 'y',
};

const defaultStyle: GraphStyle = {
  backgroundColor: '#ffffff',
  axisColor: '#000000',
  gridColor: '#e0e0e0',
  minorGridColor: '#f0f0f0',
  fontSize: 12,
  fontFamily: 'Arial, sans-serif',
  lineWidth: 2,
};

const defaultCanvasDimensions: CanvasDimensions = {
  width: 400,
  height: 400,
};

interface GraphStore extends GraphState {
  addFunction: (expression: string) => void;
  updateFunction: (id: string, updates: Partial<GraphFunction>) => void;
  removeFunction: (id: string) => void;
  updateAxisConfig: (updates: Partial<AxisConfig>) => void;
  updateStyle: (updates: Partial<GraphStyle>) => void;
  updateCanvasDimensions: (dimensions: CanvasDimensions) => void;
  addPoint: (point: Point) => void;
  removePoint: (index: number) => void;
  setTitle: (title: string) => void;
  resetGraph: () => void;
  loadPreset: (config: Partial<GraphState>) => void;
}

const useGraphStore = create<GraphStore>((set) => ({
  functions: [],
  axisConfig: defaultAxisConfig,
  style: defaultStyle,
  points: [],
  title: '',
  canvasDimensions: defaultCanvasDimensions,

  addFunction: (expression: string) =>
    set((state) => ({
      functions: [
        ...state.functions,
        {
          id: crypto.randomUUID(),
          expression,
          color: '#000000',
          visible: true,
          lineWidth: 2,
          lineStyle: 'solid',
        },
      ],
    })),

  updateFunction: (id: string, updates: Partial<GraphFunction>) =>
    set((state) => ({
      functions: state.functions.map((fn) =>
        fn.id === id ? { ...fn, ...updates } : fn
      ),
    })),

  removeFunction: (id: string) =>
    set((state) => ({
      functions: state.functions.filter((fn) => fn.id !== id),
    })),

  updateAxisConfig: (updates: Partial<AxisConfig>) =>
    set((state) => ({
      axisConfig: { ...state.axisConfig, ...updates },
    })),

  updateStyle: (updates: Partial<GraphStyle>) =>
    set((state) => ({
      style: { ...state.style, ...updates },
    })),

  updateCanvasDimensions: (dimensions: CanvasDimensions) =>
    set({ canvasDimensions: dimensions }),

  addPoint: (point: Point) =>
    set((state) => ({
      points: [...state.points, point],
    })),

  removePoint: (index: number) =>
    set((state) => ({
      points: state.points.filter((_, i) => i !== index),
    })),

  setTitle: (title: string) => set({ title }),

  resetGraph: () =>
    set({
      functions: [],
      axisConfig: defaultAxisConfig,
      style: defaultStyle,
      points: [],
      title: '',
      canvasDimensions: defaultCanvasDimensions,
    }),

  loadPreset: (config: Partial<GraphState>) =>
    set((state) => ({
      ...state,
      ...config,
      axisConfig: { ...state.axisConfig, ...(config.axisConfig || {}) },
      style: { ...state.style, ...(config.style || {}) },
    })),
}));

export default useGraphStore;
