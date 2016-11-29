// Staring with D3
// Engulphing Shapes.

// Create SVG container
var svgcontainer = d3.select("body").append("svg")
                                    .attr("width","100%")
                                    .attr("height","900px");

// Create Points
var points= [];
for (i = 0; i < 5; i++) {
      points.push({"x" : Math.random()*100+Math.random()*500,"y" :Math.random()*100+Math.random()*500});
}

// Draw Points
for(i=0;i<5;i++){
  var cicrcle = svgcontainer.append("circle")
                            .attr("cx", points[i].x)
                            .attr("cy", points[i].y)
                            .attr("r",10);
}

// Curve Points
// var distance = 40;
// var curvePoints= [];
// for (i = 0; i < points.length; i++) {
//
//       if(points[i].x)
//       // curvePoints.push({"x" : points[i].x-distance ,"y" : points[i].y});
//       // curvePoints.push({"x" : points[i].x+distance ,"y" : points[i].y});
//       // curvePoints.push({"x" : points[i].x ,"y" : points[i].y-distance});
//       // curvePoints.push({"x" : points[i].x ,"y" : points[i].y+distance});
// }

// for(i=0;i<20;i++){
//   var cicrcle = svgcontainer.append("circle")
//                             .attr("cx", curvePoints[i].x)
//                             .attr("cy", curvePoints[i].y)
//                             .attr("r",0);
// }

// Draw line
// var lineFunction = d3.area()
//                           .x(function(d) { return d.x; })
//                           .y1(function(d) { return d.y; })
//                           .y0(1)
//                           .curve(d3.curveCardinal);
//
//
//
// var lineGraph = svgcontainer.append("path")
//                             .attr("d", lineFunction(points))
//                             .attr("stroke", "blue")
//                             .attr("stroke-width", 2)
//                             .attr("fill", "lightsteelblue");

// Calculating min and max points for drawing rectangle
var minX = d3.min(points, function(d){ return d.x});
var minY = d3.min(points, function(d){ return d.y});

var maxX = d3.max(points, function(d){ return d.x});
var maxY = d3.max(points, function(d){ return d.y});

var lengthX = maxX-minX;
var lengthY = maxY-minY;


var distance = 40;
var curvePoints= [];
for (i = 0; i < points.length; i++) {

      if(points[i].x < minX+(lengthX/2)){
        if(points[i].y <minY+(lengthY/2))
          curvePoints.push({"x" : points[i].x-distance ,"y" : points[i].y-distance});
        else
          curvePoints.push({"x" : points[i].x-distance ,"y" : points[i].y+distance});
      }else{
        if(points[i].y <minY+(lengthY/2))
          curvePoints.push({"x" : points[i].x+distance ,"y" : points[i].y-distance});
        else
          curvePoints.push({"x" : points[i].x+distance ,"y" : points[i].y+distance});
      }

      // curvePoints.push({"x" : points[i].x-distance ,"y" : points[i].y});
      // curvePoints.push({"x" : points[i].x+distance ,"y" : points[i].y});
      // curvePoints.push({"x" : points[i].x ,"y" : points[i].y-distance});
      // curvePoints.push({"x" : points[i].x ,"y" : points[i].y+distance});
}
curvePoints.push(curvePoints[0]);

for(i=0;i<5;i++){
  var cicrcle = svgcontainer.append("circle")
                            .attr("cx", curvePoints[i].x)
                            .attr("cy", curvePoints[i].y)
                            .attr("r",2);
}


//Generate Random points around rectangle
//These random points will be used in generation
//of engulphing path.

innerlengthX = lengthX - 20;
innerlengthY = lengthY - 20;

// var outterRectangle = svgcontainer.append("ellipse")
//                             .attr("cx", minX+(lengthX/2))
//                             .attr("cy", minY+(lengthY/2))
//                             .attr("rx", lengthX/2 +10)
//                             .attr("ry", lengthY/2 +10)
//                             .attr("tramsform","rotate("+lengthY/lengthX+")")
//                             .attr("stroke", "blue")
//                             .attr("stroke-width", 2)
//                             .attr("fill", "none");

// var innerRectangle = svgcontainer.append("rect")
//                             .attr("x", minX + 10)
//                             .attr("y", minY + 10)
//                             .attr("width", innerlengthX)
//                             .attr("height", innerlengthY)
//                             .attr("stroke", "green")
//                             .attr("stroke-width", 2)
//                             .attr("fill", "none");

// console.log( d3.min(points, function(d,i){ return [d.x,i]}));
// console.log( d3.max(points, function(d,i){ return [d.x,i]}));
// console.log(points);
// points.splice( d3.min(points, function(d,i){ return [d.x,i]}),1);
// points.splice( d3.max(points, function(d,i){ return [d.x,i]}),1);
// console.log(points);
//
// var minX = d3.min(points, function(d){ return d.x});
// var minY = d3.min(points, function(d){ return d.y});
//
// var maxX = d3.max(points, function(d){ return d.x});
// var maxY = d3.max(points, function(d){ return d.y});
//
// var lengthX = maxX-minX;
// var lengthY = maxY-minY;

var line = d3.line()
             .x(function(d) { return d.x; })
             .y(function(d) { return d.y; })
             .curve(d3.curveCardinal);

var innerRectangle = svgcontainer.append("path")
                            .data(curvePoints)
                            .attr("d",line(curvePoints))
                            .attr("stroke", "green")
                            .attr("stroke-width", 2)
                            .attr("fill", "green")
                            .attr("fill-opacity",0.2);
