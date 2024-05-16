

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
	console.log('parse time', parseTime("30:04"));
	const yScale = d3.scaleUtc()
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
		.call(xAxis)
		.attr("id", "x-axis")
		.attr("transform", `translate(0, ${h - padBottom})`);
	// y-axis
	const yAxis = d3.axisLeft(yScale)
		.ticks(d3.timeSecond.every(15))
	svg.append("g")
		.call(yAxis)
		.attr("id", "y-axis")
		.attr("transform", `translate(${padLeft}, 0)`)

	// plots
	const circle = svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", 7)
		.attr("cx", d => xScale(parseInt(d.Year)))
		.attr("cy", d => yScale(parseTime(d.Time)))
		.attr("data-xvalue", d => parseInt(d.Year))
		.attr("data-yvalue", d => parseTime(d.Time))
		.style("fill", d => d.Doping==="" ? "green":"red")
		.style("opacity", 0.7);
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