HTMLWidgets.widget({

  name: 'phylowidget_with_tip_data',

  type: 'output',

  initialize: function(el, width, height) {

    var svg=d3.select(el).append("svg")
     .attr("width",width)
     .attr("height",height);
     
    var tree=d3.layout.phylotree(el).size ([height, width]).separation (function (a,b) {return 0;});
  
    return {"svg": svg, "tree": tree};
  },

  renderValue: function(el, x, instance) {
    var newick_string = x.nwk;
    var svg = instance.svg;
    var tree = instance.tree;
	var tipdata = x.tipdata;
	//console.log(tipdata)
  	//var dataLabels = d3.set(data.map(function(d, i){return d.LABEL})).values();  	
    //
    tree.node_span ('equal')
        .options ({'draw-size-bubbles' : false}, false)
        .font_size (14)
        .scale_bar_font_size (12)
        .node_circle_size (4);
	// lay out tree
	tree(d3_phylotree_newick_parser(newick_string)).svg(svg).layout();
    // olddata: get coordinates of tips
    // newdata: add tip data to the D3 tip objects
    var olddata = d3.selectAll(".node").data()
    var names = tipdata.map(function(d){return d.name})
    var newdata = olddata.map(function(d){
      var i = names.indexOf(d.name)
      if (i >=0){
        d.DATA = tipdata[i].DATA
      }
      return d
    })
    //console.log(newdata)
    // this is now ready to plot
    // TODO set up new area function that works on data
    /*
    var area = d3.svg.area()
    	.x(function(d,i) { return x(d.DATA.X[i]); })
    	.y0(1)
    	.y1(function(d,i) { return y(d.DATA.Y[i]); });
    */
    //  resize by number of tip nodes for whom we have an attribute in links
    var ntips= d3.selectAll(".node")[0].length;
    tree.spacing_x (tree.spacing_x() + ntips*10).update(true);
    // 	TODO use area function to display datajoin data to phylotree    
    //  svg.append("path").data(newdata).attr("class", "area").attr("d", area);
    this.makeResponsive(el);
  },

  resize: function(el, width, height, instance) {
    var svg=d3.select("#"+el.id+" svg")
     .attr("width",width)
     .attr("height",height);
    var tree = instance.tree;
    
	instance.tree.size ([height, width]).layout();
	//  resize by number of tip nodes
	var ntips= d3.selectAll(".node")[0].length;
	tree.spacing_x (tree.spacing_x() + ntips*10).update(true);
	//	DEV: show simply attributes of phylotree
	d3.selectAll(".node").append("text").attr("dy", "-1em").text(function(d){ return d.attribute})
  },
  
  makeResponsive: function(el){
     var svg = el.getElementsByTagName("svg")[0];
     if(svg){
      svg.setAttribute("viewBox", "0 0 " + svg.getAttribute("width") + " " + svg.getAttribute("height"))
      if(svg.width) {svg.removeAttribute("width")};
      if(svg.height) {svg.removeAttribute("height")};
      svg.style.width = "100%";
      svg.style.height = "100%";
     }
  }

});
