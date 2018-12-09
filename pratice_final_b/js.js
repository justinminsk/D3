async function main(){
	
	var data = ["orange", "red", "blue", "green"];
	
	var w = 1000;
	var h = 575;
	
	var svg = d3.select("body")
				.append("div")
				.append("svg")
				.attr("width",w)
				.attr("height",h);

	svg.append("rect")
		.attr("width", 200)
		.attr("height", 400)
		.attr("x", 10)
		.attr("y", 100)
		.attr("fill", "orange")
		.attr("stroke", "black")
		.attr("class", "colorBox");
		
	svg.append("rect")
		.attr("width", 200)
		.attr("height", 50)
		.attr("x", 10)
		.attr("y", 50)
		.attr("fill", "white")
		.attr("stroke", "black")
		.attr("class", "box");
	
	svg.append("text")
		.text("orange")
		.attr("x", 85)
		.attr("y", 85)
		.attr("fill", "orange")
		.attr("class", "colorText");
		
	svg.append("text")
		.text("Please select a color:")
		.attr("x", 10)
		.attr("y", 550);
		
	var select = d3.select('body')
  					.append('select')
				  	.attr('class','select');
	
	select.selectAll('option')
			.data(data)
			.enter()
			.append('option')
			.text(function (d) { return d; });
			
	d3.select("select")
		.on("change", function(){
			var selected = d3.selectAll("select").node().value;
			
			svg.selectAll("colorBox").remove();
			svg.append("rect")
				.attr("width", 200)
				.attr("height", 400)
				.attr("x", 10)
				.attr("y", 100)
				.attr("fill", selected)
				.attr("stroke", "black")
				.attr("class", "colorBox");
				
			svg.append("rect")
				.attr("width", 200)
				.attr("height", 50)
				.attr("x", 10)
				.attr("y", 50)
				.attr("fill", "white")
				.attr("stroke", "black")
				.attr("class", "box");
				
			svg.selectAll(".colorText").remove();
			svg.append("text")
				.text(selected)
				.attr("x", 85)
				.attr("y", 85)
				.attr("fill", selected)
				.attr("class", "colorText");
		
		});
		
		
};

main();
