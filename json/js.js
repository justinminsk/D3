function init() { up_marquee.start(); }

async function main(){
	
	
	console.log("Loading Data");
	
	var dataset = await d3.json("starwars.json");
	dataset = dataset.results;
	
	console.log(dataset[0]);
	
	var up_marquee_Text = 'JavaScript scrolling text';
	var up_marquee_Direction = 'up';
	
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width", 500)
				.attr("height", 300);
	

	var up_marquee_Contents = ""
	
	svg.selectAll("svg text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d){up_marquee_Contents = up_marquee_Contents.concat("<br>" + d.name + "\n"); return d.name;})
		.attr("x", 250)
		.attr("y", function(d, i){return (i + 5)*20;})
		.attr("text-anchor", "middle");
		
	up_marquee = new xbMarquee('up_marquee', '200px', '90%', 6, 100, up_marquee_Direction, 'scroll', up_marquee_Contents);
	window.setTimeout( init, 200);
	
};

main();
 
 
  
  