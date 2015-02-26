phylowidget.with_tip_data.dev	<- function()
{
	library(devtools)
	library(data.table)
	library(roxygen2)
	#	create dev tree
	newick		<- '(((IDPOP_57940:5.310678642,IDPOP_100355:6.940678642):4.079899099,IDPOP_55021:2.890577741):7.525940803,IDPOP_28039:17.81651854);'
	#	create dev data
	data.tip	<- list(	data.table(	LABEL= 'IDPOP_57940', VARIABLE= 'Infected', X=seq(0,3,by=1/10)	),
						data.table(	LABEL= 'IDPOP_100355', VARIABLE= 'Infected', X=seq(-1,2,by=1/10)	),
						data.table(	LABEL= 'IDPOP_55021', VARIABLE= 'Infected', X=seq(0,2,by=1/10)	),
						data.table(	LABEL= 'IDPOP_28039', VARIABLE= 'Infected', X=seq(0,.5,by=1/10)	)	)
	data.tip	<- do.call('rbind',data.tip)		
	data.tip[, Y:=1.]
	#	data for subset of tips
	data.tip	<- subset( data.tip, LABEL!='IDPOP_28039' )
	
	#library(ape)
	#ph		<- read.newick(text=newick)
	#plot(ph)	
	#phylowidget(newick)
	code.dir	<- "/Users/Oliver/git/phylowidget"
	roxygenize(code.dir)
	devtools::install(code.dir)
	phylowidget.with_tip_data(newick, data.tip)
}