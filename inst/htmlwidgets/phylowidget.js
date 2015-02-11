HTMLWidgets.widget({

  name: 'phylowidget',

  type: 'output',

  initialize: function(el, width, height) {
    
    /* Set up toolbar */
    
    var toolbar=d3.select(el).append("div")
      .attr("class","btn-toolbar");
    
    var btngroup=toolbar.append("div")
      .attr("class","btn-group");
      
    var expandbutton=btngroup.append("button")
      .attr("type","button")
      .attr("class","btn btn-default btn-sm")
      .attr("id","expand_spacing")
      .attr("text","Expand spacing")
      .append("i")
      .attr("class","fa fa-expand");
      
    var compressbutton=btngroup.append("button")
      .attr("type","button")
      .attr("class","btn btn-default btn-sm")
      .attr("id","compress_spacing")
      .attr("text","Compress spacing")
      .append("i")
      .attr("class","fa fa-compress");
      
     var sortascbutton=btngroup.append("button")
      .attr("type","button")
      .attr("class","btn btn-default btn-sm")
      .attr("id","sort_ascending")
      .attr("text","Sort deepest clades to the bottom")
      .append("i")
      .attr("class","fa fa-sort-amount-asc");
      
    var sortdescbutton=btngroup.append("button")
      .attr("type","button")
      .attr("class","btn btn-default btn-sm")
      .attr("id","sort_descending")
      .attr("text","Sort deepest clades to the top")
      .append("i")
      .attr("class","fa fa-sort-amount-desc");
      
    var sortorigbutton=btngroup.append("button")
      .attr("type","button")
      .attr("class","btn btn-default btn-sm")
      .attr("id","sort_original")
      .attr("text","Restore original order")
      .append("i")
      .attr("class","fa fa-sort");
    
    /* Add selection widget */
    
    var inputgroupcontainer=d3.select(el).append("div")
      .attr("class","input-group");
    
    var inputgroup=inputgroupcontainer.append("span")
      .attr("class","input-group-btn");
      
    var inputmenubutton=inputgroup.append("button")
      .attr("type","button")
      .attr("class","btn btn-default dropdown-toggle")
      .attr("data-toggle","dropdown")
      .text("Tag ")
      .append("span")
      .attr("class","caret");
    
    var inputmenu=inputgroup.append("ul")
      .attr("class","dropdown-menu")
      .attr("id","selection_name_dropdown");

    var selectionnewbutton=inputmenu.append("li")
      .attr("id","selection_new")
      .append("a")
      .attr("href","#")
      .text("New selection set");
      
    var selectiondelbutton=inputmenu.append("li")
      .attr("id","selection_delete")
      .attr("class","disabled")
      .append("a")
      .attr("href","#")
      .text("Delete selection set");
    
    var selectionrenamebutton=inputmenu.append("li")
      .attr("id","selection_rename")
      .append("a")
      .attr("href","#")
      .text("Rename selection set");
      
    var selectionrenamebutton=inputmenu.append("li")
      .attr("class","divider");
    
    var selectionnamebox=inputgroupcontainer.append("input")
      .attr("type","text")
      .attr("class","form-control")
      .attr("value","Foreground")
      .attr("id","selection_name_box")
      .attr("disabled","true");
      
    var saveselectionspan=inputgroupcontainer.append("span")
      .attr("class","input-group-btn")
      .attr("id","save_selection_name")
      .attr("style","display: none");
      
    saveselectionspan.append("button")
      .attr("type","button")
      .attr("class","btn btn-default")
      .attr("id","cancel_selection_button")
      .text("Cancel")
      
    saveselectionspan.append("button")
      .attr("type","button")
      .attr("class","btn btn-default")
      .attr("id","save_selection_button")
      .text("Save")
    
    var selectionmenu=inputgroupcontainer.append("span")
      .attr("class","input-group-brn");
      
    selectionmenu.append("button")
      .attr("type","button")
      .attr("class","btn btn-default dropdown-toggle")
      .attr("data-toggle","dropdown")
      .text("Selection ")
      .append("span")
      .attr("class","caret");
      
    var selectionmenuitems=selectionmenu.append("ul")
      .attr("class","dropdown-menu");
      
    selectionmenuitems.append("li")
      .append("a")
      .attr("href","#")
      .attr("id","filter_add")
      .text("Add filtered nodes to selection");
      
    selectionmenuitems.append("li")
      .append("a")
      .attr("href","#")
      .attr("id","filter_remove")
      .text("Remove filtered nodes to selection");

    selectionmenuitems.append("li")
      .attr("class","divider");

    selectionmenuitems.append("li")
      .append("a")
      .attr("href","#")
      .attr("id","select_all_internal")
      .text("Select all internal nodes");
      
    selectionmenuitems.append("li")
      .append("a")
      .attr("href","#")
      .attr("id","select_all_leaves")
      .text("Select all leaf nodes");

    selectionmenuitems.append("li")
      .append("a")
      .attr("href","#")
      .attr("id","clear_internal")
      .text("Clear all internal nodes");

    selectionmenuitems.append("li")
      .append("a")
      .attr("href","#")
      .attr("id","clear_leaves")
      .text("Clear all leaves");

    selectionmenuitems.append("li")
      .append("a")
      .attr("href","#")
      .attr("id","select_none")
      .text("Clear selection");

    selectionmenuitems.append("li")
      .attr("class","divider");

    selectionmenuitems.append("li")
      .append("a")
      .attr("href","#")
      .attr("id","mp_label")
      .text("Label internal nodes using maximum parsimony");
      
    selectionmenuitems.append("li")
      .append("a")
      .attr("href","#")
      .attr("id","and_label")
      .text("Label internal nodes using conjunction (AND)");
   
     selectionmenuitems.append("li")
      .append("a")
      .attr("href","#")
      .attr("id","or_label")
      .text("Label internal nodes using disjunction (OR)");

    /* Add SVG tree container */
    
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

    tree(d3_phylotree_newick_parser(newick_string)).svg(svg).layout();
    
    /* Dynamic resize */
    this.makeResponsive(el);
    
    /* Add tools */
    
    $("#expand_spacing").on ("click", function (e) {
    tree.spacing_x (tree.spacing_x() + 1).update(true);
    });
    
    $("#compress_spacing").on ("click", function (e) {
    tree.spacing_x (tree.spacing_x() - 1).update(true);
    });

    function sort_nodes (asc) {
      tree.traverse_and_compute (function (n) {
        var d = 1;
        if (n.children && n.children.length) {
          d += d3.max (n.children, function (d) { return d["count_depth"];});
        }
        n["count_depth"] = d;
      });
      tree.resort_children (function (a,b) {
        return (a["count_depth"] - b["count_depth"]) * (asc ? 1 : -1);
      });
    }

    $("#sort_original").on ("click", function (e) {
      tree.resort_children (function (a,b) {
        return a["original_child_order"] - b["original_child_order"];
      });
    });

    $("#sort_ascending").on ("click", function (e) {
      sort_nodes (true);
    });

    $("#sort_descending").on ("click", function (e) {
      sort_nodes (false);
    });
    
    $("#mp_label").on ("click", function (e) {
      tree.max_parsimony (true);
    });


    $("#and_label").on ("click", function (e) {
      tree.internal_label (function (d) { return d.reduce (function (prev, curr) {return curr[current_selection_name] && prev; }, true)}, true);
    });

    $("#or_label").on ("click", function (e) {
      tree.internal_label (function (d) { return d.reduce (function (prev, curr) {return curr[current_selection_name] || prev; }, false)}, true);
    });

    $("#filter_add").on ("click", function (e) {
      tree.modify_selection (function (d) { return d.tag || d[current_selection_name];}, current_selection_name, false, true)
        .modify_selection (function (d) { return false; }, "tag", false, false);
    });

    $("#filter_remove").on ("click", function (e) {
      tree.modify_selection (function (d) { return !d.tag;});
    });

    $("#select_all").on ("click", function (e) {
      tree.modify_selection (function (d) { return true;});
    });

    $("#select_all_internal").on ("click", function (e) {
      tree.modify_selection (function (d) { return !d3_phylotree_is_leafnode (d.target);});
    });

    $("#select_all_leaves").on ("click", function (e) {
      tree.modify_selection (function (d) { return d3_phylotree_is_leafnode (d.target);});
    });

    $("#select_none").on ("click", function (e) {
      tree.modify_selection (function (d) { return false;});
    });

    $("#clear_internal").on ("click", function (e) {
      tree.modify_selection (function (d) { return d3_phylotree_is_leafnode (d.target) ? d.target[current_selection_name] : false;});
    });

    $("#clear_leaves").on ("click", function (e) {
      tree.modify_selection (function (d) { return !d3_phylotree_is_leafnode (d.target) ? d.target[current_selection_name] : false;});
    });
    
  },

  resize: function(el, width, height, instance) {
    var svg=d3.select("#"+el.id+" svg")
     .attr("width",width)
     .attr("height",height);
     
      instance.tree.size ([height, width]).layout();
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
