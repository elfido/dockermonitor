const express = require("express"),
	morgan = require("morgan"),
	pug = require("pug"),
	port = process.env.PORT || 3000,
	app = express();
	

class Application {
	
	_initViews(){
		let views = [
			{path: "", file: "index"}
		];
		views.forEach( (view)=>{
			app.get(`/${view.path}`, (req, res)=>{
				res.render( view.file );
			});
		});
	}
	
	_initRoutes(){
		let routes = [
			{moduleName: "Docker facade", path: "dockerAPI", api: "/docker"}
		];
		routes.forEach( (module)=>{
			let config = {
				moduleName: module.moduleName,
				api: module.api,
				appRef: app
			};
			this.modules[module.moduleName] = require(`./src/${module.path}/routes.js`);
			this.modules[module.moduleName].init( config );
		});
	}
	
	initExpress(){
		return new Promise( (resolve, reject)=>{
			this.modules = {};
			app.set("view engine", "pug");
			app.set("views", "src/templates");
			app.use(express.static("src/public"));
			this._initViews();
			this._initRoutes();
			resolve();
		});
	}
	
	constructor(){
		this.initExpress().then( ()=>{
			app.listen(port, ()=>{
				console.log(`Application started in port ${port}`);	
			});
		}).catch((err)=>{
			console.error(err);
			throw "Application cannot be started";
		});
	}
}

const App = new Application();