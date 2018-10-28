async function main(){
	
	var w = 500;
	var h = 300;
	var padding = 25;
	
	var dataset = [];
	for(var i = 0; i < 50; i++){
		var x = Math.random()*10;
		var y = Math.random()*10;
		var r = Math.random()*10;
		dataset.push([x, y, r]);
	}
	console.log(dataset);
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w)
				.attr("height",h);
				
	var xScale = d3.scaleLinear()
					.domain([0,10])
					.range([padding, w - padding]);
	
	var rScale = d3.scaleSqrt()
					.domain([0,10])
					.range([5,20]);
	
	console.log(rScale(4)*rScale(4));
	console.log(rScale(8)*rScale(8));
	
	var xAxis = d3.axisBottom()
					.scale(xScale);
	
	var yScale = d3.scaleLinear()
					.domain([10,0])
					.range([padding, h - padding]);
	
	var yAxis = d3.axisLeft()
					.scale(yScale);
					
	svg.selectAll(".dot")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r",function(d){return rScale(d[2]);})
		.attr("cy",function(d){return yScale(d[1]);})
		.attr("cx",function(d){return xScale(d[0]);});
	
	svg.append("g")
		.attr("transform","translate(0,"+(h-padding)+")")
		.call(xAxis);
		
	svg.append("g")
		.attr("transform","translate("+(padding)+",0)")
		.call(yAxis);
	
	
	
};


main();
