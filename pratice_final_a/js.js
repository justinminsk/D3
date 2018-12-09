async function main(){
	
	
	var h = 700;
	var w = 700;
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w)
				.attr("height",h);
				
	var nodeData = [
        {name: "Eileen"},
        {name: "Nate"},
        {name: "Dhruv"},
        {name: "Jorgie"},
        {name: "Yosef"},
        {name: "Luciano"},
        {name: "Clara"},
        {name: "Milton"}
    ];
	
	var linkData = [
        {source: "Eileen",target:"Nate", color:"black", distance:100},
        {source: "Eileen",target:"Dhruv", color:"black", distance:100},
        {source: "Eileen",target:"Jorgie", color:"black", distance:100},
        {source: "Nate",target:"Dhruv", color:"black", distance:100},
        {source: "Nate",target:"Jorgie", color:"black", distance:100},
        {source: "Dhruv",target:"Jorgie", color:"black", distance:100},
    	{source: "Yosef",target:"Luciano", color:"black", distance:100},
        {source: "Yosef",target:"Clara", color:"black", distance:100},
        {source: "Yosef",target:"Milton", color:"black", distance:100},
        {source: "Luciano",target:"Milton", color:"black", distance:100},
        {source: "Luciano",target:"Clara", color:"black", distance:100},
        {source: "Clara",target:"Milton", color:"black", distance:100},
        {source: "Eileen",target:"Clara", color:"orange", distance:400}
	];
    
    var links = svg.selectAll("line")
    				.data(linkData)
					.enter()
					.append("line")
					.attr("stroke",function(d){return d.color;});	
					
	var nodes = svg.selectAll("g")
					.data(nodeData)
					.enter()
					.append("g")
					.attr("class", "node");
					
	nodes.append("circle")
		 .attr("r",10)
		 .attr("fill","red")
		 .attr("stroke","black")
		 .attr("class", "nodeCircle");
	
	nodes.append("text")
		.attr("text-anchor","middle")
		.attr("fill","black")
		.style("font-size", "5px")
		.attr("class", "nodeText")
		.text(function(d){return d.name;});
	
	var sim = d3.forceSimulation()
				.nodes(nodeData)
				.force("center",d3.forceCenter(350,350))
				.force("links",d3.forceLink(linkData).id(function(d){return d.name;}).distance(function(d){return d.distance;}))
				.on("tick",function(){
					nodes.attr("transform",function(d){return "translate("+d.x+","+d.y+")";});
					links.attr("x1",function(d){return d.source.x;});
					links.attr("y1",function(d){return d.source.y;});
					links.attr("x2",function(d){return d.target.x;});
					links.attr("y2",function(d){return d.target.y;});					
				});

	console.log(sim);
	console.log(nodeData);
	console.log(linkData);
	
	var x = d3.scaleLinear()
					.domain([10, 40])
					.range([0, w - 70])
					.clamp(true);
						
	var slider = svg.append("g")
			.attr("class", "slider")
			.attr("transform","translate("+50+","+50+")");
			
	slider.append("line")
	    .attr("class", "track")
	    .attr("x1", x.range()[0])
	    .attr("x2", x.range()[1])
		.attr("stroke-width", 10)
	  	.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    		.attr("class", "track-inset")
	  	.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
		    .attr("class", "track-overlay")
		    .call(d3.drag()
		        .on("start.interrupt", function() { slider.interrupt(); })
		        .on("start drag", function() { resizeNodes(x.invert(d3.event.x)); }));
	
	slider.insert("g", ".track-overlay")
	    .attr("class", "ticks")
	    .attr("transform", "translate(0," + 18 + ")")
	    .selectAll("text")
	    .data(x.ticks(10))
	    .enter()
	    .append("text")
	    .attr("x", x)
    	.attr("text-anchor", "middle");
	
	var handle = slider.insert("circle", ".track-overlay")
	    .attr("class", "handle")
	    .attr("r", 9);
	    
	function resizeNodes(h){ 
		handle.attr("cx", x(h));
		
		svg.selectAll("node").remove();
		svg.selectAll(".nodeText").remove();
		svg.selectAll(".nodeCircle").remove();

		nodes.append("circle")
			 .attr("r",h)
			 .attr("fill","red")
			 .attr("stroke","black")
			 .attr("class", "nodeCircle");
		
		nodes.append("text")
			.attr("text-anchor","middle")
			.attr("fill","black")
			.style("font-size", (h/2) + "px")
			.attr("class", "nodeText")
			.text(function(d){return d.name;});
			
		sim.restart();
	}


};

main();
