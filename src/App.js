import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(20);
  const [lineColor, setLineColor] = useState("black");
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineWidth]);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    setIsDrawing(true);
  };

  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    ctxRef.current.stroke();
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
    setLineColor(isErasing ? "black" : "white"); // Assume the background is white
  };

  return (
    <div className="App">
      <h1>Let's Get Painting!</h1>
      <div className="Menu">
        <label>Brush Color</label>
        <input
          type="color"
          onChange={(e) => {
            setLineColor(e.target.value);
            setIsErasing(false);
          }}
        />
        <label>{!isErasing ? "Brush" : "Eraser"} Width</label>
        <input
          type="range"
          min="1"
          max="20"
          onChange={(e) => {
            setLineWidth(e.target.value);
          }}
        />
        <button
          onClick={() => {
            ctxRef.current.clearRect(0, 0, 950, 450);
          }}
        >
          Clear All
        </button>
        <button
          onClick={toggleEraser}
        >
          {isErasing ? "Brush" : "Eraser"}
        </button>
      </div>
      <div className="canvas">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={"950px"}
          height={"450px"}
        />
      </div>
    </div>
  );
}

export default App;
