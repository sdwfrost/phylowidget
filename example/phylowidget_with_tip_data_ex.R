#
#	create example tree and example tip data
#
newick		<- '(((IDPOP_57940:5.310678642,IDPOP_100355:6.940678642):4.079899099,IDPOP_55021:2.890577741):7.525940803,IDPOP_28039:17.81651854);'
data.tip	<- list(	data.table(	LABEL= 'IDPOP_57940', VARIABLE= 'Infected', X=seq(0,3,by=1/10)	),
						data.table(	LABEL= 'IDPOP_100355', VARIABLE= 'Infected', X=seq(-1,2,by=1/10)	),
						data.table(	LABEL= 'IDPOP_55021', VARIABLE= 'Infected', X=seq(0,2,by=1/10)	),
						data.table(	LABEL= 'IDPOP_28039', VARIABLE= 'Infected', X=seq(0,.5,by=1/10)	)	)
data.tip	<- do.call('rbind',data.tip)		
data.tip[, Y:=1.]
data.tip	<- subset( data.tip, LABEL!='IDPOP_28039' )
#
#	run
#
phylowidget.with_tip_data(newick, data.tip)
