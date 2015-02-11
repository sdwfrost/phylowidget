library(shiny)
library(htmlwidgets)
library(phylowidget)

shinyServer(function(input,output){
  output$phylowidget <- renderPhylowidget(
    phylowidget(nwk)
  )
})
