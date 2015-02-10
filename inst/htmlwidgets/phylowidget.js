HTMLWidgets.widget({

  name: 'phylowidget',

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

    tree.node_span ('equal')
        .options ({'draw-size-bubbles' : false}, false)
        .font_size (14)
        .scale_bar_font_size (12)
        .node_circle_size (4);

    tree(parsed_string).svg(svg).layout();
  },

  resize: function(el, width, height, instance) {
    var svg=d3.select("#"+el.id+" svg")
     .attr("width",width)
     .attr("height",height);
     
      instance.tree.size ([height, width]).layout();
  }
  
 
    

});
