async function main(){
	
	var dataset = await d3.csv("teamsSalary2.csv");
	
	var w = 1000;
	var h = 500;
	var padding = 50;
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w)
				.attr("height",h);
	
	var select = d3.select('body')
  					.append('select')
				  	.attr('class','select');
	
	select.selectAll('option')
			.data(d3.map(dataset, function(d){return d.name;}).keys())
			.enter()
			.append('option')
			.text(function (d) { return d; });
	
	var yScale = d3.scaleLinear()
					.domain([270, 0])
					.range([padding, h - padding]);
	
	var yAxis = d3.axisLeft()
						.scale(yScale);
	
	svg.append("circle")
        			.attr("fill", "steelblue")
        			.attr("stroke", "black")
        			.attr("r", 5)
        			.attr("cx", padding)
        			.attr("cy", yScale(0))
        			.attr("class", "salary");
	
	svg.selectAll("text")
		.data(dataset)
		.enter()
		.filter(function(d){ return d.name === "Anaheim Angels";})
		.append("text")
		.text(function(d){ return d.yearID;})
		.attr("x", padding + 50)
		.attr("y", function(d, i){return (i * 25) + padding;})
		.attr("class", "years")
		.on("click", function(d) {
			console.log(d.salary);
			svg.select(".salary")
				.datum(d)
				.transition()
				.duration(1500)
				.ease(d3.easeBounce)
				.attr("cy", yScale(Math.ceil(parseInt(d.salary) / 100000000)));
		});
	
	svg.append("g")
			.attr("class", "yaxis")
			.attr("transform","translate("+(padding)+",0)")
			.call(yAxis);
	
	d3.select("select")
		.on("change", async function(){
			
			var selected = d3.selectAll("select").node().value;
			
			console.log(selected);
			
			svg.select(".salary")
						.datum(dataset)
						.transition()
						.duration(1000)
						.ease(d3.easeBounce)
						.attr("cy", yScale(0));
			
			svg.selectAll(".years").remove();
			svg.selectAll(".years")
				.data(dataset)
				.enter()
				.filter(function(d){ return d.name === selected;})
				.append("text")
				.text(function(d){ return d.yearID;})
				.attr("x",function(d, i){ if(i > 15){ return padding + 100 } else{ return padding + 50} })
				.attr("y", function(d, i){ if(i > 15){ return (i - 16) * 25 + padding } else{ return (i * 25) + padding } })
				.attr("class", "years")
				.on("click", function(d) {
					console.log(d.salary);
					svg.select(".salary")
						.datum(d)
						.transition()
						.duration(1500)
						.ease(d3.easeBounce)
						.attr("cy", yScale(Math.ceil(parseInt(d.salary) / 100000000)));
		});

		});
		
};

main();
