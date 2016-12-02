var app = angular.module("networkMapApp", []);

app.controller("mapController", function( $scope, $http){

  // Function for loading Map
  $scope.loadMap = function(){

      $http({
             method : "GET",
             url : "network-map.json"
         })
         .then( function(response){

           // Get All Device Info
           var devices = response.data.result.devices;
           // Get All Links Info
           var links = response.data.result.links;

           $scope.processDevices(devices);
           $scope.processLinks(links);
           //console.log(links);
         },function(resp){
           console.log("error");
         });
  };

// Function for Drawing Devices on Map
$scope.processDevices = function(devices){

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

    var svgcontainer = d3.select("body").append("svg")
                                      .attr("width","100%")
                                      .attr("height","900px")
                                  .append("g")
                                      .call(zoom)
                                      .call(drag);
function zoomed() {
  console.log("hi")
  svgcontainer.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("dragging", false);
}
    var ele =  svgcontainer.selectAll("circle")
                        .data(devices)
                        .enter();

    //Draw the Device (circle represent a device on Map)
    var circle = ele.append("circle")
                              .attr("cx", function(d) { return d.coordinateX; })
                              .attr("cy", function(d) { return d.coordinateY; })
                              .attr("r",10)
                              .attr("fill","#900C3F")
                              .call(drag);

                           ele.append("text")
                                .attr("x", function(d){return d.coordinateX-30;})
                                .attr("y", function(d){return d.coordinateY+40;})
                                .text(function(d){return d.name;});
    // Draw the Device Name ( Braw the text field below circle)

  };

//Draw links between connecting devices in Map
 $scope.processLinks = function(links){
   console.log(links);

 };


// Load the Map
$scope.loadMap();

});

//Laod the Network Map
