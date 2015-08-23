sap.ui.jsview("MyApp.demo.view.App", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.App
	*/ 
	getControllerName : function() {
		return "MyApp.demo.view.App";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.App
	*/ 
	createContent : function(oController) {

		
		// to avoid scrollbars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		// create app
		this.App = new sap.m.SplitApp("splitApp");
		this.App.Router = sap.ui.core.UIComponent.getRouterFor(this);
		//alert("in mainview , createcontent method");
		// create the first page in both master and detail areas 
		
		
		
		var header = sap.ui.xmlview("header","MyApp.demo.view.Header");
		header.getController().nav = this.getController();
		this.App.addPage(header,true);
	
		//this.App.addPage(header,false);

		
		
		var empty = sap.ui.xmlview("empty","MyApp.demo.view.Empty");
		empty.getController().nav = this.getController();
		this.App.addPage(empty);
			
		//this.App.addPage(empty,false);
		//this.App.toDetail("MyApp.demo.view.Empty");
		//this.App.toMaster("MyApp.demo.view.Header");

		
		// navigate to the first page in both master and detail areas.
		// the toMaster must be called after calling the toDetail, because both of them point to the same reference in phone and 
		// the real first page that will be shown in phone is the page in master area. 
		//this.App.toDetail("Views.detail.Empty");
		//this.App.toMaster("Views.detail.Years");
		
		// done
		return this.App;		
		
		
	//	this.setDisplayBlock(true);
		
	//	this.App = new sap.m.App( );
	//	this.App = new sap.m.SplitApp("splitApp" );
		
		
	//	var header = sap.ui.xmlview("header","MyApp.demo.view.Header");
	//	header.getController().nav = this.getController();	
	//	this.App.addPage(header,true);

		
	//	var empty = sap.ui.xmlview("empty","MyApp.demo.view.Empty");
	//	empty.getController().nav = this.getController();	
	//	this.App.addPage(empty,false);
	//	var master = sap.ui.xmlview("Master", "sap.ui.demo.myFiori.view.Master");
	//	master.getController().nav = this.getController(); //storing the app controller in the Master view controller's varaible(nav)
	//	this.app.addPage(master, true); //adding the master view to app view
	//	this.App.to("header");	
		
	//return this.App;
		
//		header.getController().nav = this.getController();
		
//		var iteam = new sap.ui.xmlView({id:"header",view:"view.Item"});
// 		return new sap.m.Page({
//			title: "Title",
//			content: [
			
//			]
//		});
	}

});