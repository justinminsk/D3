/*eslint-disable radix */

async function getData(file){
	var dataset = await d3.csv(file);
	var parseTime = d3.timeParse("%Y");
			
	dataset = dataset.map(d=>({
				yearID: parseTime(d.yearID),
				HR: parseInt(d.HR)
	}));
	return dataset;
};

async function main(){
	
	var w = 1000;
	var h = 500;
	var padding = 50;
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w)
				.attr("height",h);
		
		svg.selectAll(".series").remove();
		
		
		var dataset = await d3.csv("ruth.csv");
			
		console.log(dataset);
		
		var parseTime = d3.timeParse("%Y");
		
		dataset = dataset.map(d=>({
			yearID: parseTime(d.yearID),
			HR: parseInt(d.HR)
			}));
		
		var xScale = d3.scaleTime()
					.domain([d3.min(dataset, function(d){return d.yearID;}), d3.max(dataset, function(d){return d.yearID;})])
					.range([padding, w - padding]);
		
		var yScale = d3.scaleLinear()
					.domain([d3.max(dataset, function(d){return d.HR;}), d3.min(dataset, function(d){return d.HR;})])
					.range([padding, h - padding]);
					
		var xAxis = d3.axisBottom()
						.scale(xScale);
		
		var yAxis = d3.axisLeft()
						.scale(yScale);
						
		var line = d3.line()
						.x(function(d){return xScale(d.yearID);})
						.y(function(d){return yScale(d.HR);});
		
		svg.append("path")
			.datum(dataset)
			.attr("d", line)
			.attr("fill","None")
			.attr("stroke","black")
			.attr("class","series");
		
		svg.append("text")
			.attr("x",w/2)
			.attr("y",h-20)
			.text("Years")
			.attr("text-anchor", "middle")
			.attr("font-size",15);
			
		svg.append("text")
			.attr("x",padding - 25)
			.attr("y",h/2 + 10)
			.text("Homeruns")
			.attr("text-anchor", "middle")
			.attr("font-size",15)
			.attr("transform", "rotate(-90,10,"+(h/2)+")");
		
		svg.append("g")
			.attr("class", "xaxis")
			.attr("transform","translate(0,"+(h-padding)+")")
			.call(xAxis);
			
		svg.append("g")
			.attr("class", "yaxis")
			.attr("transform","translate("+(padding)+",0)")
			.call(yAxis);
	
	
	d3.select("select")
		.on("click", async function(){
			var selected = d3.select("#player").node().value;
			dataset = await getData(selected);
			
			console.log(dataset);
			
			xScale.domain([d3.min(dataset, function(d){return d.yearID;}), d3.max(dataset, function(d){return d.yearID;})]);
			
			yScale.domain([d3.max(dataset, function(d){return d.HR;}), d3.min(dataset, function(d){return d.HR;})]);
			
			svg.select(".xaxis").call(xAxis);
			
			svg.select(".yaxis").call(yAxis);
			
			svg.select(".series")
				.datum(dataset)
				.transition()
				.duration(1000)
				.ease(d3.easeBounceOut)
				.on("start", function(){
					d3.select(this).attr("stroke","red");
				})
				.on("end", function(){
					d3.select(this).attr("stroke","black");
				})
				.attr("d", line);
				
		});
		
};

main();
