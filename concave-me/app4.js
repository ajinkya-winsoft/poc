// Generate random points
var x = 100;
var y = 300;
//var points = [{x:x,y:y},{x:x,y:y-200},{x:x+150,y:y+150},{x:x-150,y:y+150}];//,{}][250;250][250;30][100;500][400;500]};
var points = [{x:x,y:y-200},{x:x,y:y},{x:x+100,y:y},{x:x-150,y:y},{x:x,y:y},{x:x,y:y+200}];//,{}][250;250][250;30][100;500][400;500]};
var pointsr=[];
var randomPoints = function(d){

	if(d.length==1){
		return null;
	}

	// Generate n number of points between given two points.
	for(i=1;i<d.length;i++){
		//Generate a line between these two points.

		//points (start and end points)
		var p = [d[i-1],d[i]];

		//length of line
		var len = Math.sqrt(Math.pow((d[i-1].y -d[i].y),2) + Math.pow((d[i-1].x -d[i].x),2));

		//slope of line
		var slope = Math.abs((d[i-1].y - d[i].y)/(d[i-1].x - d[i].x));
		console.log(slope);
		(slope==Infinity); //&& (slope = 1);

		//Calculate the intercept of line
		var c = d[i].y - (slope * d[i].x);

		//equation of line y = mx + c
		var y = function(x){
			return (slope * x)+c;
		}

		var x = function(y){
			return (y -c) / slope;
		}

		var y1,y2;

		//Vertical Line
		// Equation of line x = value ex:x=5
		// we will get diffrent y cordinates for our line
		if(slope=='Infinity'){
			// Determine which Y cordinate is smaller and which is greater
			(d[i].y <= d[i-1].y)?(y1 = d[i].y, y2 = d[i-1].y) :( y1 = d[i-1].y, y2 = d[i].y);

			//Generate all cordinates
			for(pt=y1;pt<=y2;pt=pt+10){
				var xx = d[i].x;
				pointsr.push([xx+Math.random()*50,pt]);
				pointsr.push([xx+Math.random()*50,pt])
			}

		}

		//Horizontal Line
		// Equation of line y = value ex:y=5
		// we will get diffrent x cordinates for our line
		if(slope==0){
			// Determine which x cordinate is smaller and which is greater
			(d[i].x <= d[i-1].x)?(y1 = d[i].x, y2 = d[i-1].x) :( y1 = d[i-1].x, y2 = d[i].x);

			//Generate all cordinates
			for(pt=y1;pt<=y2;pt=pt+10){
				var yy = d[i].y;
				pointsr.push([pt,yy+Math.random()*50]);
				pointsr.push([pt,yy+Math.random()*50])
			}

		}else{
			// Determine which x cordinate is smaller and which is greater
			(d[i].y <= d[i-1].y)?(y1 = d[i].y, y2 = d[i-1].y) :( y1 = d[i-1].y, y2 = d[i].y);
			console.log("arbitary");
			//Generate all cordinates
			for(pt=y1;pt<=y2;pt=pt+10){
				var xx = d[i].x;
				pointsr.push([x(xx)+Math.random()*50,pt]);
				pointsr.push([x(xx)+Math.random()*50,pt])
			}

		}




console.log(i);

		var line = d3.svg.line()
		 .interpolate("basis")
		 .x(function (d) { return d.x; })
		 .y(function (d) { return d.y});

		var svg = d3.select("body");

		var path = svg.append("path")
			.data(p)
			.attr("d", line);


		// function translateAlong(path) {
		 // var l = Math.sqrt(Math.pow((d[i-1].y -d[i].y),2) + Math.pow((d[i-1].x -d[i].x),2));
		  // return function(d, i, a) {
			// return function(t) {
			  // var p = path.getPointAtLength(t * l);
			  // pointsr.push([p.x,p.y]);
			// };
		  // };
		// }

		// translateAlong(path.node())
		//console.log(pointsr);




	}

}

randomPoints(points);
//points = pointsr;
//var vertices = points.map( function(d){return [d.x,d.y]});
var vertices = [[162, 332], [182, 299], [141, 292], [158, 264], [141, 408], [160, 400], [177, 430], [151, 442], [155, 425], [134, 430], [126, 447], [139, 466], [160, 471], [167, 447], [182, 466], [192, 442], [187, 413], [173, 403], [168, 425], [153, 413], [179, 275], [163, 292], [134, 270], [143, 315], [177, 320], [163, 311], [162, 281], [182, 255], [141, 226], [156, 235], [173, 207], [187, 230], [204, 194], [165, 189], [145, 201], [158, 167], [190, 165], [206, 145], [179, 153], [204, 114], [221, 138], [243, 112], [248, 139], [177, 122], [179, 99], [196, 82], [219, 90], [240, 75], [218, 61], [228, 53], [211, 34], [197, 51], [179, 65], [155, 70], [165, 85], [134, 80], [124, 58], [153, 44], [173, 34], [192, 27], [156, 19], [119, 32], [128, 17], [138, 36], [100, 58], [112, 73], [100, 92], [78, 100], [83, 78], [61, 63], [80, 44], [100, 26], [60, 39], [43, 71], [34, 54], [32, 90], [53, 104], [60, 82], [66, 99], [247, 94], [187, 180], [221, 168]];
var w = 960,
    h = 500,
    alpha = 50,


	offset = function(a,dx,dy) {
			return a.map(function(d) { return [d[0]+dx,d[1]+dy]; });
	},

    dsq = function(a,b) {
        var dx = a[0]-b[0], dy = a[1]-b[1];
        return dx*dx+dy*dy;
    },

    asq = alpha*alpha,


    // well, this is where the "magic" happens..
    mesh = d3.geom.delaunay(offset(pointsr,600,0)).filter(function(t) {
        return dsq(t[0],t[1]) < asq && dsq(t[0],t[2]) < asq && dsq(t[1],t[2]) < asq;
    });

var svg = d3.select("body")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "Blues");

	svg.append("g")
		.selectAll("circle")
			.data(pointsr)
		.enter().append("circle")
		.attr("r",2)
		.attr("cx", function(d) {return d[0]})
		.attr("cy", function(d) {return d[1]})
		.attr("fill","#900C3F");

svg.append("g")
  .selectAll("path")
    .data(d3.geom.delaunay(offset(pointsr,300,0)))
  .enter().append("path")
    .attr("d", function(d) { return "M" + d.join("L") + "Z"; });




	svg.append("g")
	   .selectAll("path")
		.data(mesh)
	   .enter().append("path")
	   .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
