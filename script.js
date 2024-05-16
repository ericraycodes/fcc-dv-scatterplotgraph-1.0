

// REFERENCE
let DATA = null;




// SCATTER PLOT
function graphData(data) {
	// console
	console.log('Scatter plot...');

	// graph dimension
	const w = 900;
	const h = 550;
	const padTop = 20;
	const padBottom = 40;
	const padLeft = 70;
	const padRight = 40;

	// x-scale
	const xScale = d3.scaleLinear()
		.domain([
			d3.min(data, d => d.Year), 
			d3.max(data, d => d.Year)
		])
		.range([padLeft, w - padRight]);
	// y-scale
	const parseTime = d3.timeParse("%M:%S");
	const yScale = d3.scaleTime()
		.domain([
			d3.min(data, d => parseTime(d.Time)), 
			d3.max(data, d => parseTime(d.Time))
		])
		.range([padTop, h - padBottom]);

	// svg
	const svg = d3.select("#svg-container")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	// const circle = svg.selectAll("circle")
	// 	.data(data)
	// 	.enter()
	// 	.append("circle")
	// 	.attr("fill", "orange")
	// 	.attr("cx", 15)
	// 	.attr("cy", 15)
	// 	.attr("x", d => padLeft + xScale(d.Year))
	// 	.attr("y", d => padTop + yScale(d.Year));
}




// REQUEST DATA ON 'DOMCONTENTLOADED'
document.addEventListener('DOMContentLoaded', () => {
	// console
	console.log('DOM Loaded!');

	// instance of the xmr object; used to request data
	const request = new XMLHttpRequest();

	// initialize the request
	const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
	request.open("GET", url, true);

	// send the request
	request.send();

	// when request is successful and data is loaded
	request.onload = () => {

		// capture the data loaded
		const json = JSON.parse(request.responseText);
		console.log(json);

		// reference the data to a global variable
		DATA = json;

		// run visualization
		graphData(DATA);
	};
});