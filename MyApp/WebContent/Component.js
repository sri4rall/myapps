jQuery.sap.declare("MyApp.demo.Component");


sap.ui.core.UIComponent.extend("MyApp.demo.Component",{
  metadata:{
	  routing : {
			config : {
				//routerClass : MyApp.demo.MyRouter,
				viewType : sap.ui.core.mvc.ViewType.JS,
				viewPath : "MyApp.demo.view",
				targetAggregation :"detailPages",
				targetControl:"splitApp",
				clearTarget : false
			},
			routes : [
				{
					pattern:"SalesOrderCollection/{SO}",
					name : "Item",
					view : "Item",
//					targetAggregation : "masterPages",
					viewType : sap.ui.core.mvc.ViewType.XML

				},
				{
					pattern :"SalesOrderCollection/{SO}",
					name : "ItemDetail",
					view : "ItemDetail",
//					targetAggregation : "masterPages",
					viewType : sap.ui.core.mvc.ViewType.XML
				}
			]
		}
  }
	

});

MyApp.demo.Component.prototype.createContent=function(){

	// create root view
	var oView = sap.ui.view({
		id : "app",
		viewName : "MyApp.demo.view.App",
		type : "JS",
		viewData : { component : this }
	});	

	// Using a local model for offline development
	var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
	oView.setModel(oModel);
	var resourceModel = new sap.ui.model.resource.ResourceModel({
		bundleUrl:"i18n/translator.properties"});
	    oView.setModel(resourceModel,"i18n");
	    
		// set device model 
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : jQuery.device.is.phone, 
			isNoPhone: ! jQuery.device.is.phone, 
			listMode: (jQuery.device.is.phone) ? "None" : "SingleSelectMaster", 
		    listItemType: (jQuery.device.is.phone) ? "Active" : "Inactive" 
		
	}); 
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");     
	    
	    
	    
return 	oView;
	
};



MyApp.demo.Component.prototype.init=function(){
	jQuery.sap.require("sap.ui.core.routing.Router");  // load Router module
	 //jQuery.sap.require("sap.m.routing.RouteMatchedHandler");  // load RouteMatchedHandler module
	  //Initilaize the MainView
	 jQuery.sap.require("sap.ui.core.routing.History");
	 jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
	 
	sap.ui.core.UIComponent.prototype.init.apply(this);
var router = this.getRouter();

	//submitting route parameters to Routh Handler,which will help us to navigate further
this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
	//initializing the router
	router.initialize();
		
	};

	MyApp.demo.Component.prototype.distroy=function(){
	if(this.routeHandler){
		this.routeHandler.distroy();
	}	
	sap.ui.core.UIComponent.distroy.apply(this,arguments);	
	};
