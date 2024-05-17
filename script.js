

// REFERENCE
let DATA = null;




// SCATTER PLOT
function graphData(data) {
	// console
	console.log('Scatter plot...');


	// graph dimension
	const w = 900;
	const h = 450;
	const padTop = 20;
	const padBottom = 30;
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
		.call(xAxis)
		.attr("id", "x-axis")
		.attr("transform", `translate(0, ${h - padBottom})`);
	// y-axis
	const formatTime = d3.timeFormat("%M:%S");
	const yAxis = d3.axisLeft(yScale)
		.ticks(d3.timeSecond.every(15))
		.tickFormat(time => formatTime(time));
	svg.append("g")
		.call(yAxis)
		.attr("id", "y-axis")
		.attr("transform", `translate(${padLeft}, 0)`);
	// label
	svg.append("text")
		.text("Time in Minutes")
		.attr("class", "y-axis-label")
		.attr("x", -200)
		.attr("y", 25)
		.style("transform", "rotate(-90deg)")


	// plots
	const circles = svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", 7)
		.attr("cx", d => xScale(parseInt(d.Year)))
		.attr("cy", d => yScale(parseTime(d.Time)))
		.attr("data-xvalue", d => parseInt(d.Year))
		.attr("data-yvalue", d => parseTime(d.Time))
		// green : #0A6847, red : #DF2E38
		.style("fill", d => d.Doping==="" ? "#0A6847":"#DF2E38");


	// tooltip
	const tooltip = d3.select("#tooltip");
	circles
		.on("mouseover", d => {
			const doping = d.Doping==="" ? "":`<br><p>${d.Doping}</p>`
			tooltip
				.attr("data-year", parseInt(d.Year))
				.html(
					`
					<p>${d.Name} (${d.Nationality})</p>
					<p>Year: ${d.Year}, Time: ${d.Time}</p>
					${doping}
					`
				)
				.style("top", d3.event.pageY - 20 + "px")
				.style("left", d3.event.pageX + 15 + "px")
				.style("visibility", "visible")
		})
		// .on("mousemove", () => {
		// 	tooltip
		// 		.style("top", d3.event.pageY - 20 + "px")
		// 		.style("left", d3.event.pageX + 15 + "px")
		// })
		.on("mouseout", () => {
			tooltip
				.style("top", 0)
				.style("left", 0)
				.style("visibility", "hidden")
		})


	// show graph visibility
	d3.selectAll(".visible").style("visibility", "visible")
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