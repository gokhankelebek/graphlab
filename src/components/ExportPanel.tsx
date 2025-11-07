import { useState } from 'react';
import { Copy, FileImage, FileType, FileText } from 'lucide-react';
import { ExportUtils } from '../lib/exportUtils';

export default function ExportPanel() {
  const [copied, setCopied] = useState(false);

  const getCanvas = (): HTMLCanvasElement | null => {
    return document.querySelector('canvas');
  };

  const handleExportPNG = () => {
    const canvas = getCanvas();
    if (canvas) {
      ExportUtils.exportToPNG(canvas, 'graph.png');
    }
  };

  const handleExportSVG = () => {
    const canvas = getCanvas();
    if (canvas) {
      ExportUtils.exportToSVG(canvas, 'graph.svg');
    }
  };

  const handleExportPDF = () => {
    const canvas = getCanvas();
    if (canvas) {
      ExportUtils.exportToPDF(canvas, 'graph.pdf');
    }
  };

  const handleCopyToClipboard = async () => {
    const canvas = getCanvas();
    if (canvas) {
      try {
        await ExportUtils.copyToClipboard(canvas);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        alert('Failed to copy to clipboard. Please try using the PNG export instead.');
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Export</h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleExportPNG}
          className="btn btn-secondary flex items-center justify-center gap-2"
        >
          <FileImage size={18} />
          <span>PNG</span>
        </button>

        <button
          onClick={handleExportSVG}
          className="btn btn-secondary flex items-center justify-center gap-2"
        >
          <FileType size={18} />
          <span>SVG</span>
        </button>

        <button
          onClick={handleExportPDF}
          className="btn btn-secondary flex items-center justify-center gap-2"
        >
          <FileText size={18} />
          <span>PDF</span>
        </button>

        <button
          onClick={handleCopyToClipboard}
          className="btn btn-secondary flex items-center justify-center gap-2"
        >
          <Copy size={18} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      <div className="text-xs text-gray-600 space-y-1 pt-2">
        <p>• PNG: High-quality raster image</p>
        <p>• SVG: Scalable vector graphic</p>
        <p>• PDF: Print-ready document</p>
        <p>• Copy: Copy image to clipboard</p>
      </div>
    </div>
  );
}
