import { useState } from 'react';
import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import FunctionInput from './FunctionInput';
import AxisControls from './AxisControls';
import CanvasSizeControls from './CanvasSizeControls';
import ExportPanel from './ExportPanel';
import PresetGallery from './PresetGallery';
import useGraphStore from '../store/graphStore';

type Section = 'functions' | 'axes' | 'canvas' | 'presets' | 'export';

export default function Sidebar() {
  const [expandedSection, setExpandedSection] = useState<Section>('functions');
  const { resetGraph, setTitle, title } = useGraphStore();

  const toggleSection = (section: Section) => {
    setExpandedSection(expandedSection === section ? 'functions' : section);
  };

  const sections: { id: Section; label: string; component: React.ReactNode }[] = [
    { id: 'functions', label: 'Functions', component: <FunctionInput /> },
    { id: 'axes', label: 'Axes & Grid', component: <AxisControls /> },
    { id: 'canvas', label: 'Canvas Size', component: <CanvasSizeControls /> },
    { id: 'presets', label: 'Templates', component: <PresetGallery /> },
    { id: 'export', label: 'Export', component: <ExportPanel /> },
  ];

  return (
    <div className="w-96 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">GraphLab</h1>
        <p className="text-sm text-gray-600">Exam-Ready Math Graphs</p>

        <div className="mt-4">
          <label className="label">Graph Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Optional title..."
            className="input-field"
          />
        </div>

        <button
          onClick={resetGraph}
          className="btn btn-secondary w-full mt-3 flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          <span>Reset Graph</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id} className="border-b border-gray-200">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900">{section.label}</span>
              {expandedSection === section.id ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedSection === section.id && (
              <div className="px-4 py-4 bg-gray-50">{section.component}</div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 text-xs text-gray-600">
        <p>GraphLab v1.0.0</p>
        <p className="mt-1">Create professional exam-ready graphs</p>
      </div>
    </div>
  );
}
