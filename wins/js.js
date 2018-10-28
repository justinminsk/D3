async function main(){
	
	var w = 1000;
	var h = 500;
	var padding = 50;
	var parseTime = d3.timeParse("%Y");
				
	var dataset = await d3.csv("teamWins.csv");
	
	var runsDataset = await d3.csv("teamsRuns.csv");
	
	dataset = dataset.map(d=>({
		name: d.name,
		year: parseTime(d.yearID),
		wins: parseInt(d.wins)
	}));
	
	runsDataset = runsDataset.map(d=>({
		name: d.name,
		year: parseTime(d.year),
		runs: parseInt(d.runs),
		runsAginst: parseInt(d.runsaginst)
	}));
	
	console.log(runsDataset);	
	console.log(dataset);
	
	var filteredDataset = dataset.filter(d=>d.name==="Altoona Mountain City");
	var filteredRunsDataset = runsDataset.filter(d=>d.name==="Altoona Mountain City");
	
	console.log(filteredDataset);
	console.log(filteredRunsDataset);
	
	var select = d3.select('body')
  					.append('select')
				  	.attr('class','select');
	
	select.selectAll('option')
			.data(d3.map(dataset, function(d){return d.name;}).keys().sort())
			.enter()
			.append('option')
			.text(function (d) { return d; });
		
	
	var svg = d3.select("body")
				.append('div')
				.append("svg")
				.attr("width",w)
				.attr("height",h);
				
	var yScale = d3.scaleLinear()
					.domain([d3.max(filteredDataset, function(d){return d.wins;}), d3.min(filteredDataset, function(d){return d.wins;})])
					.range([padding, h - padding]);
	
	var xScale = d3.scaleTime()
					.domain([d3.min(filteredDataset, function(d){return d.year;}), d3.max(filteredDataset, function(d){return d.year;})])
					.range([padding, w - padding]);
					
	var yAxis = d3.axisLeft()
						.scale(yScale);
	
	var xAxis = d3.axisBottom()
						.scale(xScale);
						
	var line = d3.line()
						.x(function(d){return xScale(d.year);})
						.y(function(d){return yScale(d.wins);});
	
	var genR = d3.area()
					.x(function(d){return xScale(d.year);})
					.y0(yScale(0))
					.y1(function(d){return yScale(d.runs);})
					.curve(d3.curveCardinal);
	
	var genRA = d3.area()
					.x(function(d){return xScale(d.year);})
					.y0(yScale(0))
					.y1(function(d){return yScale(d.runsAginst);})
					.curve(d3.curveCardinal);
	
	var genM = d3.area()
					.x(function(d){return xScale(d.year);})
					.y0(yScale(0))
					.y1(function(d){return yScale([d3.min(d.runs, d.runsAginst)]);})
					.curve(d3.curveCardinal);
	
	svg.append("path")
			.datum(filteredDataset)
			.attr("d", line)
			.attr("fill","None")
			.attr("stroke","black")
			.attr("class","series");
	
	svg.append("path")
			.attr("d", genR(filteredRunsDataset))
			.attr("fill","green")
			.attr("stroke","black")
			.attr("stroke-width",1)
			.attr("id", "runs");
			
	svg.append("path")
			.attr("d", genRA(filteredRunsDataset))
			.attr("fill","red")
			.attr("stroke","black")
			.attr("stroke-width",1)
			.attr("id", "runsAginst");
			
	svg.append("path")
			.attr("d", genM(filteredRunsDataset))
			.attr("fill","white")
			.attr("stroke","black")
			.attr("stroke-width",1)
			.attr("id", "m");
	
	
	svg.append("text")
			.attr("x",w/2)
			.attr("y",h-20)
			.text("Years")
			.attr("text-anchor", "middle")
			.attr("font-size",15);
			
	svg.append("text")
			.attr("x",padding - 25)
			.attr("y",h/2 + 10)
			.text("Wins")
			.attr("text-anchor", "middle")
			.attr("font-size",15)
			.attr("transform", "rotate(-90,10,"+(h/2)+")");
	
	svg.append("g")
			.attr("class", "yaxis")
			.attr("transform","translate("+(padding)+",0)")
			.call(yAxis);
			
	svg.append("g")
			.attr("class", "xaxis")
			.attr("transform","translate(0,"+(h-padding)+")")
			.call(xAxis);
			
	d3.select("select")
		.on("change", async function(){
			var selected = d3.select("select").node().value;
			
			filteredDataset = dataset.filter(d=>d.name===selected);
			filteredRunsDataset = runsDataset.filter(d=>d.name===selected);
			
			console.log(selected);
			console.log(filteredDataset);
			console.log(filteredRunsDataset);
			
			xScale.domain([d3.min(filteredDataset, function(d){return d.year;}), d3.max(filteredDataset, function(d){return d.year;})]);
			
			yScale.domain([d3.max(filteredDataset, function(d){return d.wins;}), d3.min(filteredDataset, function(d){return d.wins;})]);
			
			svg.select(".xaxis").call(xAxis);
			
			svg.select(".yaxis").call(yAxis);
			
			svg.select(".series")
				.datum(filteredDataset)
				.attr("d", line);
			
			d3.select("#runs")
				.attr("d",genR(filteredRunsDataset));
				
			d3.select("#runsAginst")
				.attr("d",genRA(filteredRunsDataset));
				
			d3.select("#m")
				.attr("d",genM(filteredRunsDataset));
				
		});
		
};

main();
