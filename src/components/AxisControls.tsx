import useGraphStore from '../store/graphStore';

export default function AxisControls() {
  const { axisConfig, updateAxisConfig } = useGraphStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Axis Configuration</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">X Min</label>
          <input
            type="number"
            value={axisConfig.xMin}
            onChange={(e) => updateAxisConfig({ xMin: Number(e.target.value) })}
            className="input-field"
          />
        </div>
        <div>
          <label className="label">X Max</label>
          <input
            type="number"
            value={axisConfig.xMax}
            onChange={(e) => updateAxisConfig({ xMax: Number(e.target.value) })}
            className="input-field"
          />
        </div>
        <div>
          <label className="label">Y Min</label>
          <input
            type="number"
            value={axisConfig.yMin}
            onChange={(e) => updateAxisConfig({ yMin: Number(e.target.value) })}
            className="input-field"
          />
        </div>
        <div>
          <label className="label">Y Max</label>
          <input
            type="number"
            value={axisConfig.yMax}
            onChange={(e) => updateAxisConfig({ yMax: Number(e.target.value) })}
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">X Step</label>
          <input
            type="number"
            step="0.1"
            value={axisConfig.xStep}
            onChange={(e) => updateAxisConfig({ xStep: Number(e.target.value) })}
            className="input-field"
          />
        </div>
        <div>
          <label className="label">Y Step</label>
          <input
            type="number"
            step="0.1"
            value={axisConfig.yStep}
            onChange={(e) => updateAxisConfig({ yStep: Number(e.target.value) })}
            className="input-field"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={axisConfig.showFrame}
            onChange={(e) => updateAxisConfig({ showFrame: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm font-semibold">Frame Only (GraphFree Style)</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={axisConfig.showGrid}
            onChange={(e) => updateAxisConfig({ showGrid: e.target.checked })}
            className="rounded"
            disabled={axisConfig.showFrame}
          />
          <span className={`text-sm ${axisConfig.showFrame ? 'text-gray-400' : ''}`}>Show Grid</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={axisConfig.showMinorGrid}
            onChange={(e) => updateAxisConfig({ showMinorGrid: e.target.checked })}
            className="rounded"
            disabled={axisConfig.showFrame}
          />
          <span className={`text-sm ${axisConfig.showFrame ? 'text-gray-400' : ''}`}>Show Minor Grid</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={axisConfig.showNumbers}
            onChange={(e) => updateAxisConfig({ showNumbers: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm">Show Numbers</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={axisConfig.showAxisLabels}
            onChange={(e) => updateAxisConfig({ showAxisLabels: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm">Show Axis Labels</span>
        </label>
      </div>

      {axisConfig.showAxisLabels && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">X Label</label>
            <input
              type="text"
              value={axisConfig.xLabel}
              onChange={(e) => updateAxisConfig({ xLabel: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Y Label</label>
            <input
              type="text"
              value={axisConfig.yLabel}
              onChange={(e) => updateAxisConfig({ yLabel: e.target.value })}
              className="input-field"
            />
          </div>
        </div>
      )}
    </div>
  );
}
