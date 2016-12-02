// Generate random points
var x = 400;
var y = 300;
var points = [{x:x,y:y},{x:x,y:y-200},{x:x+150,y:y+150},{x:x-150,y:y+150}];//,{}][250;250][250;30][100;500][400;500]};

var svgcontainer = d3.select("body").append("svg")
                                    .attr("width","100%")
                                    .attr("height","900px");



defaultHull = d3.geom.concaveHull().distance(100);
paddedHull = d3.geom.concaveHull().distance(100).padding(25);

//Drag Event
var drag = d3.behavior.drag()
    .on("drag", dragmove);
// Draw circles

 var circle = svgcontainer.selectAll("circle")
                           .data(points)
                           .enter().append("circle")
                             .attr("cx", function(d) { return d.x; })
                             .attr("cy", function(d) { return d.y; })
                             .attr("r",10)
                             .attr("fill","#900C3F")
                             .call(drag);

var hull = svgcontainer.append("path")
                  .attr("class", "hull");

var link = svgcontainer.append("path");

redraw();

//Compute convexHull



//DragMove event
function dragmove(d) {

  var x = d3.event.x;
  var y = d3.event.y;

  d3.select(this).attr("cx",d.x = x).attr("cy",d.y = y);

  redraw();

}



function redraw(){
  var linkPath = "M "+points[0].x+","+points[0].y+" L "+points[1].x+" "+points[1].y +
                 "M "+points[0].x+","+points[0].y+" L "+points[2].x+","+points[2].y +
                 "M "+points[0].x+","+points[0].y+" L "+points[3].x+","+points[3].y


link.data(points)
     .attr("d",linkPath)
     .attr("stroke","black")
     .attr("stroke-width","1.5px");

var vertices = points.map( function(d){return [d.x,d.y]});


var defaultHull = d3.geom.concaveHull().distance(100);
var paddedHull = d3.geom.concaveHull().distance(100).padding(25);

var a = d3.geom.hull(vertices);
hull
  .data(d3.geom.hull(vertices))
    .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
    .attr("stroke", "blue")
    .attr("stroke-width", 0)
    .attr("fill", "steelblue")
    .attr("fill-opacity",0.2);

// svgcontainer.selectAll("path")
//    .dataum(a)
//  .enter().insert("path", "circle")
//    .style("fill-opacity", 0.5)
//    .style("stroke", "pink")
//    .style("stroke-width", "1px");



}
