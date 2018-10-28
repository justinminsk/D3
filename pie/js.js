async function main(){
	
	var w = 1000;
	var h = 500;
	var padding = 50;
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w)
				.attr("height",h);
				
	var dataset = await d3.csv('pie.csv');
	
	var select = d3.select("body")
					.append("select")
					.attr("class", "select");
	
	select.selectAll('option')
			.data(d3.map(dataset, function(d){return d.yearID;}).keys())
			.enter()
			.append('option')
			.text(function (d) { return d; });
	
	dataset = dataset.map(d=>({
		name: d.name,
		year: parseInt(d.yearID),
		salary: parseInt(d.salary),
		color: d.color
	}));
	
	console.log(dataset);
	
	var filteredDataset = dataset.filter(d=>d.year===1998);
	
	console.log(filteredDataset);
	
	sortedDataset=filteredDataset.sort((x,y)=>x.salary-y.salary);
	
	console.log(sortedDataset);
	
	var max = d3.max(dataset, function(d){ return d.salary; })
	
	console.log(max);
	
	var gen = d3.arc()
					.innerRadius(function(d, i){ return i * 30 + 30; })
					.outerRadius(function(d, i){ return i * 30 + 60; })
					.startAngle(0)
					.endAngle(function(d){ return 2 * Math.PI * d.salary / max; });
	
	svg.selectAll("path")
		.data(sortedDataset)
		.enter()
		.append("path")
		.attr("d",gen)
		.attr("transform", "translate("+(w/2)+","+(h/2)+")")
		.attr("fill", function(d){ return d.color })
		.attr("class","salary");
		
	
	d3.select("select")
		.on("change", async function(){
			
			var selected = d3.selectAll("select").node().value;
			
			console.log(selected);
			
			filteredDataset = dataset.filter(d=>d.year===parseInt(selected));
			
			console.log(filteredDataset);
	
			sortedDataset=filteredDataset.sort((x,y)=>x.salary-y.salary);
	
			console.log(sortedDataset);
			
			svg.selectAll(".salary").remove();
			svg.selectAll(".salary")
				.data(sortedDataset)
				.enter()
				.append("path")
				.attr("d",gen)
				.attr("transform", "translate("+(w/2)+","+(h/2)+")")
				.attr("fill", function(d){ return d.color })
				.attr("class","salary");
			
			});
};

main();
