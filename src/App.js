import { useEffect, useRef, useState } from "react"; 
import Menu from "./components/Menu"; 
import "./App.css"; 

function App() { 
	const canvasRef = useRef(null); 
	const ctxRef = useRef(null); 
	const [isDrawing, setIsDrawing] = useState(false); 
	const [lineWidth, setLineWidth] = useState(5); 
	const [lineColor, setLineColor] = useState("black"); 

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

	return ( 
		<div className="App"> 
			<h1>Paint App</h1> 
			<div className="draw-area"> 
				<Menu 
					setLineColor={setLineColor} 
					setLineWidth={setLineWidth} 
				/> 
				<canvas 
					onMouseDown={startDrawing} 
					onMouseUp={endDrawing} 
					onMouseMove={draw} 
					ref={canvasRef} 
					width={`950px`} 
					height={`450px`} 
				/> 
			</div> 
		</div> 
	); 
} 

export default App;