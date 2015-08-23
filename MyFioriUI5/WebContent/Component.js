jQuery.sap.declare("sap.ui.demo.myFiori.Component");

sap.ui.core.UIComponent.extend("sap.ui.demo.myFiori.Component", {
	metadata:{
		name: "MyFiori",
		version: "1.0",
		includes: [],
		dependencies: {
			libs: ["sap.m","sap.ui.layout"],
			components: []
		},

		rootView: "sap.ui.demo.myFiori.view.App",

		config: {
			resourceBundle: "i18n/messageBundle.properties",
			serviceConfig: {
				name: "MockModel",
				serviceUrl: "model/mock.json"
			}
		}
	}
});

sap.ui.demo.myFiori.Component.prototype.init=function(){

	  sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
	  var mConfig = this.getMetadata().getConfig();
	 
//Always use absolute paths relative to our own component
//(relative paths will fail if running in the Fiori Launchpad)
	  var oRootPath = jQuery.sap.getModulePath("sap.ui.demo.myFiori");

//Set i18n model
	  var i18nModel = new sap.ui.model.resource.ResourceModel({
	  bundleUrl : [oRootPath, mConfig.resourceBundle].join("/")
	  });

	  this.setModel(i18nModel, "i18n");

	  var sServiceUrl = mConfig.serviceConfig.serviceUrl;

//This code is only needed for testing the application when there is no local proxy available
	//  var bIsMocked = jQuery.sap.getUriParameters().get("responderOn") === "true";
	  // Start the mock server for the domain model
	//  if (bIsMocked) {
	  sap.ui.demo.myFiori.Component._startMockServer(sServiceUrl);
	//  }

	  // Create and set domain model to the component
	 // var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true); 
	  oModel = new sap.ui.model.json.JSONModel(sServiceUrl);
	  oModel = new sap.ui.model.json.JSONModel("model/mock.json");
	  sap.ui.getCore().byId("app").setModel(oModel);
	  //this.setModel(oModel);


	  
	  
};

sap.ui.demo.myFiori.Component._startMockServer=function(sServiceUrl) {
	jQuery.sap.require("sap.ui.core.util.MockServer");
	var oMockServer = new sap.ui.core.util.MockServer({ rootUri: sServiceUrl});
	
	//var iDelay = +(jQuery.sap.getUriParameters().get("responderDelay") || 0);
	//sap.ui.core.util.MockServer.config({autoRespondAfter: iDelay });
	
	
	oMockServer.simulate("model/metadata.xml", "model/");
	oMockServer.start();

	sap.m.MessageToast.show("Running in demo mode with mock data.", {
		duration: 4000
	});
	
	
	
};	  



sap.ui.demo.myFiori.Component.prototype.createContent=function(){

	// create root view
	var oView = sap.ui.view({
		id : "app",
		viewName : "sap.ui.demo.myFiori.view.App",
		type : "JS",
		viewData : { component : this }
	});

	// set i18n model
//	var i18nModel = new sap.ui.model.resource.ResourceModel({bundleUrl : "i18n/messageBundle.properties" });
//	oView.setModel(i18nModel, "i18n");

//	// Using OData model to connect against a real service
//	var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//	var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//	oView.setModel(oModel);

	// Using a local model for offline development
	var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
	//var oModel = this.oModel;
	oView.setModel(oModel);

	// set device model
	var deviceModel = new sap.ui.model.json.JSONModel({
		isPhone : jQuery.device.is.phone,
		listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
		listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
	});
	deviceModel.setDefaultBindingMode("OneWay");
	oView.setModel(deviceModel, "device");

	// done
//	return oView;
};



