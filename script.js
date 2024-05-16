

// REFERENCE
let DATA = null;




// SCATTER PLOT
function graphData(data) {
	// console
	console.log('Scatter plot...');

	// graph dimension
	const w = 900;
	const h = 500;
	const padTop = 20;
	const padBottom = 40;
	const padLeft = 70;
	const padRight = 40;

	// x-scale
	const xScale = d3.scaleLinear()
		.domain([
			d3.min(data, d => parseInt(d.Year) - 1), 
			d3.max(data, d => parseInt(d.Year) + 1)
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

	// x-axis
	const xAxis = d3.axisBottom(xScale)
		.tickFormat(year => year.toString());
	svg.append("g")
		.attr("transform", `translate(0, ${h - padBottom})`)
		.call(xAxis);

	// plots
	const circle = svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("r", 7)
		.attr("cx", d => xScale(parseInt(d.Year)))
		.attr("cy", d => padTop + yScale(parseTime(d.Time)))
		.style("fill", d => d.Doping==="" ? "green":"red");
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