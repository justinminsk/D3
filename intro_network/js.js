async function main(){
	
	
	var h = 1000;
	var w = 1200;
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w)
				.attr("height",h);
				
	var nodeData = [
        {name: "Roger"},
        {name: "Chad"},
        {name: "Afzal"},
        {name: "Don"},
        {name: "Chris"},
        {name: "Mahesh"},
        {name: "Steve"},
        {name: "Angela"},
        {name: "Bob"},
        {name: "Lauren"}
    ];
	
	var linkData = [
        {source: "Roger",target:"Chad"},
        {source: "Don",target:"Chad"},
        {source: "Roger",target:"Lauren"},
        {source: "Roger",target:"Bob"},
        {source: "Roger",target:"Don"},
        {source: "Roger",target:"Angela"},
        {source: "Don",target:"Lauren"},
        {source: "Don",target:"Bob"},
        {source: "Don",target:"Angela"},
        {source: "Lauren",target:"Chad"},
        {source: "Lauren",target:"Bob"},
        {source: "Lauren",target:"Angela"},
        {source: "Angela",target:"Chad"},
        {source: "Afzal",target:"Chad"},
        {source: "Afzal",target:"Chris"},
        {source: "Afzal",target:"Mahesh"},
        {source: "Afzal",target:"Steve"},
        {source: "Afzal",target:"Angela"},
        {source: "Steve",target:"Angela"},
        {source: "Steve",target:"Chad"},
        {source: "Steve",target:"Chris"},
        {source: "Steve",target:"Mahesh"},
        {source: "Angela",target:"Chad"},
        {source: "Angela",target:"Chris"},
        {source: "Angela",target:"Mahesh"},
        {source: "Chris",target:"Chad"},
        {source: "Chris",target:"Mahesh"},
        {source: "Mahesh",target:"Chad"}   
    ];
	
	var links = svg.selectAll("line")
					.data(linkData)
					.enter()
					.append("line")
					.attr("stroke","black")
					.attr("opacity",0.5);
	
	var nodes = svg.selectAll("g")
					.data(nodeData)
					.enter()
					.append("g");
					
	nodes.append("circle")
		 .attr("r",40)
		 .attr("fill","red")
		 .attr("stroke","black");
	
	nodes.append("text")
		.attr("text-anchor","middle")
		.attr("fill","white")
		.text(function(d){return d.name;});
					
	var sim = d3.forceSimulation()
				.nodes(nodeData)
				.force("center",d3.forceCenter(600,500))
				.force("manyBody",d3.forceManyBody().strength(-100))
				.force("collider",d3.forceCollide().radius(40))
				.force("links",d3.forceLink(linkData).id(function(d){return d.name;}).distance(100))
				.on("tick",function(){
					nodes.attr("transform",function(d){return "translate("+d.x+","+d.y+")";});
					links.attr("x1",function(d){return d.source.x;});
					links.attr("y1",function(d){return d.source.y;});
					links.attr("x2",function(d){return d.target.x;});
					links.attr("y2",function(d){return d.target.y;});
				});
	
	var drag = d3.drag()
					.on("start",function(nodes){
						nodes.opacity = 1;
						links.attr("opacity",function(d){
							if(d.source.name === d.name || d.target === d.name){
								return 1;
							}});
						nodes.attr("opacity",function(d){for(var i = 0; i<linkData.length; i++){
							if(linkData[i].source.name === d.name || linkData[i].target.name === d.name){
									return 1;
								}else{
									return 0.1;
									}
								}
							})
					})
					.on("drag",function(nodes){
						sim.alphaTarget(.9).restart();
						nodes.fx = d3.event.x;
						nodes.fy = d3.event.y;
					})
					.on("end",function(nodes){
						nodes.fx = null;
						nodes.fy = null;
						sim.alphaTarget(0);
						links.attr("opacity", 0.5);
					});
	
	drag(nodes);
	
	console.log(nodeData);
	console.log(linkData);


};

main();

			
	/*var circle = svg.append("circle")
		.attr("cy", 500)
		.attr("cx", 600)
		.attr("r", 40)
		.attr("fill", "white")
		.attr("stroke", "black");
		
	var drag = d3.drag()
		.on("start", function(){
			
			d3.select(this).attr("fill", "red");
			
		})
		.on("drag", function(){
			
			d3.select(this)
				.attr("cx", d3.event.x)
				.attr("cy", d3.event.y);
				
		}).on("end", function(){
			
			d3.select(this).attr("fill", "white");
			
		});
		
	drag(circle); */
