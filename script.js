

// REFERENCE
let DATA = null;




// SCATTER PLOT
function graphData(data) {
	// console
	console.log('Scatter plot...')
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