import { useState } from 'react';
import { Trash2, Eye, EyeOff } from 'lucide-react';
import useGraphStore from '../store/graphStore';

export default function FunctionInput() {
  const [expression, setExpression] = useState('');
  const { functions, addFunction, updateFunction, removeFunction } = useGraphStore();

  const handleAddFunction = () => {
    if (expression.trim()) {
      addFunction(expression.trim());
      setExpression('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddFunction();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-3">Functions</h3>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., x^2, sin(x), 2*x + 1"
            className="input-field flex-1"
          />
          <button onClick={handleAddFunction} className="btn btn-primary">
            Add
          </button>
        </div>

        <div className="text-xs text-gray-600 mb-4 space-y-1">
          <p>Supported: +, -, *, /, ^, sqrt(), sin(), cos(), tan(), log(), ln(), abs(), etc.</p>
          <p>Examples: x^2 - 4, sin(x), 1/x, sqrt(x), 2^x</p>
        </div>
      </div>

      <div className="space-y-2">
        {functions.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No functions added yet</p>
        ) : (
          functions.map((func) => (
            <div
              key={func.id}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded border border-gray-200"
            >
              <button
                onClick={() => updateFunction(func.id, { visible: !func.visible })}
                className="p-1 hover:bg-gray-200 rounded"
                title={func.visible ? 'Hide' : 'Show'}
              >
                {func.visible ? (
                  <Eye size={18} />
                ) : (
                  <EyeOff size={18} className="text-gray-400" />
                )}
              </button>

              <code className="flex-1 text-sm font-mono">{func.expression}</code>

              <select
                value={func.lineWidth}
                onChange={(e) =>
                  updateFunction(func.id, { lineWidth: Number(e.target.value) })
                }
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="1">Thin</option>
                <option value="2">Normal</option>
                <option value="3">Thick</option>
              </select>

              <select
                value={func.lineStyle}
                onChange={(e) =>
                  updateFunction(func.id, { lineStyle: e.target.value as any })
                }
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>

              <button
                onClick={() => removeFunction(func.id)}
                className="p-1 hover:bg-red-100 rounded text-red-600"
                title="Remove"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
