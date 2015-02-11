#' Create interactive phylo
#'
#' phylowidget is the function to create your interactive view.  Just supply
#' a \code{Newick} string or \code{phylo} data as the parameter.
#'
#' @param nwk Newick string or \code{phylo} from the \code{\link[ape]{ape}} package.
#' @param width Integer in px to override the default width. The default width fills the browser window.
#' @param height Integer in px to override the default height. The default height fills the browser window.
#'
#' @examples
#' \dontrun{
#' library(phylowidget)
#' nwk <- "(((EELA:0.150276,CONGERA:0.213019):0.230956,(EELB:0.263487,CONGERB:0.202633):0.246917):0.094785,((CAVEFISH:0.451027,(GOLDFISH:0.340495,ZEBRAFISH:0.390163):0.220565):0.067778,((((((NSAM:0.008113,NARG:0.014065):0.052991,SPUN:0.061003,(SMIC:0.027806,SDIA:0.015298,SXAN:0.046873):0.046977):0.009822,(NAUR:0.081298,(SSPI:0.023876,STIE:0.013652):0.058179):0.091775):0.073346,(MVIO:0.012271,MBER:0.039798):0.178835):0.147992,((BFNKILLIFISH:0.317455,(ONIL:0.029217,XCAU:0.084388):0.201166):0.055908,THORNYHEAD:0.252481):0.061905):0.157214,LAMPFISH:0.717196,((SCABBARDA:0.189684,SCABBARDB:0.362015):0.282263,((VIPERFISH:0.318217,BLACKDRAGON:0.109912):0.123642,LOOSEJAW:0.397100):0.287152):0.140663):0.206729):0.222485,(COELACANTH:0.558103,((CLAWEDFROG:0.441842,SALAMANDER:0.299607):0.135307,((CHAMELEON:0.771665,((PIGEON:0.150909,CHICKEN:0.172733):0.082163,ZEBRAFINCH:0.099172):0.272338):0.014055,((BOVINE:0.167569,DOLPHIN:0.157450):0.104783,ELEPHANT:0.166557):0.367205):0.050892):0.114731):0.295021)"
#' phylowidget(nwk)
#'
#' library(ape)
#' data(bird.orders)
#' phylowidget(bird.orders)
#' }
#'
#' @import htmlwidgets
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
