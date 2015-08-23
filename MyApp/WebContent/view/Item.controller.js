jQuery.sap.require("MyApp.demo.Formatter.Formatter");
jQuery.sap.require("sap.m.MessageBox"); 
jQuery.sap.require("sap.m.MessageToast"); 
sap.ui.controller("MyApp.demo.view.Item", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Item
*/
	onInit: function() {
		// Get instance of Router
	var app = sap.ui.getCore().byId("splitApp");
	this.oRouter = app.Router;
	//var appcontroller = app.getController();
		  // this.oRouter = sap.ui.core.UIComponent.getRouterFor(appcontroller);
		   //this.oRouter = sap.ui.core.routing.Router.getRouter("Router"); 
//Call 'attachRouteMatched method,which defines a function that gets called everytime 
//a 'RouteMatched' event is triggered by application			
		this.oRouter.attachRouteMatched(function(oEvent) { 
//get the name of the Route				
		  var sRoute = oEvent.getParameter("name"),
//Get the name of the target view			  
		      oView = oEvent.getParameter("view"); 
//As this method gets called for all routes defined in the applfOication we  have to
//make sure that code gets executed only for the route that we are interested in			  
		  if(sRoute == "Item")
			 {
//Define the binding path	
			  var spath = "/SalesOrderCollection/" + oEvent.getParameter('arguments').SO;
			 // var spath = "/SalesOrderCollection/" + oEvent.getParameter('arguments').SO + "/LineItems";
//Bind aggragation 'Items' of List with above defined path pass listitem with id 'idlistitem' as template				  
			  //oView.byId("iditem").bindItems(spath,oView.byId("cells"));
			  oView.bindObject(spath);
			 }

		});
		  
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Item
*/
onBeforeRendering:function(){
	this.byId("SupplierForm").bindElement("BusinessPartner");
},

handleApprove: function(evt){
	// show confirmation dialog 
	var bundle = this.getView().getModel("i18n").getResourceBundle(); 
	sap.m.MessageBox.confirm( 	
			bundle.getText("ApproveDialogMsg"), 
			function(oAction){ 
				if(sap.m.MessageBox.Action.OK === oAction) {
					// notify user 
					var successMsg = bundle.getText("ApproveDialogSuccessMsg");
					sap.m.MessageToast.show(successMsg); 
					// TODO call proper service method and update model (not part of this session)
					                         				}
				              },
            bundle.getText("ApproveDialogTitle")
);
},
handleNavButtonPress : function(evt){
//sap.ui.getCore().byId("splitApp").back("Header");
this.nav.back("Header");
//	window.history.go(-1);
},

handleLineItemPress : function (evt) {
	var context = evt.getSource().getBindingContext(); 
	this.nav.to("LineItem", context); 
}

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Item
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Item
*/
//	onExit: function() {
//
//	}

});