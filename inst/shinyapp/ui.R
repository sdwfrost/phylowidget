library(shiny)
library(htmlwidgets)
library(phylowidget)

shinyUI(fluidPage(
  phylowidgetOutput("phylowidget")
))
