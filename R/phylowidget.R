#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
phylowidget <- function(nwk, width = NULL, height = NULL) {

  # try to convert if not character (assuming not Newick)
  if(class(nwk) %in% c("phylo","multiPhylo")){
    warning( "attempting conversion to Newick format", call. = F)
    if (requireNamespace("ape")) {
      nwk = ape::write.tree( nwk )
    } else {
      stop("If not Newick format, phylowidget require ape package.  Please install ape.")
    }
  }

  # forward options using x
  x = list(
    nwk=nwk
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'phylowidget',
    x,
    width = width,
    height = height,
    sizingPolicy = htmlwidgets::sizingPolicy(viewer.suppress = TRUE,
                                             browser.fill = TRUE,
                                             browser.padding = 0),
    package = 'phylowidget'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
phylowidgetOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'phylowidget', width, height, package = 'phylowidget')
}

#' Widget render function for use in Shiny
#'
#' @export
renderPhylowidget <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, phylowidgetOutput, env, quoted = TRUE)
}
