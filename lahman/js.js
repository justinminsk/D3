async function main(){
	
	
	console.log("Loading Data");
	
	var dataset = await d3.csv("nya2015.csv");
	
	console.log(dataset);
	console.log(dataset[0].playerID);
	console.log(dataset[0].yearID);
	
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width",1000)
				.attr("height",500);
	
	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d){return d.playerID;})
		.attr("x",function(){return Math.random()*1000;})
		.attr("y",function(){return Math.random()*500;})
	
};

main();
 
 
  
  