pw.dev.olli	<- function()
{
	library(ape)
	library(htmlwidgets)
	library(phylowidget)
	library(devtools)
	code.dir	<- "/Users/Oliver/git/phylowidget"
	devtools::install(code.dir)
	
	newick	<- '(((IDPOP_57940|M|DOB_1982.42|2017.79:5.310678642,IDPOP_100355|F|DOB_2000.33|2019.42:6.940678642):4.079899099,IDPOP_55021|F|DOB_1980.77|2011.29:2.890577741):7.525940803,IDPOP_28039|M|DOB_1961.31|2018.69:17.81651854);'
	ph		<- read.newick(text=newick)
	plot(ph)
	
	phylowidget(newick)
}