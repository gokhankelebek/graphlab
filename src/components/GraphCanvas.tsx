import { useEffect, useRef } from 'react';
import { GraphEngine } from '../lib/graphEngine';
import useGraphStore from '../store/graphStore';

export default function GraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GraphEngine | null>(null);

  const { functions, axisConfig, style, points, title, canvasDimensions } = useGraphStore();

  // Initialize graph engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;

    engineRef.current = new GraphEngine(canvas);
  }, [canvasDimensions.width, canvasDimensions.height]);

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
