# GraphLab - Exam-Ready Math Graph Creator

A state-of-the-art, professional math graph creator designed specifically for creating exam-ready graphs for SAT, ACT, AP, and other standardized tests. Unlike exploratory tools like Desmos, GraphLab focuses on creating clean, publication-quality, black-and-white graphs perfect for test materials.

## Features

### Core Functionality
- **Canvas-based rendering** for precise, exam-quality output
- **Multiple function types**: Linear, quadratic, polynomial, trigonometric, exponential, logarithmic
- **Mathematical expression parser** powered by Math.js
- **Real-time graph updates** as you adjust parameters

### Customization
- **Flexible axis configuration**: Adjust ranges, steps, labels
- **Grid customization**: Major and minor grid lines
- **Multiple line styles**: Solid, dashed, dotted
- **Variable line thickness** for emphasis
- **Graph titles** and axis labels

### Export Options
- **PNG Export**: High-resolution raster images
- **SVG Export**: Scalable vector graphics
- **PDF Export**: Print-ready documents
- **Copy to Clipboard**: Quick sharing

### Templates & Presets
Pre-configured templates for:
- **SAT-style** graphs (linear and quadratic)
- **ACT-style** coordinate planes
- **AP Calculus** exam graphs
- **General purpose** templates (unit circle, wide view)

## Technology Stack

- **React 18** + **TypeScript** - Modern, type-safe UI
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first styling
- **Math.js** - Mathematical expression parsing
- **Zustand** - Lightweight state management
- **jsPDF** - PDF generation
- **HTML5 Canvas API** - High-quality rendering

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### 1. Adding Functions

Enter mathematical expressions in the function input field:

```
Examples:
- Linear: 2*x + 3
- Quadratic: x^2 - 4
- Trigonometric: sin(x), cos(x), tan(x)
- Exponential: 2^x, e^x
- Logarithmic: log(x), ln(x)
- Rational: 1/x
- Other: sqrt(x), abs(x)
```

### 2. Customizing Axes

Adjust the coordinate plane:
- **X Min/Max**: Set horizontal range
- **Y Min/Max**: Set vertical range
- **X/Y Step**: Control grid spacing
- **Grid options**: Toggle major/minor grids
- **Labels**: Show/hide axis labels and numbers

### 3. Using Templates

Select from pre-configured templates:
- **SAT Linear Function**: Standard -5 to 5 grid
- **SAT Quadratic Function**: Optimized for parabolas
- **ACT Standard Grid**: -8 to 8 coordinate plane
- **AP Calculus**: Exam-style with minor grid
- **Unit Circle**: Perfect for trigonometry
- **Wide View**: Large coordinate plane

### 4. Exporting Graphs

Export your graph in multiple formats:
- **PNG**: For digital use, presentations
- **SVG**: For scalable graphics, further editing
- **PDF**: For printing, test materials
- **Copy**: Quick clipboard copy

## Mathematical Expression Syntax

GraphLab supports standard mathematical notation:

| Operation | Syntax | Example |
|-----------|--------|---------|
| Addition | `+` | `x + 2` |
| Subtraction | `-` | `x - 3` |
| Multiplication | `*` | `2*x` |
| Division | `/` | `1/x` |
| Exponentiation | `^` | `x^2` |
| Square root | `sqrt()` | `sqrt(x)` |
| Absolute value | `abs()` | `abs(x)` |
| Sine | `sin()` | `sin(x)` |
| Cosine | `cos()` | `cos(x)` |
| Tangent | `tan()` | `tan(x)` |
| Natural log | `ln()` | `ln(x)` |
| Common log | `log()` | `log(x)` |
| Constants | `pi`, `e` | `sin(pi*x)` |

## Project Structure

```
graphlab/
├── src/
│   ├── components/          # React components
│   │   ├── GraphCanvas.tsx  # Main canvas component
│   │   ├── FunctionInput.tsx
│   │   ├── AxisControls.tsx
│   │   ├── ExportPanel.tsx
│   │   ├── PresetGallery.tsx
│   │   └── Sidebar.tsx
│   ├── lib/                 # Core logic
│   │   ├── graphEngine.ts   # Canvas rendering engine
│   │   ├── mathParser.ts    # Expression parser
│   │   ├── exportUtils.ts   # Export functionality
│   │   └── presets.ts       # Template presets
│   ├── store/               # State management
│   │   └── graphStore.ts    # Zustand store
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── styles/              # Global styles
│   │   └── globals.css
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Key Differentiators

### GraphLab vs. Desmos

| Feature | GraphLab | Desmos |
|---------|----------|--------|
| **Purpose** | Exam-ready static graphs | Interactive exploration |
| **Style** | Clean B&W, minimal | Colorful, modern |
| **Export** | PNG, SVG, PDF | Limited export |
| **Templates** | SAT/ACT/AP presets | None |
| **Target** | Test creators, educators | Students, explorers |
| **Output** | Publication-quality | Interactive only |

## Roadmap

### Phase 1 (Complete)
- ✅ Core graph rendering engine
- ✅ Function plotting
- ✅ Axis and grid customization
- ✅ Export functionality
- ✅ Template presets

### Phase 2 (Future)
- [ ] Statistical graphs (box plots, histograms)
- [ ] Geometry tools (shapes, angles)
- [ ] Piecewise functions
- [ ] Parametric equations
- [ ] Polar coordinates
- [ ] Inequality shading
- [ ] Point plotting with labels
- [ ] Calculus visualizations (derivatives, integrals)
- [ ] Animation and sliders
- [ ] Collaborative sharing

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use for educational purposes.

## Support

For questions, issues, or feature requests, please open an issue on GitHub.

---

**GraphLab** - Creating professional, exam-ready math graphs made simple.
