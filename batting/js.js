async function main(){
	
	var w = 1000;
	var h = 500;
	var padding = 50;
	
	var dataset = await d3.csv("hitters.csv");

	dataset = dataset.map(d=>({
		nameLast: d.nameLast,
		HR: parseFloat(d.HR),
		BB: parseFloat(d.BB),
		SO: parseFloat(d.SO)	
	}));
	
	console.log(dataset);
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w)
				.attr("height",h);
				
	var xScale = d3.scaleLinear()
					.domain([d3.min(dataset, function(d){return d.HR;}) - 10,
					Math.ceil(d3.max(dataset, function(d){return d.HR;})/20)*20
					])
					.range([padding, w - padding]);
	
	var yScale = d3.scaleSqrt()
					.domain([
					d3.max(dataset, function(d){return d.SO;}) + 200,
					d3.min(dataset, function(d){return d.SO;}) - 10
					])
					.range([padding, h - padding]);
	
	var rScale = d3.scaleSqrt()
					.domain([d3.min(dataset, function(d){return d.BB;}),
					d3.max(dataset, function(d){return d.BB;})])
					.range([3, 25]);
	
	var xAxis = d3.axisBottom()
					.scale(xScale);
	
	
	var yAxis = d3.axisLeft()
					.scale(yScale);
					
	svg.selectAll(".dot")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r",function(d){return rScale(d.BB);})
		.attr("cy",function(d){return yScale(d.SO) - rScale(d.BB) - 10;})
		.attr("cx",function(d){return xScale(d.HR);})
		.attr("fill","white")
		.attr("stroke","black");
		
	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d){return d.nameLast;})
		.attr("y",function(d){return yScale(d.SO);})
		.attr("x",function(d){return xScale(d.HR);})
		.attr("text-anchor", "middle")
		.attr("fill","blue");
	
	svg.append("text")
		.attr("x",w/2)
		.attr("y",h-20)
		.text("Career Homeruns")
		.attr("text-anchor", "middle")
		.attr("font-size",15);
		
	svg.append("text")
		.attr("x",padding)
		.attr("y",h/2)
		.text("Career Strikeouts")
		.attr("text-anchor", "middle")
		.attr("font-size",15)
		.attr("transform", "rotate(-90,10,"+(h/2)+")");
	
	svg.append("text")
		.attr("x",w-100)
		.attr("y", 50)
		.text("Bubble Size is Career Walks")
		.attr("text-anchor", "middle")
		.attr("font-size",15)
		.attr("font-style","italic")
		.attr("fill","green");
	
	svg.append("g")
		.attr("transform","translate(0,"+(h-padding)+")")
		.call(xAxis);
		
	svg.append("g")
		.attr("transform","translate("+(padding)+",0)")
		.call(yAxis);
	
	
	
};


main();
