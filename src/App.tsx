import Sidebar from './components/Sidebar';
import GraphCanvas from './components/GraphCanvas';

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <GraphCanvas />

          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Quick Start Guide</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>1. Add a function:</strong> Enter a mathematical expression (e.g., x^2, sin(x)) and click "Add"</p>
              <p><strong>2. Customize axes:</strong> Adjust the axis ranges and grid settings</p>
              <p><strong>3. Adjust canvas size:</strong> Change plot dimensions (default 400×400 pixels)</p>
              <p><strong>4. Use templates:</strong> Select from SAT, ACT, or AP exam-style presets</p>
              <p><strong>5. Export:</strong> Download as PNG, SVG, or PDF for printing</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Example Functions</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <code className="bg-white px-2 py-1 rounded">x^2 - 4</code>
              <code className="bg-white px-2 py-1 rounded">sin(x)</code>
              <code className="bg-white px-2 py-1 rounded">2*x + 3</code>
              <code className="bg-white px-2 py-1 rounded">sqrt(x)</code>
              <code className="bg-white px-2 py-1 rounded">1/x</code>
              <code className="bg-white px-2 py-1 rounded">abs(x)</code>
              <code className="bg-white px-2 py-1 rounded">log(x)</code>
              <code className="bg-white px-2 py-1 rounded">2^x</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
