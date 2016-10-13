const aux = {
	p(config){
		console.log(`${config.api} - ${config.moduleName}`);
	}
}

const Routes = {
	app: null,
	init(config){
		aux.p(config);
		this.app = config.appRef;
	}	
};

module.exports = Routes;