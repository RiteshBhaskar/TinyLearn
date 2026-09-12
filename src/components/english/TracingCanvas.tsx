import React, { useRef, useState, useEffect } from 'react';
import { ENGLISH_LETTERS } from '../../data/englishData';
import { useApp } from '../../context/AppContext';
import { soundEffects } from '../../utils/soundEffects';
import { speechEngine } from '../../utils/speech';
import { ConfettiCanvas } from '../common/ConfettiCanvas';
import { TikoMascot } from '../common/TikoMascot';
import {
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Eraser,
  Paintbrush
} from 'lucide-react';

const CRAYON_COLORS = [
  { name: 'Red Crayon', hex: '#EF4444', emoji: '🖍️' },
  { name: 'Blue Crayon', hex: '#3B82F6', emoji: '🖍️' },
  { name: 'Green Crayon', hex: '#10B981', emoji: '🖍️' },
  { name: 'Yellow Crayon', hex: '#FBBF24', emoji: '🖍️' },
  { name: 'Purple Crayon', hex: '#A855F7', emoji: '🖍️' },
  { name: 'Pink Crayon', hex: '#EC4899', emoji: '🖍️' },
  { name: 'Orange Crayon', hex: '#F97316', emoji: '🖍️' }
];

const BRUSH_SIZES = [
  { label: 'Fine', size: 12 },
  { label: 'Medium', size: 20 },
  { label: 'Chunky', size: 30 }
];

export const TracingCanvas: React.FC = () => {
  const { addStars, markTracingCompleted } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(CRAYON_COLORS[1].hex);
  const [brushSize, setBrushSize] = useState(20);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isEraser, setIsEraser] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentLetter = ENGLISH_LETTERS[letterIndex];

  // Draw guide outline of the current letter
  const drawGuide = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.font = `bold ${Math.min(width, height) * 0.72}px "Fredoka", "Baloo 2", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Dashed guide outline
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 14;
    ctx.setLineDash([14, 14]);
    ctx.strokeText(currentLetter.letter, width / 2, height / 2 + 10);

    // Light silhouette
    ctx.fillStyle = 'rgba(226, 232, 240, 0.4)';
    ctx.fillText(currentLetter.letter, width / 2, height / 2 + 10);

    ctx.restore();
  };

  const clearCanvas = () => {
    soundEffects.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuide(ctx, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 380;
    canvas.height = rect.height || 380;

    clearCanvas();
    speechEngine.speak(`Let's trace letter ${currentLetter.letter}!`);
  }, [letterIndex]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    setIsDrawing(true);
    soundEffects.playPop();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraser ? '#FFFFFF' : currentColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleFinishTracing = () => {
    soundEffects.playCorrect();
    setShowCelebration(true);
    addStars(5);
    markTracingCompleted(currentLetter.letter);
    speechEngine.speak(`Beautiful job tracing ${currentLetter.letter}! You earned 5 stars!`);

    setTimeout(() => {
      setShowCelebration(false);
      handleNextLetter();
    }, 2400);
  };

  const handleNextLetter = () => {
    soundEffects.playPop();
    setLetterIndex(prev => (prev < ENGLISH_LETTERS.length - 1 ? prev + 1 : 0));
  };

  const handlePrevLetter = () => {
    soundEffects.playPop();
    setLetterIndex(prev => (prev > 0 ? prev - 1 : ENGLISH_LETTERS.length - 1));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 select-none animate-pop-in">
      <ConfettiCanvas active={showCelebration} durationMs={2400} />

      {/* Header Bar */}
      <div className="flex justify-between items-center bg-white/95 border-4 border-amber-300 rounded-3xl p-4 mb-4 shadow-toy-yellow">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevLetter}
            className="p-3 btn-candy bg-sky-100 hover:bg-sky-200 text-sky-900 border-2 border-sky-300"
            title="Previous Letter"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="text-center px-3">
            <span className="font-bubble font-black text-2xl text-slate-900">
              Trace: Letter <span className="text-pink-600 text-4xl font-black">{currentLetter.letter}</span>
            </span>
          </div>

          <button
            onClick={handleNextLetter}
            className="p-3 btn-candy bg-sky-100 hover:bg-sky-200 text-sky-900 border-2 border-sky-300"
            title="Next Letter"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <button
          onClick={() => speechEngine.speak(`Letter ${currentLetter.letter} for ${currentLetter.word}`)}
          className="p-3 btn-candy btn-candy-yellow"
          title="Hear pronunciation"
        >
          <Volume2 size={22} />
        </button>
      </div>

      {/* Mascot Hint */}
      <div className="flex justify-center mb-4">
        <TikoMascot
          message={`Pick a crayon color and trace the dotted lines for "${currentLetter.letter}"! 🎨`}
          size="sm"
          emotion="cheering"
        />
      </div>

      {/* Canvas Drawing Sandbox */}
      <div className="toy-block toy-block-yellow p-6 flex flex-col items-center">
        
        {/* HTML5 Canvas */}
        <div className="relative w-full max-w-sm h-80 sm:h-96 rounded-3xl bg-white border-4 border-dashed border-amber-300 flex items-center justify-center touch-none shadow-inner">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair rounded-3xl"
          />
        </div>

        {/* Crayon Box Palette */}
        <div className="w-full mt-6 space-y-4">
          
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap bg-white/90 p-3 rounded-full border-2 border-amber-200 shadow-sm">
            {CRAYON_COLORS.map(c => (
              <button
                key={c.hex}
                onClick={() => {
                  soundEffects.playPop();
                  setIsEraser(false);
                  setCurrentColor(c.hex);
                }}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-3 transition-transform cursor-pointer flex items-center justify-center text-xl shadow-md ${
                  !isEraser && currentColor === c.hex
                    ? 'scale-125 ring-4 ring-yellow-400 border-white'
                    : 'border-white hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}

            {/* Eraser */}
            <button
              onClick={() => {
                soundEffects.playPop();
                setIsEraser(true);
              }}
              title="Eraser"
              className={`p-2.5 rounded-full border-2 transition cursor-pointer ${
                isEraser ? 'bg-amber-400 text-amber-950 scale-125 shadow-md ring-4 ring-yellow-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Eraser size={20} />
            </button>
          </div>

          {/* Crayon Thickness */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bubble font-black text-slate-600 mr-1 flex items-center gap-1">
              <Paintbrush size={14} /> Crayon Size:
            </span>
            {BRUSH_SIZES.map(b => (
              <button
                key={b.size}
                onClick={() => {
                  soundEffects.playPop();
                  setBrushSize(b.size);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bubble font-black cursor-pointer transition ${
                  brushSize === b.size ? 'btn-candy btn-candy-blue' : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Bottom Buttons: Clear & Complete */}
        <div className="w-full flex items-center justify-between gap-4 mt-6 pt-4 border-t-2 border-amber-200">
          <button
            onClick={clearCanvas}
            className="flex-1 py-3 px-4 btn-candy bg-white hover:bg-slate-50 border-3 border-slate-300 text-slate-700 font-black text-sm shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw size={18} />
            <span>Clear / Try Again</span>
          </button>

          <button
            onClick={handleFinishTracing}
            className="flex-1 py-3 px-4 btn-candy btn-candy-green font-black text-sm shadow-toy-green cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles size={20} />
            <span>I'm Done! ⭐</span>
          </button>
        </div>
      </div>
    </div>
  );
};
