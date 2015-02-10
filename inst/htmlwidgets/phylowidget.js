HTMLWidgets.widget({

  name: 'phylowidget',

  type: 'output',

  initialize: function(el, width, height) {

    var svg=d3.select(el).append("svg")
     .attr("width",width)
     .attr("height",height);
     
    var tree=d3.layout.phylotree(el);
    
    return {"svg": svg, "tree": tree};
  },

  renderValue: function(el, x, instance) {
    var newick_string = x.nwk;
    var svg = instance.svg;
    var tree = instance.tree;
    var parsed_string = d3_phylotree_newick_parser(newick_string);
    tree.node_span ('equal');
    tree.options ({'draw-size-bubbles' : false}, false);
    tree.font_size (14);
    tree.scale_bar_font_size (12);
    tree.node_circle_size (4);
    tree.spacing_x (16, true);
    tree(parsed_string).svg(svg).layout();
  },

  resize: function(el, width, height, instance) {
    var svg=d3.select("#"+el.id+" svg")
     .attr("width",width)
     .attr("height",height);
  }
});
