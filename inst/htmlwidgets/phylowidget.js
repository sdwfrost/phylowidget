HTMLWidgets.widget({

  name: 'phylowidget',

  type: 'output',

  initialize: function(el, width, height) {

    d3.select(el).append("svg")
     .attr("width",width)
     .attr("height",height);
     
    return d3.layout.phylotree(el);
  },

  renderValue: function(el, x, instance) {
    var newick_string = x.nwk;
    //console.log(x);
    var res = d3_phylotree_newick_parser(newick_string);
    // default_tree_settings(el);
    console.log(res);
    console.log(instance);
    console.log(el);
    instance(res).svg (d3.select("#"+el.id+" svg")).layout();
  },

  resize: function(el, width, height, instance) {

  },
  
  default_tree_settings: function(el) {
    el.branch_length (null);
    el.branch_name (null);
    el.node_span ('equal');
    el.options ({'draw-size-bubbles' : false}, false);
    el.style_nodes (node_colorizer);
    el.style_edges (edge_colorizer);
    el.selection_label (current_selection_name);
  }
});
