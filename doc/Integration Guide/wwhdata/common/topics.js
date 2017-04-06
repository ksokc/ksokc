/*
 *   Title: TopicUtils-JavaScript.js
 *   
 *  JavaScript related to the TopicUtils code. This file gets COPIED into the output webworks files to support
 *  the link to this page code.
 */

 
// extracts the src=myfilename from the URL
function Guidewire_ExtractSrcFromURL() {
	var VarDocumentURL = window.WWHFrame.location;
	var TheParametersArray = VarDocumentURL.hash.split("&");
	var thisParam;
	var FMSourceFile = "UNKNOWN_FRAMEMAKER_SOURCE_FILE";

	k = TheParametersArray.length;
	for (i= 0 ; i < k; i++) {
	   thisParam = unescape(TheParametersArray[i]);
	   if (thisParam.search(/^src=/) != -1) {
		  FMSourceFile = thisParam.substring(4); // strip off the "src=" at the beginning
		}
	 }
	return FMSourceFile;
}

// takes a file name of format "myfilename.4.3" and gets the beginning part and returns "myfilename" only
function Guidewire_FMSourceFileExtract(FullFileName)
{
  var VarSplitURL= FullFileName.split(".");
  return VarSplitURL[0];
}

// is the src=myfile arg from the URL (which means it was from myfile.fm) match the desired file
// generally speaking we do not care since we just want it unique per book
// so we just say yes, but we say false if it's a special file that allows duplicates in one book
function Guidewire_FMSourceFileMatch(FROM_URL,LOCAL_FILENAME) {
	var varFileURL = FROM_URL.toLowerCase();
	var varFileActual = LOCAL_FILENAME.toLowerCase();

	// SPECIAL CASE FOR UPGRADE GUIDE PROCEDURES -- BASICALLY 
	if (varFileURL.search(/^procedure-/) != -1) {
	  if  (varFileActual.search(/^procedure-/) != -1)  { 
		  return (varFileURL == Guidewire_FMSourceFileExtract(varFileActual)); 
		} else { 
		 return false; 
	   }
	 }
	else {
	   // basically, the default is to say they match... 
	   // if it's one of these specially-handled files, just let it work  
	   return true; 
	}
}


// this function takes a topic Name and converts it to a simpler string, such as underscores instead of space chars
// This is also important because FrameMaker + ePubs's  native handling of topic alias names mirror this behavior
//
// IMPORTANT: IF YOU CHANGE THIS CODE IN CONTROLS.JS (IN TEMPLATE OVERRIDES), ALSO CHANGE THE MIRROR FUNCTION IN TOPICUTILS-JAVASCRIPT.JS
// IMPORTANT: IF YOU CHANGE THIS CODE IN TOPICUTILS.FSL, ALSO CHANGE THE MIRROR FUNCTION IN CONTROLS.JS (IN TEMPLATE OVERRIDES)
// THE CONTROLS.JS FUNCTION ENCODES THE URL, AND THIS FUNCTION ENCODES it and compares against the input string with the full name for each topic (potentially with funny characters)
function Guidewire_SafeTopicName(theTitle) {
theTitle = theTitle.replace(/ /g, "_");  // converts space char
theTitle = theTitle.replace(/\u00a0/g, "_");  // converts nbsp char
// censor (remove) characters that mess up epublisher in URLs: forward slash, backslash, question mark, &amp;
theTitle= theTitle.replace(/[\\\/\?]/g, "");
theTitle = theTitle.replace(/&/g, "");
theTitle = theTitle.replace(/\u201c/g, ""); // double quote smart L
theTitle = theTitle.replace(/\u201d/g, "");// double quote smart R
theTitle = theTitle.replace(/\u2018/g, "");// single quote smart L
theTitle = theTitle.replace(/\u2019/g, "");// single quote smart R
theTitle = theTitle.replace(/\u2022/g, "");// trademark
theTitle = theTitle.replace(/'/g, "");// apparently a dumb single quote gets stripped by webworks
theTitle = theTitle.replace(/"/g, "");// to be safe let us strip double quotes too
theTitle = theTitle.replace(/\</g, "(");  // open bracket
theTitle = theTitle.replace(/\>/g, ")");   // close bracket
theTitle = theTitle.replace(/:/g, "_");    // colon
theTitle = theTitle.replace(/&/g, "");
return (theTitle);  }




function Guidewire_TopicMatch(FROMEPUB,WHATTOMATCH) {
var varLower1 = FROMEPUB.toLowerCase();
var varLower2 = WHATTOMATCH.toLowerCase();
var varLower2Safe = Guidewire_SafeTopicName(varLower2)

// match positively if they naturally match, or they match the safe version (convert spaces to underscores...)
var varMatches = (varLower1 == varLower2 || varLower1 == Guidewire_SafeTopicName(varLower2))

// console.log(Guidewire_TopicMatch, varLower1, varLower2, varLower2Safe, varMatches)
return varMatches
}
function GUIDEWIRE_TOPIC_TO_FILE(TOPIC, SRCFILE) { 
if (Guidewire_TopicMatch(TOPIC,"cover")) return "index.html"

else if (Guidewire_TopicMatch(TOPIC,"Guidewire PolicyCenter\u00ae") && Guidewire_FMSourceFileMatch(SRCFILE,"cover-integration.html") ) { return "cover-integration.html";}
else if (Guidewire_TopicMatch(TOPIC,"About PolicyCenter Documentation") && Guidewire_FMSourceFileMatch(SRCFILE,"about.html") ) { return "about.html";}
else if (Guidewire_TopicMatch(TOPIC,"Planning Integration Projects") && Guidewire_FMSourceFileMatch(SRCFILE,"p-overview.html") ) { return "p-overview.html";}
else if (Guidewire_TopicMatch(TOPIC,"Integration Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"overview.04.1.html") ) { return "overview.04.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Overview of Integration Methods") && Guidewire_FMSourceFileMatch(SRCFILE,"overview.04.2.html") ) { return "overview.04.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"PolicyCenter Integration Elements") && Guidewire_FMSourceFileMatch(SRCFILE,"overview.04.3.html") ) { return "overview.04.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Important Information about PolicyCenter Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"overview.04.4.html") ) { return "overview.04.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Preparing for Integration Development") && Guidewire_FMSourceFileMatch(SRCFILE,"overview.04.5.html") ) { return "overview.04.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Integration Documentation Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"overview.04.6.html") ) { return "overview.04.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Regenerating Integration Libraries and WSDL") && Guidewire_FMSourceFileMatch(SRCFILE,"overview.04.7.html") ) { return "overview.04.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"What are Required Files for Integration Programmers") && Guidewire_FMSourceFileMatch(SRCFILE,"overview.04.8.html") ) { return "overview.04.8.html";}
else if (Guidewire_TopicMatch(TOPIC,"Public IDs and Integration Code") && Guidewire_FMSourceFileMatch(SRCFILE,"overview.04.9.html") ) { return "overview.04.9.html";}
else if (Guidewire_TopicMatch(TOPIC,"Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"p-webservices.html") ) { return "p-webservices.html";}
else if (Guidewire_TopicMatch(TOPIC,"Web Services Introduction") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices.06.1.html") ) { return "webservices.06.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"What are Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices.06.2.html") ) { return "webservices.06.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"What Happens During a Web Service Call") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices.06.3.html") ) { return "webservices.06.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reference of All Built-in Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices.06.4.html") ) { return "webservices.06.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Publishing Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.01.html") ) { return "webservices-wsi-publish.07.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Web Service Publishing Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.02.html") ) { return "webservices-wsi-publish.07.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Web Service Publishing Quick Reference") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.03.html") ) { return "webservices-wsi-publish.07.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Publishing and Configuring a Web Service") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.04.html") ) { return "webservices-wsi-publish.07.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Testing Web Services with Local WSDL") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.05.html") ) { return "webservices-wsi-publish.07.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Generating WSDL") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.06.html") ) { return "webservices-wsi-publish.07.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Adding Advanced Security Layers to a Web Service") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.07.html") ) { return "webservices-wsi-publish.07.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Web Services Authentication Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.08.html") ) { return "webservices-wsi-publish.07.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Checking for Duplicate External Transaction IDs") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.09.html") ) { return "webservices-wsi-publish.07.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Request or Response XML Structural Transformations") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.10.html") ) { return "webservices-wsi-publish.07.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reference Additional Schemas in Your Published WSDL") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.11.html") ) { return "webservices-wsi-publish.07.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Validate Requests Using Additional Schemas as Parse Options") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.12.html") ) { return "webservices-wsi-publish.07.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Invocation Handlers for Implementing Preexisting WSDL") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.13.html") ) { return "webservices-wsi-publish.07.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Locale Support") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.14.html") ) { return "webservices-wsi-publish.07.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Setting Response Serialization Options, Including Encodings") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.15.html") ) { return "webservices-wsi-publish.07.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Exposing Typelists and Enumerations as String Values") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.16.html") ) { return "webservices-wsi-publish.07.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"Transforming a Generated Schema") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.17.html") ) { return "webservices-wsi-publish.07.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"Login Authentication Confirmation") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.18.html") ) { return "webservices-wsi-publish.07.18.html";}
else if (Guidewire_TopicMatch(TOPIC,"Stateful Session Affinity Using Cookies") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.19.html") ) { return "webservices-wsi-publish.07.19.html";}
else if (Guidewire_TopicMatch(TOPIC,"Calling a PolicyCenter Web Service from Java") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.20.html") ) { return "webservices-wsi-publish.07.20.html";}
else if (Guidewire_TopicMatch(TOPIC,"Adding HTTP Basic Authentication in Java") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.21.html") ) { return "webservices-wsi-publish.07.21.html";}
else if (Guidewire_TopicMatch(TOPIC,"Adding SOAP Header Authentication in Java") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-wsi-publish.07.22.html") ) { return "webservices-wsi-publish.07.22.html";}
else if (Guidewire_TopicMatch(TOPIC,"Calling Web Services from Gosu") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-wsi-consuming.08.1.html") ) { return "webservice-wsi-consuming.08.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Adding Configuration Options") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-wsi-consuming.08.2.html") ) { return "webservice-wsi-consuming.08.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"One-Way Methods") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-wsi-consuming.08.3.html") ) { return "webservice-wsi-consuming.08.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Asynchronous Methods") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-wsi-consuming.08.4.html") ) { return "webservice-wsi-consuming.08.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"MTOM Attachments with Gosu as Web Service Client") && Guidewire_FMSourceFileMatch(SRCFILE,"webservice-wsi-consuming.08.5.html") ) { return "webservice-wsi-consuming.08.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"General Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-general.09.1.html") ) { return "webservices-general.09.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Mapping Typecodes to External System Codes") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-general.09.2.html") ) { return "webservices-general.09.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Importing Administrative Data") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-general.09.3.html") ) { return "webservices-general.09.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Maintenance Tools Web Service") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-general.09.4.html") ) { return "webservices-general.09.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"System Tools Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-general.09.5.html") ) { return "webservices-general.09.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Workflow Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-general.09.6.html") ) { return "webservices-general.09.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Profiling Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-general.09.7.html") ) { return "webservices-general.09.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Account and Policy Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.01.html") ) { return "webservices-policy.10.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Account Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.02.html") ) { return "webservices-policy.10.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Job Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.03.html") ) { return "webservices-policy.10.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Cancellation and Reinstatement Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.04.html") ) { return "webservices-policy.10.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Submission Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.05.html") ) { return "webservices-policy.10.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Producer Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.06.html") ) { return "webservices-policy.10.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Product Model Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.07.html") ) { return "webservices-policy.10.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.08.html") ) { return "webservices-policy.10.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Add Activity from Pattern") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.09.html") ) { return "webservices-policy.10.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Period Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.10.html") ) { return "webservices-policy.10.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Earned Premium Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.11.html") ) { return "webservices-policy.10.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Import Policy Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.12.html") ) { return "webservices-policy.10.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Change Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.13.html") ) { return "webservices-policy.10.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Renewal Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.14.html") ) { return "webservices-policy.10.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Starting Renewals on Existing Policies") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.15.html") ) { return "webservices-policy.10.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Importing a Policy for Renewal") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.16.html") ) { return "webservices-policy.10.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Renewal Methods for Billing Systems") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.17.html") ) { return "webservices-policy.10.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"Archiving Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.18.html") ) { return "webservices-policy.10.18.html";}
else if (Guidewire_TopicMatch(TOPIC,"Quote Purging Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"webservices-policy.10.19.html") ) { return "webservices-policy.10.19.html";}
else if (Guidewire_TopicMatch(TOPIC,"Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"p-plugins.html") ) { return "p-plugins.html";}
else if (Guidewire_TopicMatch(TOPIC,"Plugin Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.01.html") ) { return "plugins.12.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Overview of PolicyCenter Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.02.html") ) { return "plugins.12.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Error Handling in Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.03.html") ) { return "plugins.12.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Temporarily Disabling a Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.04.html") ) { return "plugins.12.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Example Gosu Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.05.html") ) { return "plugins.12.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Special Notes For Java Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.06.html") ) { return "plugins.12.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Getting Plugin Parameters from the Plugins Registry Editor") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.07.html") ) { return "plugins.12.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Writing Plugin Templates For Plugins That Take Template Data") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.08.html") ) { return "plugins.12.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Plugin Registry APIs") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.09.html") ) { return "plugins.12.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Plugin Thread Safety") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.10.html") ) { return "plugins.12.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reading System Properties in Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.11.html") ) { return "plugins.12.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Do Not Call Local Web Services From Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.12.html") ) { return "plugins.12.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Creating Unique Numbers in a Sequence") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.13.html") ) { return "plugins.12.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Restarting and Testing Tips for Plugin Developers") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.14.html") ) { return "plugins.12.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Summary of All PolicyCenter Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins.12.15.html") ) { return "plugins.12.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Account and Policy Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.01.html") ) { return "plugins-policy.13.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Number Generator Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.02.html") ) { return "plugins-policy.13.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Account Plugin Details") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.03.html") ) { return "plugins-policy.13.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Job Process Creation Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.04.html") ) { return "plugins-policy.13.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Job Number Generator Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.05.html") ) { return "plugins-policy.13.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Term Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.06.html") ) { return "plugins-policy.13.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Period Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.07.html") ) { return "plugins-policy.13.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Loss History Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.08.html") ) { return "plugins-policy.13.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Location Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.09.html") ) { return "plugins-policy.13.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.10.html") ) { return "plugins-policy.13.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Effective Time Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.11.html") ) { return "plugins-policy.13.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Payment Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.12.html") ) { return "plugins-policy.13.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Underwriting Company Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.13.html") ) { return "plugins-policy.13.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Evaluation Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.14.html") ) { return "plugins-policy.13.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Renewal Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.15.html") ) { return "plugins-policy.13.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Notification Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.16.html") ) { return "plugins-policy.13.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reference Date Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.17.html") ) { return "plugins-policy.13.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"Audit Schedule Selector Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.18.html") ) { return "plugins-policy.13.18.html";}
else if (Guidewire_TopicMatch(TOPIC,"Proration Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.19.html") ) { return "plugins-policy.13.19.html";}
else if (Guidewire_TopicMatch(TOPIC,"Motor Vehicle Record (MVR) Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.20.html") ) { return "plugins-policy.13.20.html";}
else if (Guidewire_TopicMatch(TOPIC,"Writing a Motor Vehicle Record Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.21.html") ) { return "plugins-policy.13.21.html";}
else if (Guidewire_TopicMatch(TOPIC,"Populator Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.22.html") ) { return "plugins-policy.13.22.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Hold Job Evaluation Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.23.html") ) { return "plugins-policy.13.23.html";}
else if (Guidewire_TopicMatch(TOPIC,"Quote Purging Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.24.html") ) { return "plugins-policy.13.24.html";}
else if (Guidewire_TopicMatch(TOPIC,"ETL Product Model Loader Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-policy.13.25.html") ) { return "plugins-policy.13.25.html";}
else if (Guidewire_TopicMatch(TOPIC,"Authentication Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"authentication.14.1.html") ) { return "authentication.14.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Overview of User Authentication Interfaces") && Guidewire_FMSourceFileMatch(SRCFILE,"authentication.14.2.html") ) { return "authentication.14.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"User Authentication Source Creator Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"authentication.14.3.html") ) { return "authentication.14.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"User Authentication Service Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"authentication.14.4.html") ) { return "authentication.14.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Deploying User Authentication Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"authentication.14.5.html") ) { return "authentication.14.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Database Authentication Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"authentication.14.6.html") ) { return "authentication.14.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"ContactManager Authentication") && Guidewire_FMSourceFileMatch(SRCFILE,"authentication.14.7.html") ) { return "authentication.14.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Document Management") && Guidewire_FMSourceFileMatch(SRCFILE,"documentsforms.15.01.html") ) { return "documentsforms.15.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Document Management Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"documentsforms.15.02.html") ) { return "documentsforms.15.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Choices for Storing Document Content and Metadata") && Guidewire_FMSourceFileMatch(SRCFILE,"documentsforms.15.03.html") ) { return "documentsforms.15.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Document Storage Plugin Architecture") && Guidewire_FMSourceFileMatch(SRCFILE,"documentsforms.15.04.html") ) { return "documentsforms.15.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Implementing a Document Content Source for External DMS") && Guidewire_FMSourceFileMatch(SRCFILE,"documentsforms.15.05.html") ) { return "documentsforms.15.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Storing Document Metadata In an External DMS") && Guidewire_FMSourceFileMatch(SRCFILE,"documentsforms.15.06.html") ) { return "documentsforms.15.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"The Built-in Document Storage Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"documentsforms.15.07.html") ) { return "documentsforms.15.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Asynchronous Document Storage") && Guidewire_FMSourceFileMatch(SRCFILE,"documentsforms.15.08.html") ) { return "documentsforms.15.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"APIs to Attach Documents to Business Objects") && Guidewire_FMSourceFileMatch(SRCFILE,"documentsforms.15.09.html") ) { return "documentsforms.15.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Retrieval and Rendering of PDF or Other Input Stream Data") && Guidewire_FMSourceFileMatch(SRCFILE,"documentsforms.15.10.html") ) { return "documentsforms.15.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Document Production") && Guidewire_FMSourceFileMatch(SRCFILE,"documentproduction.16.1.html") ) { return "documentproduction.16.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Document Production Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"documentproduction.16.2.html") ) { return "documentproduction.16.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Document Template Descriptors") && Guidewire_FMSourceFileMatch(SRCFILE,"documentproduction.16.3.html") ) { return "documentproduction.16.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Generating Documents from Gosu") && Guidewire_FMSourceFileMatch(SRCFILE,"documentproduction.16.4.html") ) { return "documentproduction.16.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Template Web Service APIs") && Guidewire_FMSourceFileMatch(SRCFILE,"documentproduction.16.5.html") ) { return "documentproduction.16.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Geographic Data Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"geocoding.17.1.html") ) { return "geocoding.17.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Geocoding Plugin Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"geocoding.17.2.html") ) { return "geocoding.17.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Steps to Deploy a Geocoding Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"geocoding.17.3.html") ) { return "geocoding.17.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Writing a Geocoding Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"geocoding.17.4.html") ) { return "geocoding.17.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Geocoding an Address") && Guidewire_FMSourceFileMatch(SRCFILE,"geocoding.17.5.html") ) { return "geocoding.17.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Getting Driving Directions") && Guidewire_FMSourceFileMatch(SRCFILE,"geocoding.17.6.html") ) { return "geocoding.17.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Getting a Map for an Address") && Guidewire_FMSourceFileMatch(SRCFILE,"geocoding.17.7.html") ) { return "geocoding.17.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Getting an Address from Coordinates (Reverse Geocoding)") && Guidewire_FMSourceFileMatch(SRCFILE,"geocoding.17.8.html") ) { return "geocoding.17.8.html";}
else if (Guidewire_TopicMatch(TOPIC,"Geocoding Status Codes") && Guidewire_FMSourceFileMatch(SRCFILE,"geocoding.17.9.html") ) { return "geocoding.17.9.html";}
else if (Guidewire_TopicMatch(TOPIC,"Encryption Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"encryption.18.1.html") ) { return "encryption.18.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Encryption Integration Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"encryption.18.2.html") ) { return "encryption.18.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Changing Your Encryption Algorithm Later") && Guidewire_FMSourceFileMatch(SRCFILE,"encryption.18.3.html") ) { return "encryption.18.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Management Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"management.19.1.html") ) { return "management.19.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Management Integration Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"management.19.2.html") ) { return "management.19.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"The Abstract Management Plugin Interface") && Guidewire_FMSourceFileMatch(SRCFILE,"management.19.3.html") ) { return "management.19.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Integrating With the Included JMX Management Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"management.19.4.html") ) { return "management.19.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Other Plugin Interfaces") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.01.html") ) { return "plugins-other.20.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Territory Code Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.02.html") ) { return "plugins-other.20.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Vehicle Identification Number Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.03.html") ) { return "plugins-other.20.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Automatic Address Completion and Fill-in Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.04.html") ) { return "plugins-other.20.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Phone Number Normalizer Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.05.html") ) { return "plugins-other.20.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Testing Clock Plugin (Only For Non-Production Servers)") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.06.html") ) { return "plugins-other.20.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Work Item Priority Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.07.html") ) { return "plugins-other.20.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Official IDs Mapped to Tax IDs Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.08.html") ) { return "plugins-other.20.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Preupdate Handler Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.09.html") ) { return "plugins-other.20.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Defining Base URLs for Fully-Qualified Domain Names") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.10.html") ) { return "plugins-other.20.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Exception and Escalation Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-other.20.11.html") ) { return "plugins-other.20.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Startable Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-startable.21.1.html") ) { return "plugins-startable.21.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Startable Plugins Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-startable.21.2.html") ) { return "plugins-startable.21.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Writing a Startable Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-startable.21.3.html") ) { return "plugins-startable.21.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Startable Plugins and Run Levels") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-startable.21.4.html") ) { return "plugins-startable.21.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Configuring Startable Plugins to Run on All Servers") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-startable.21.5.html") ) { return "plugins-startable.21.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Java and Startable Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-startable.21.6.html") ) { return "plugins-startable.21.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Persistence and Startable Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"plugins-startable.21.7.html") ) { return "plugins-startable.21.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Multi-threaded Inbound Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"inbound-integration.22.1.html") ) { return "inbound-integration.22.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Multi-threaded Inbound Integration Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"inbound-integration.22.2.html") ) { return "inbound-integration.22.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Inbound Integration Configuration XML File") && Guidewire_FMSourceFileMatch(SRCFILE,"inbound-integration.22.3.html") ) { return "inbound-integration.22.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Inbound File Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"inbound-integration.22.4.html") ) { return "inbound-integration.22.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Inbound JMS Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"inbound-integration.22.5.html") ) { return "inbound-integration.22.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Custom Inbound Integrations") && Guidewire_FMSourceFileMatch(SRCFILE,"inbound-integration.22.6.html") ) { return "inbound-integration.22.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Understanding the Polling Interval and Throttle Interval") && Guidewire_FMSourceFileMatch(SRCFILE,"inbound-integration.22.7.html") ) { return "inbound-integration.22.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Messaging") && Guidewire_FMSourceFileMatch(SRCFILE,"p-messaging.html") ) { return "p-messaging.html";}
else if (Guidewire_TopicMatch(TOPIC,"Messaging and Events") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.01.html") ) { return "eventsmessaging.24.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Messaging Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.02.html") ) { return "eventsmessaging.24.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Message Destination Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.03.html") ) { return "eventsmessaging.24.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Filtering Events") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.04.html") ) { return "eventsmessaging.24.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"List of Messaging Events in PolicyCenter") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.05.html") ) { return "eventsmessaging.24.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Generating New Messages in Event Fired Rules") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.06.html") ) { return "eventsmessaging.24.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Message Ordering and Multi-Threaded Sending") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.07.html") ) { return "eventsmessaging.24.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Late Binding Data in Your Payload") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.08.html") ) { return "eventsmessaging.24.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reporting Acknowledgements and Errors") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.09.html") ) { return "eventsmessaging.24.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Tracking a Specific Entity With a Message") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.10.html") ) { return "eventsmessaging.24.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Implementing Messaging Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.11.html") ) { return "eventsmessaging.24.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Resynchronizing Messages for a Primary Object") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.12.html") ) { return "eventsmessaging.24.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Message Payload Mapping Utility for Java Plugins") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.13.html") ) { return "eventsmessaging.24.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Monitoring Messages and Handling Errors") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.14.html") ) { return "eventsmessaging.24.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Messaging Tools Web Service") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.15.html") ) { return "eventsmessaging.24.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Batch Mode Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.16.html") ) { return "eventsmessaging.24.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"Included Messaging Transports") && Guidewire_FMSourceFileMatch(SRCFILE,"eventsmessaging.24.17.html") ) { return "eventsmessaging.24.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy-related Integrations") && Guidewire_FMSourceFileMatch(SRCFILE,"p-forms.html") ) { return "p-forms.html";}
else if (Guidewire_TopicMatch(TOPIC,"Rating Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.01.html") ) { return "rating-external.26.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"The Rating Framework") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.02.html") ) { return "rating-external.26.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Guidewire Rating Management and PCRatingPlugin") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.03.html") ) { return "rating-external.26.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Overview of Cost Data Objects") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.04.html") ) { return "rating-external.26.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Where to Override the Default Rating Engine") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.05.html") ) { return "rating-external.26.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Common Questions About the Default Rating Engine") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.06.html") ) { return "rating-external.26.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Optional Asynchronous Rating") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.07.html") ) { return "rating-external.26.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Implementing Rating for a New Line of Business") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.08.html") ) { return "rating-external.26.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"What Do Cost Data Objects Contain") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.09.html") ) { return "rating-external.26.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Cost Core Properties") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.10.html") ) { return "rating-external.26.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Adding Line-specific Cost Properties and Methods") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.11.html") ) { return "rating-external.26.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Fixed ID Keys Link a Cost Data Object to Another Object") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.12.html") ) { return "rating-external.26.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Cost Data Object Methods and Constructors to Override") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.13.html") ) { return "rating-external.26.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Cost Data APIs That You Can Call") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.14.html") ) { return "rating-external.26.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Checklist for Relationship Changes in Cost Data Objects") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.15.html") ) { return "rating-external.26.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Writing Your Own Line-specific Rating Engine Subclass") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.16.html") ) { return "rating-external.26.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"Rating Line Example for Personal Auto") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.17.html") ) { return "rating-external.26.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"A Close Look at PersonalAutoCovCostData") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.18.html") ) { return "rating-external.26.18.html";}
else if (Guidewire_TopicMatch(TOPIC,"Rating Variations") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.19.html") ) { return "rating-external.26.19.html";}
else if (Guidewire_TopicMatch(TOPIC,"Workers\u2019 Compensation Rating") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.20.html") ) { return "rating-external.26.20.html";}
else if (Guidewire_TopicMatch(TOPIC,"Inland Marine Rating") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.21.html") ) { return "rating-external.26.21.html";}
else if (Guidewire_TopicMatch(TOPIC,"General Liability Rating") && Guidewire_FMSourceFileMatch(SRCFILE,"rating-external.26.22.html") ) { return "rating-external.26.22.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reinsurance Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"reinsurance-integration.27.1.html") ) { return "reinsurance-integration.27.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reinsurance Data Model") && Guidewire_FMSourceFileMatch(SRCFILE,"reinsurance-integration.27.2.html") ) { return "reinsurance-integration.27.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Risk Entity") && Guidewire_FMSourceFileMatch(SRCFILE,"reinsurance-integration.27.3.html") ) { return "reinsurance-integration.27.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Risk Version List Entity") && Guidewire_FMSourceFileMatch(SRCFILE,"reinsurance-integration.27.4.html") ) { return "reinsurance-integration.27.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reinsurance Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"reinsurance-integration.27.5.html") ) { return "reinsurance-integration.27.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reinsurance Plugin Interface Methods") && Guidewire_FMSourceFileMatch(SRCFILE,"reinsurance-integration.27.6.html") ) { return "reinsurance-integration.27.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reinsurance Configuration Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"reinsurance-integration.27.7.html") ) { return "reinsurance-integration.27.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reinsurance Ceding Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"reinsurance-integration.27.8.html") ) { return "reinsurance-integration.27.8.html";}
else if (Guidewire_TopicMatch(TOPIC,"Reinsurance Coverage Web Service") && Guidewire_FMSourceFileMatch(SRCFILE,"reinsurance-integration.27.9.html") ) { return "reinsurance-integration.27.9.html";}
else if (Guidewire_TopicMatch(TOPIC,"Forms Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"formsintegration.28.1.html") ) { return "formsintegration.28.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Forms Integration Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"formsintegration.28.2.html") ) { return "formsintegration.28.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Forms Inferences Classes") && Guidewire_FMSourceFileMatch(SRCFILE,"formsintegration.28.3.html") ) { return "formsintegration.28.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Forms Messaging") && Guidewire_FMSourceFileMatch(SRCFILE,"formsintegration.28.4.html") ) { return "formsintegration.28.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Difference Customization") && Guidewire_FMSourceFileMatch(SRCFILE,"policydifference.29.1.html") ) { return "policydifference.29.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Difference Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"policydifference.29.2.html") ) { return "policydifference.29.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Difference Tree XML Configuration") && Guidewire_FMSourceFileMatch(SRCFILE,"policydifference.29.3.html") ) { return "policydifference.29.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Customizing Differences for New Lines of Business") && Guidewire_FMSourceFileMatch(SRCFILE,"policydifference.29.4.html") ) { return "policydifference.29.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Customizing Personal Auto Line of Business") && Guidewire_FMSourceFileMatch(SRCFILE,"policydifference.29.5.html") ) { return "policydifference.29.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"APIs for Calculating Differences") && Guidewire_FMSourceFileMatch(SRCFILE,"policydifference.29.6.html") ) { return "policydifference.29.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing, Claim, and Contact Integrations") && Guidewire_FMSourceFileMatch(SRCFILE,"p-pc-suite.html") ) { return "p-pc-suite.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.01.html") ) { return "billing-pc.31.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Integration Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.02.html") ) { return "billing-pc.31.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"How Billing Data Flows Between Applications") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.03.html") ) { return "billing-pc.31.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Producers and Producer Codes") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.04.html") ) { return "billing-pc.31.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Accounts") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.05.html") ) { return "billing-pc.31.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Instructions in BillingCenter") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.06.html") ) { return "billing-pc.31.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Flow for New-Period Jobs") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.07.html") ) { return "billing-pc.31.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"New Periods and Term Confirmed Flag") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.08.html") ) { return "billing-pc.31.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Flow for Existing-Period Jobs") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.09.html") ) { return "billing-pc.31.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Implications of Midterm Changes") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.10.html") ) { return "billing-pc.31.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Implications of Renewals or Rewrites") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.11.html") ) { return "billing-pc.31.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Implications for Cancellations and Reinstatements") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.12.html") ) { return "billing-pc.31.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Implications of Audits") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.13.html") ) { return "billing-pc.31.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Implications for Premium Reporting") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.14.html") ) { return "billing-pc.31.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Implications of Delinquency for Failure to Report") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.15.html") ) { return "billing-pc.31.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Billing Implications of Deposits") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.16.html") ) { return "billing-pc.31.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"Implementing the Billing System Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.17.html") ) { return "billing-pc.31.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"Implementing the Billing Summary Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.18.html") ) { return "billing-pc.31.18.html";}
else if (Guidewire_TopicMatch(TOPIC,"Use Integration-Specific Containers for Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"billing-pc.31.19.html") ) { return "billing-pc.31.19.html";}
else if (Guidewire_TopicMatch(TOPIC,"Multicurrency Integration between BillingCenter and PolicyCenter") && Guidewire_FMSourceFileMatch(SRCFILE,"multicurrency-bc-pc.32.1.html") ) { return "multicurrency-bc-pc.32.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Set up Currencies for Multicurrency Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"multicurrency-bc-pc.32.2.html") ) { return "multicurrency-bc-pc.32.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Configure Account Numbers for Multicurrency Accounts in BillingCenter") && Guidewire_FMSourceFileMatch(SRCFILE,"multicurrency-bc-pc.32.3.html") ) { return "multicurrency-bc-pc.32.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Claim and Policy Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"cc-pc-integration.33.1.html") ) { return "cc-pc-integration.33.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Claim Search from PolicyCenter") && Guidewire_FMSourceFileMatch(SRCFILE,"cc-pc-integration.33.2.html") ) { return "cc-pc-integration.33.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy System Notifications") && Guidewire_FMSourceFileMatch(SRCFILE,"cc-pc-integration.33.3.html") ) { return "cc-pc-integration.33.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Search Web Service (For Claim System Integration)") && Guidewire_FMSourceFileMatch(SRCFILE,"cc-pc-integration.33.4.html") ) { return "cc-pc-integration.33.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Typecode Maximum Length and Trimmed Typecodes") && Guidewire_FMSourceFileMatch(SRCFILE,"cc-pc-integration.33.5.html") ) { return "cc-pc-integration.33.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"PolicyCenter Exit Points to ClaimCenter and BillingCenter") && Guidewire_FMSourceFileMatch(SRCFILE,"cc-pc-integration.33.6.html") ) { return "cc-pc-integration.33.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"PolicyCenter Product Model Import into ClaimCenter") && Guidewire_FMSourceFileMatch(SRCFILE,"cc-pc-integration.33.7.html") ) { return "cc-pc-integration.33.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Policy Location Search API") && Guidewire_FMSourceFileMatch(SRCFILE,"cc-pc-integration.33.8.html") ) { return "cc-pc-integration.33.8.html";}
else if (Guidewire_TopicMatch(TOPIC,"Contact Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"contact-integration.34.1.html") ) { return "contact-integration.34.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Integrating with a Contact Management System") && Guidewire_FMSourceFileMatch(SRCFILE,"contact-integration.34.2.html") ) { return "contact-integration.34.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Configuring How PolicyCenter Handles Contacts") && Guidewire_FMSourceFileMatch(SRCFILE,"contact-integration.34.3.html") ) { return "contact-integration.34.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Synchronizing Contacts with Accounts") && Guidewire_FMSourceFileMatch(SRCFILE,"contact-integration.34.4.html") ) { return "contact-integration.34.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Account Contact Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"contact-integration.34.5.html") ) { return "contact-integration.34.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Account Contact Role Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"contact-integration.34.6.html") ) { return "contact-integration.34.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Contact Web Service APIs") && Guidewire_FMSourceFileMatch(SRCFILE,"contact-integration.34.7.html") ) { return "contact-integration.34.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Address APIs") && Guidewire_FMSourceFileMatch(SRCFILE,"contact-integration.34.8.html") ) { return "contact-integration.34.8.html";}
else if (Guidewire_TopicMatch(TOPIC,"Importing Policy Data") && Guidewire_FMSourceFileMatch(SRCFILE,"p-contactsbilling.html") ) { return "p-contactsbilling.html";}
else if (Guidewire_TopicMatch(TOPIC,"Zone Import") && Guidewire_FMSourceFileMatch(SRCFILE,"databaseimport.36.1.html") ) { return "databaseimport.36.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Introduction to Zone Import") && Guidewire_FMSourceFileMatch(SRCFILE,"databaseimport.36.2.html") ) { return "databaseimport.36.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Overview of a Typical Database Staging Table Import") && Guidewire_FMSourceFileMatch(SRCFILE,"databaseimport.36.3.html") ) { return "databaseimport.36.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"High-Level Steps in a Typical Database Staging Table Import") && Guidewire_FMSourceFileMatch(SRCFILE,"databaseimport.36.4.html") ) { return "databaseimport.36.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Detailed Steps in a Typical Database Staging Table Import") && Guidewire_FMSourceFileMatch(SRCFILE,"databaseimport.36.5.html") ) { return "databaseimport.36.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Database Import Performance and Statistics") && Guidewire_FMSourceFileMatch(SRCFILE,"databaseimport.36.6.html") ) { return "databaseimport.36.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Table Import Tools") && Guidewire_FMSourceFileMatch(SRCFILE,"databaseimport.36.7.html") ) { return "databaseimport.36.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Data Integrity Checks") && Guidewire_FMSourceFileMatch(SRCFILE,"databaseimport.36.8.html") ) { return "databaseimport.36.8.html";}
else if (Guidewire_TopicMatch(TOPIC,"Table Import Tips and Troubleshooting") && Guidewire_FMSourceFileMatch(SRCFILE,"databaseimport.36.9.html") ) { return "databaseimport.36.9.html";}
else if (Guidewire_TopicMatch(TOPIC,"Other Integration Topics") && Guidewire_FMSourceFileMatch(SRCFILE,"p-claims.html") ) { return "p-claims.html";}
else if (Guidewire_TopicMatch(TOPIC,"Archiving Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"archiving-integration.38.1.html") ) { return "archiving-integration.38.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Overview of Archiving Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"archiving-integration.38.2.html") ) { return "archiving-integration.38.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Archiving Storage Integration Detailed Flow") && Guidewire_FMSourceFileMatch(SRCFILE,"archiving-integration.38.3.html") ) { return "archiving-integration.38.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Archive Retrieval Integration Detailed Flow") && Guidewire_FMSourceFileMatch(SRCFILE,"archiving-integration.38.4.html") ) { return "archiving-integration.38.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Archive Source Plugin Utility Methods") && Guidewire_FMSourceFileMatch(SRCFILE,"archiving-integration.38.5.html") ) { return "archiving-integration.38.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Check for Archiving Before Accessing Policy Data") && Guidewire_FMSourceFileMatch(SRCFILE,"archiving-integration.38.6.html") ) { return "archiving-integration.38.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Upgrading the Data Model of Retrieved Data") && Guidewire_FMSourceFileMatch(SRCFILE,"archiving-integration.38.7.html") ) { return "archiving-integration.38.7.html";}
else if (Guidewire_TopicMatch(TOPIC,"Custom Batch Processing") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.01.html") ) { return "batchprocess.39.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Overview of Custom Batch Processing") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.02.html") ) { return "batchprocess.39.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Styles of Batch Processing") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.03.html") ) { return "batchprocess.39.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Choosing a Style for Custom Batch Processing") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.04.html") ) { return "batchprocess.39.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Nightly and Daytime Batch Processing") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.05.html") ) { return "batchprocess.39.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Batch Processing Typecodes") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.06.html") ) { return "batchprocess.39.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Developing Custom Work Queues") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.07.html") ) { return "batchprocess.39.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Custom Work Queue Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.08.html") ) { return "batchprocess.39.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Defining the Typecode for Your Custom Work Queue") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.09.html") ) { return "batchprocess.39.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Defining the Work Item Type for Your Custom Work Queue") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.10.html") ) { return "batchprocess.39.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Creating Your Custom Work Queue Class") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.11.html") ) { return "batchprocess.39.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Developing the Writer for Your Custom Work Queue") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.12.html") ) { return "batchprocess.39.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Developing the Workers for Your Custom Work Queue") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.13.html") ) { return "batchprocess.39.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Example Work Queues") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.14.html") ) { return "batchprocess.39.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Simple Example of a Work Queue") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.15.html") ) { return "batchprocess.39.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Example Work Queue for Updating Entities") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.16.html") ) { return "batchprocess.39.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"Example Work Queue with a Custom Work Item Type") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.17.html") ) { return "batchprocess.39.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"Developing Custom Batch Processes") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.18.html") ) { return "batchprocess.39.18.html";}
else if (Guidewire_TopicMatch(TOPIC,"Custom Batch Process Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.19.html") ) { return "batchprocess.39.19.html";}
else if (Guidewire_TopicMatch(TOPIC,"Creating a Custom Batch Process") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.20.html") ) { return "batchprocess.39.20.html";}
else if (Guidewire_TopicMatch(TOPIC,"Batch Process Implementation Using the Batch Process Base Class") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.21.html") ) { return "batchprocess.39.21.html";}
else if (Guidewire_TopicMatch(TOPIC,"Example Batch Processes") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.22.html") ) { return "batchprocess.39.22.html";}
else if (Guidewire_TopicMatch(TOPIC,"Example Batch Process for a Background Task") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.23.html") ) { return "batchprocess.39.23.html";}
else if (Guidewire_TopicMatch(TOPIC,"Example Batch Process for Unit of Work Processing") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.24.html") ) { return "batchprocess.39.24.html";}
else if (Guidewire_TopicMatch(TOPIC,"Enabling Custom Batch Processing to Run") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.25.html") ) { return "batchprocess.39.25.html";}
else if (Guidewire_TopicMatch(TOPIC,"Categorizing Your Batch Processing Typecode") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.26.html") ) { return "batchprocess.39.26.html";}
else if (Guidewire_TopicMatch(TOPIC,"Updating the Work Queue Configuration") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.27.html") ) { return "batchprocess.39.27.html";}
else if (Guidewire_TopicMatch(TOPIC,"Implementing the Processes Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.28.html") ) { return "batchprocess.39.28.html";}
else if (Guidewire_TopicMatch(TOPIC,"Monitoring Batch Processing") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.29.html") ) { return "batchprocess.39.29.html";}
else if (Guidewire_TopicMatch(TOPIC,"The Work Queue Info Page") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.30.html") ) { return "batchprocess.39.30.html";}
else if (Guidewire_TopicMatch(TOPIC,"The Batch Process Info Page") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.31.html") ) { return "batchprocess.39.31.html";}
else if (Guidewire_TopicMatch(TOPIC,"Monitoring for Batch Processing Completion") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.32.html") ) { return "batchprocess.39.32.html";}
else if (Guidewire_TopicMatch(TOPIC,"Maintenance Tools") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.33.html") ) { return "batchprocess.39.33.html";}
else if (Guidewire_TopicMatch(TOPIC,"Process History") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.34.html") ) { return "batchprocess.39.34.html";}
else if (Guidewire_TopicMatch(TOPIC,"Periodic Purging of Batch Processing Entities") && Guidewire_FMSourceFileMatch(SRCFILE,"batchprocess.39.35.html") ) { return "batchprocess.39.35.html";}
else if (Guidewire_TopicMatch(TOPIC,"Free-text Search Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"search-freetext-engine.40.1.html") ) { return "search-freetext-engine.40.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Free-text Load and Index Plugin and Message Transport") && Guidewire_FMSourceFileMatch(SRCFILE,"search-freetext-engine.40.2.html") ) { return "search-freetext-engine.40.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Free-text Search Plugin") && Guidewire_FMSourceFileMatch(SRCFILE,"search-freetext-engine.40.3.html") ) { return "search-freetext-engine.40.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Servlets") && Guidewire_FMSourceFileMatch(SRCFILE,"servlets.html") ) { return "servlets.html";}
else if (Guidewire_TopicMatch(TOPIC,"Data Extraction Integration") && Guidewire_FMSourceFileMatch(SRCFILE,"dataextraction.42.1.html") ) { return "dataextraction.42.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Why Gosu Templates are Useful for Data Extraction") && Guidewire_FMSourceFileMatch(SRCFILE,"dataextraction.42.2.html") ) { return "dataextraction.42.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Data Extraction Using Web Services") && Guidewire_FMSourceFileMatch(SRCFILE,"dataextraction.42.3.html") ) { return "dataextraction.42.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Logging") && Guidewire_FMSourceFileMatch(SRCFILE,"logging.43.1.html") ) { return "logging.43.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Logging Overview For Integration Developers") && Guidewire_FMSourceFileMatch(SRCFILE,"logging.43.2.html") ) { return "logging.43.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Logging Properties File") && Guidewire_FMSourceFileMatch(SRCFILE,"logging.43.3.html") ) { return "logging.43.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Logging APIs for Java Integration Developers") && Guidewire_FMSourceFileMatch(SRCFILE,"logging.43.4.html") ) { return "logging.43.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Proxy Servers") && Guidewire_FMSourceFileMatch(SRCFILE,"proxyservers.44.1.html") ) { return "proxyservers.44.1.html";}
else if (Guidewire_TopicMatch(TOPIC,"Proxy Server Overview") && Guidewire_FMSourceFileMatch(SRCFILE,"proxyservers.44.2.html") ) { return "proxyservers.44.2.html";}
else if (Guidewire_TopicMatch(TOPIC,"Configuring a Proxy Server with Apache HTTP Server") && Guidewire_FMSourceFileMatch(SRCFILE,"proxyservers.44.3.html") ) { return "proxyservers.44.3.html";}
else if (Guidewire_TopicMatch(TOPIC,"Certificates, Private Keys, and Passphrase Scripts") && Guidewire_FMSourceFileMatch(SRCFILE,"proxyservers.44.4.html") ) { return "proxyservers.44.4.html";}
else if (Guidewire_TopicMatch(TOPIC,"Proxy Server Integration Types for PolicyCenter") && Guidewire_FMSourceFileMatch(SRCFILE,"proxyservers.44.5.html") ) { return "proxyservers.44.5.html";}
else if (Guidewire_TopicMatch(TOPIC,"Proxy Building Blocks") && Guidewire_FMSourceFileMatch(SRCFILE,"proxyservers.44.6.html") ) { return "proxyservers.44.6.html";}
else if (Guidewire_TopicMatch(TOPIC,"Java and OSGi Support") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.01.html") ) { return "java-api.45.01.html";}
else if (Guidewire_TopicMatch(TOPIC,"Overview of Java and OSGi Support") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.02.html") ) { return "java-api.45.02.html";}
else if (Guidewire_TopicMatch(TOPIC,"Accessing Entity and Typecode Data in Java") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.03.html") ) { return "java-api.45.03.html";}
else if (Guidewire_TopicMatch(TOPIC,"Regenerating Java API Libraries") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.04.html") ) { return "java-api.45.04.html";}
else if (Guidewire_TopicMatch(TOPIC,"Entity Packages and Customer Extensions from Java") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.05.html") ) { return "java-api.45.05.html";}
else if (Guidewire_TopicMatch(TOPIC,"Typecode Classes from Java") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.06.html") ) { return "java-api.45.06.html";}
else if (Guidewire_TopicMatch(TOPIC,"Comparing Entity Instances and Typecodes") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.07.html") ) { return "java-api.45.07.html";}
else if (Guidewire_TopicMatch(TOPIC,"Entity Bundles and Transactions from Java") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.08.html") ) { return "java-api.45.08.html";}
else if (Guidewire_TopicMatch(TOPIC,"Creating New Entity Instances from Java") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.09.html") ) { return "java-api.45.09.html";}
else if (Guidewire_TopicMatch(TOPIC,"Getting and Setting Entity Properties from Java") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.10.html") ) { return "java-api.45.10.html";}
else if (Guidewire_TopicMatch(TOPIC,"Calling Entity Object Methods from Java") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.11.html") ) { return "java-api.45.11.html";}
else if (Guidewire_TopicMatch(TOPIC,"Querying for Entity Data in Java") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.12.html") ) { return "java-api.45.12.html";}
else if (Guidewire_TopicMatch(TOPIC,"Accessing Gosu Classes from Java Using Reflection") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.13.html") ) { return "java-api.45.13.html";}
else if (Guidewire_TopicMatch(TOPIC,"Gosu Enhancement Properties and Methods in Java") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.14.html") ) { return "java-api.45.14.html";}
else if (Guidewire_TopicMatch(TOPIC,"Class Loading and Delegation for non-OSGi Java") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.15.html") ) { return "java-api.45.15.html";}
else if (Guidewire_TopicMatch(TOPIC,"Deploying Non-OSGi Java Classes and JARs") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.16.html") ) { return "java-api.45.16.html";}
else if (Guidewire_TopicMatch(TOPIC,"OSGi Plugin Deployment with IntelliJ IDEA with OSGi Editor") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.17.html") ) { return "java-api.45.17.html";}
else if (Guidewire_TopicMatch(TOPIC,"Advanced OSGi Dependency and Settings Configuration") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.18.html") ) { return "java-api.45.18.html";}
else if (Guidewire_TopicMatch(TOPIC,"Updating Your OSGi Plugin Project After Product Location Changes") && Guidewire_FMSourceFileMatch(SRCFILE,"java-api.45.19.html") ) { return "java-api.45.19.html";}
else { return("../wwhelp/topic_cannot_be_found.html"); } }

function  WWHBookData_MatchTopic(P)
{
var C=null;P=decodeURIComponent(decodeURIComponent(escape(P)));//workaround epub bug with UTF8 processing!
if(P=="Built-in_Web_Services")C="webservices.06.4.html";
if(P=="Web_Service_and_SOAP_Entity_Overview")C="webservices-wsi-publish.07.02.html";
if(P=="MTOM_Attachments")C="webservice-wsi-consuming.08.5.html";
if(P=="Account_APIs")C="webservices-policy.10.02.html";
if(P=="Job_APIs")C="webservices-policy.10.03.html";
if(P=="Policy_Cancellation_and_Reinstatement_APIs")C="webservices-policy.10.04.html";
if(P=="Submission_APIs")C="webservices-policy.10.05.html";
if(P=="Producer_APIs")C="webservices-policy.10.06.html";
if(P=="Product_Model_APIs")C="webservices-policy.10.07.html";
if(P=="Policy_APIs")C="webservices-policy.10.08.html";
if(P=="Policy_Period_APIs")C="webservices-policy.10.10.html";
if(P=="Policy_Change_APIs")C="webservices-policy.10.13.html";
if(P=="Policy_Renewal_APIs")C="webservices-policy.10.14.html";
if(P=="Archiving_APIs")C="webservices-policy.10.18.html";
if(P=="Implementing_Java_Plugins")C="plugins.12.06.html";
if(P=="The_Plugin_Registry")C="plugins.12.09.html";
if(P=="Plugin_Thread_Safety_and_Static_Variables")C="plugins.12.10.html";
if(P=="Plugin_Thread_Safety")C="plugins.12.10.html";
if(P=="Do_Not_Call_Local_SOAP_APIs_From_Plugins")C="plugins.12.12.html";
if(P=="Policy_and_Account_Plugins")C="plugins-policy.13.01.html";
if(P=="The_Behavior_of_Built-in_Document_Storage_Plugins")C="documentsforms.15.07.html";
if(P=="GScript-Initiated_Automatic_Document_Generation")C="documentproduction.16.4.html";
if(P=="Geographic_Data_Integration")C="geocoding.17.1.html";
if(P=="Geocoding,_Mapping,_and_Driving_Direction_Integration")C="geocoding.17.1.html";
if(P=="Property_Encryption_Integration")C="encryption.18.2.html";
if(P=="Property_Level_Encryption_Integration")C="encryption.18.2.html";
if(P=="Custom_Inbound_Integration_with_InboundIntegrationPlugin")C="inbound-integration.22.6.html";
if(P=="What_Events_Might_Be_Generated")C="eventsmessaging.24.05.html";
if(P=="Generating_Your_Message_Payload")C="eventsmessaging.24.06.html";
if(P=="Using_Rules_to_Generating_Messages")C="eventsmessaging.24.06.html";
if(P=="Message_Ordering")C="eventsmessaging.24.07.html";
if(P=="Overview_of_Messages")C="eventsmessaging.24.07.html";
if(P=="Late_Binding_Fields")C="eventsmessaging.24.08.html";
if(P=="Early_Binding_and_Late_Binding")C="eventsmessaging.24.08.html";
if(P=="Resyncing_Messages")C="eventsmessaging.24.12.html";
if(P=="Policy_Rating_Integration")C="rating-external.26.01.html";
if(P=="Rating_Line_Rating_Example_(Personal_Auto)")C="rating-external.26.17.html";
if(P=="Address_Book_Integration")C="contact-integration.34.1.html";
if(P=="The_Archive_Source_Plugin")C="archiving-integration.38.2.html#2083107";
if(P=="Web_Service_API_Data_Extraction")C="dataextraction.42.3.html";
if(P=="Deploying_Java_Code_in_BillingCenter")C="java-api.45.01.html";
if(P=="Deploying_Java_Code_in_PolicyCenter")C="java-api.45.01.html";
if(P=="Deploying_Java_Code_in_ClaimCenter")C="java-api.45.01.html";
if(P=="Accessing_Gosu_Classes_from_Java_Using_Reflection")C="java-api.45.13.html";
if(P=="Gosu_Enhancements_in_the_Entity_Libraries")C="java-api.45.14.html";
if(P=="Gosu-to-Java_Class_Deployment")C="java-api.45.16.html";
if (C) { return C } else { return GUIDEWIRE_TOPIC_TO_FILE(P,Guidewire_ExtractSrcFromURL());}
}
