import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

export class ExportUtils {
  static exportToPNG(canvas: HTMLCanvasElement, filename: string = 'graph.png'): void {
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, filename);
      }
    });
  }

  static exportToSVG(canvas: HTMLCanvasElement, filename: string = 'graph.svg'): void {
    // For SVG export, we need to recreate the drawing using SVG elements
    // This is a simplified version - for full SVG support, consider using a library
    const svgData = this.canvasToSVG(canvas);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    saveAs(blob, filename);
  }

  static exportToPDF(canvas: HTMLCanvasElement, filename: string = 'graph.pdf'): void {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(filename);
  }

  static copyToClipboard(canvas: HTMLCanvasElement): Promise<void> {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          navigator.clipboard
            .write([item])
            .then(() => resolve())
            .catch((error) => reject(error));
        } else {
          reject(new Error('Failed to create blob'));
        }
      });
    });
  }

  private static canvasToSVG(canvas: HTMLCanvasElement): string {
    const width = canvas.width;
    const height = canvas.height;
    const imgData = canvas.toDataURL('image/png');

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <image width="${width}" height="${height}" xlink:href="${imgData}"/>
</svg>`;
  }

  static getHighResolutionCanvas(
    originalCanvas: HTMLCanvasElement,
    scale: number = 2
  ): HTMLCanvasElement {
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = originalCanvas.width * scale;
    scaledCanvas.height = originalCanvas.height * scale;

    const ctx = scaledCanvas.getContext('2d');
    if (ctx) {
      ctx.scale(scale, scale);
      ctx.drawImage(originalCanvas, 0, 0);
    }

    return scaledCanvas;
  }
}
