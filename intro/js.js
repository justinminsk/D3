async function main(){
	
	var dataset = await d3.csv("people.csv");
	
	console.log(dataset);
	console.log(dataset[0]["name"]);
	
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width",500)
				.attr("height",300);
				
	svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("fill","white")
		.attr("stroke","black")
		.attr("r",function(d){return d["age"];})
		.attr("cy",150)
		.attr("cx",function(d, i){return (i +1) * 100;});
	
	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.attr("y",150)
		.attr("x",function(d, i){return (i +1) * 100;})
		.attr("text-anchor","middle")
		.attr("dy", ".35em")
		.text(function(d){return d["name"];});
		
	
};

main();
 
 
  
  