var width = 1200;
	height = 900;

var svg = d3.select('body').append('svg')
	.attr('width',width)
	.attr('height',height);


d3.json("network.json", function(error, graph) {
  	if (error) throw error;
	
	graph = graph.result;
	
	links = graph.links;	
	nodes = {};

	links.forEach(function(link) {
	  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
	  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
	});

	var force = d3.layout.force()
			.size([width,height])
			.nodes(d3.values(nodes))
			.links(links)
			.on('tick',tick)
			.linkDistance(300)
			.charge(-3000)
			.friction(0.1)
			.gravity(0.5)
			.start();

	var link = svg.selectAll('.link')
		.data(force.links())
		.enter().append('line')
		.attr('class','link')
		.attr("stroke-width", function(d) { return Math.sqrt(4); });

	var node =svg.selectAll('.node')
		.data(force.nodes())
		.enter().append('circle')
		.attr('class','node')
		.attr('r',width*0.010);

		// var text = svg.append("g").selectAll("text")
		//     .data(force.nodes())
		//   .enter().append("text")
		//     .attr("x", function(d){return d.x;})
		//     .attr("y", function(d){return d.y;})
		//     .text(function(d) { return d.name; });

	
	function tick(){

		node.attr('x', function(d){ return d.x;})
			.attr('y', function(d){ return d.y;})
			.call(force.drag);

		node.attr('cx', function(d){ return d.x;})
			.attr('cy', function(d){ return d.y;})
			.call(force.drag);

		link.attr('x1',function(d){return d.source.x;})
			.attr('y1',function(d){return d.source.y;})
			.attr('x2',function(d){return d.target.x;})
			.attr('y2',function(d){return d.target.y;});
	}


});