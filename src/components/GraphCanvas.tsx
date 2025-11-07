import { useEffect, useRef } from 'react';
import { GraphEngine } from '../lib/graphEngine';
import useGraphStore from '../store/graphStore';

interface GraphCanvasProps {
  width?: number;
  height?: number;
}

export default function GraphCanvas({ width = 800, height = 600 }: GraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GraphEngine | null>(null);

  const { functions, axisConfig, style, points, title } = useGraphStore();

  // Initialize graph engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    engineRef.current = new GraphEngine(canvas);
  }, [width, height]);

  // Render graph whenever state changes
  useEffect(() => {
    if (!engineRef.current) return;

    engineRef.current.render(functions, axisConfig, style, points, title);
  }, [functions, axisConfig, style, points, title]);

  return (
    <div className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm">
      <canvas
        ref={canvasRef}
        className="border border-gray-300 rounded"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
