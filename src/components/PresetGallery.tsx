import { presets } from '../lib/presets';
import useGraphStore from '../store/graphStore';

export default function PresetGallery() {
  const { loadPreset } = useGraphStore();

  const categories = ['SAT', 'ACT', 'AP', 'General'] as const;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Templates</h3>

      {categories.map((category) => {
        const categoryPresets = presets.filter((p) => p.category === category);
        if (categoryPresets.length === 0) return null;

        return (
          <div key={category}>
            <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
            <div className="space-y-2">
              {categoryPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset.config)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                >
                  <div className="font-medium text-sm">{preset.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
