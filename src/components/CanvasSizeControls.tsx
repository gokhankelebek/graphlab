import useGraphStore from '../store/graphStore';

export default function CanvasSizeControls() {
  const { canvasDimensions, updateCanvasDimensions } = useGraphStore();

  const presetSizes = [
    { label: '400×400', width: 400, height: 400 },
    { label: '600×600', width: 600, height: 600 },
    { label: '800×600', width: 800, height: 600 },
    { label: '800×800', width: 800, height: 800 },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Canvas Size</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Width (px)</label>
          <input
            type="number"
            min="200"
            max="2000"
            step="50"
            value={canvasDimensions.width}
            onChange={(e) =>
              updateCanvasDimensions({
                ...canvasDimensions,
                width: Number(e.target.value),
              })
            }
            className="input-field"
          />
        </div>
        <div>
          <label className="label">Height (px)</label>
          <input
            type="number"
            min="200"
            max="2000"
            step="50"
            value={canvasDimensions.height}
            onChange={(e) =>
              updateCanvasDimensions({
                ...canvasDimensions,
                height: Number(e.target.value),
              })
            }
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="label">Presets</label>
        <div className="grid grid-cols-2 gap-2">
          {presetSizes.map((preset) => (
            <button
              key={preset.label}
              onClick={() =>
                updateCanvasDimensions({ width: preset.width, height: preset.height })
              }
              className={`btn ${
                canvasDimensions.width === preset.width &&
                canvasDimensions.height === preset.height
                  ? 'btn-primary'
                  : 'btn-secondary'
              } text-sm`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-600">
        <p>Current size: {canvasDimensions.width} × {canvasDimensions.height} pixels</p>
      </div>
    </div>
  );
}
