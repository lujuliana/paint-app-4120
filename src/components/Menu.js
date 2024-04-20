import React from "react"; 
import "../App.css"; 

const Menu = ({ setLineColor, setLineWidth }) => { 
	return ( 
		<div className="Menu"> 
			<label>Brush Color </label> 
			<input 
				type="color"
				onChange={(e) => { 
					setLineColor(e.target.value); 
				}} 
			/> 
			<label>Brush Width </label> 
			<input 
				type="range"
				min="3"
				max="20"
				onChange={(e) => { 
					setLineWidth(e.target.value); 
				}} 
			/> 
		</div> 
	); 
}; 

export default Menu;
