var emailPanel;
var responsePanel;
function cancelEmail(){emailPanel.hide()
}function validateCPCodeSelection(b){var a=!!b.cpcode;
return{success:a,msgs:(a?[]:[translationBundle.getTranslatedLabel("cpcodes_sel_errmsg")])}
}function clearEmailFields(a){$("#emailReportName").attr("value","");
$("#emailRcpt").attr("value","")
}function showEmail(){if(emailPanel){emailPanel.show();
return
}emailPanel=new YAHOO.widget.Panel("emailSelector",{width:"650px",fixedcenter:"contained",close:true,visible:true,modal:true});
if(!AKAMAI.overlayManager){AKAMAI.overlayManager=new YAHOO.widget.OverlayManager()
}AKAMAI.overlayManager.register(emailPanel);
$("#emailSelector").css("display","block");
emailPanel.render(document.body)
}function sendMail(e){if(!validateForMail()){return
}var c=$("#emailForm").serialize();
if("I"==$("#emailFrequency").val()){if(!$("#emailSelector #emailCustom").is(":checked")){var b=$("#dateRange :selected").val().split(",");
if(b&&b.length===2){aParts=b[0].split(":");
if(aParts&&aParts.length===2){c+="&start_date="+aParts[0];
c+="&start_time="+aParts[1]
}aParts=b[1].split(":");
if(aParts&&aParts.length===2){c+="&end_date="+aParts[0];
c+="&end_time="+aParts[1]
}}}else{var d=$("#emailSelector #cpcodeReportForm_start").val();
c+="&start_date="+d;
var a=$("#emailSelector #cpcodeReportForm_end").val();
c+="&end_date="+a;
c+="&start_time="+$("#emailSelector #starthour-id").val();
c+="&end_time="+$("#emailSelector #endhour-id").val()
}}responsePanel=new YAHOO.widget.Panel("response",{width:"300px",fixedcenter:true,constraintoviewport:true,close:true,visible:true,draggable:true,modal:true,zindex:120});
emailPanel.hide();
$("#response").css("display","block");
$("#response .bd").html("<img id='processing' src='/EdgeAuth/ui/lib/yui/current/assets/skins/sam/ajax-loader.gif' alt='Processing...' />");
responsePanel.render(document.body);
responsePanel.show();
$.ajax({type:"GET",url:e+"?"+c,success:function(f){$("#processing").css("display","none");
if("success"==$.trim(f)){if("I"==$("#emailFrequency").val()){$("#response .bd").html("Your report is being processed and will be sent shortly. Click <a href='/ahr/reports/emailreports/instant.jsp' target='_blank'>here</a> to view the status of this report in new window.")
}else{$("#response .bd").html("Your report was successfully scheduled. To cancel this report, click on <a href='/erra/report_list.action' target='_blank'>Recurring Reports</a>.")
}clearEmailFields();
return
}$("#response .bd").html(f)
}})
}function updateCustom(){if($("##emailSelector #emailCustom").is(":checked")){$("#emailSelector #cpcodeReportForm_start").removeAttr("disabled");
$("#emailSelector #cpcodeReportForm_end").removeAttr("disabled");
$("#emailSelector #endhour-id").removeAttr("disabled");
$("#emailSelector #starthour-id").removeAttr("disabled");
$("#dateRange").attr("disabled","disabled")
}else{$("#emailSelector #cpcodeReportForm_start").attr("disabled","disabled");
$("#emailSelector #cpcodeReportForm_end").attr("disabled","disabled");
$("#emailSelector #endhour-id").attr("disabled","disabled");
$("#emailSelector #starthour-id").attr("disabled","disabled");
$("#dateRange").removeAttr("disabled")
}}function validateForMail(){if(""==$.trim($("#emailReportName").val())){alert("Please enter report name");
return false
}if(!validateEmailList($("#emailRcpt").val())){return false
}if(null==$("#emailSelector #cpcodes").val()){alert("Please select atlease one CPCODE");
return false
}return true
}function validateEmailList(c){if(""==$.trim(c)){alert("Please enter email address");
return false
}c=$.trim(c).replace(/ |\t/,"");
c=$.trim(c).replace(/\r\n|\n\r/,",");
c=$.trim(c).replace(/\n|\r|;/,",");
c=$.trim(c).replace(/,+/,",");
var b=c.split(",");
for(var a=0;
a<b.length;
a++){if(""==$.trim(b[a])){continue
}if(!validateEmail(b[a])){alert("Email address "+b[a]+" is invalid");
return false
}}return true
}function validateEmail(b){var a=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
if(a.test(b)){return true
}else{return false
}}function disableDates(){if("I"!=$("#emailFrequency").val()){$("#emailDateRange_id").css("display","none");
$("#emailSelector .custom").css("display","none")
}else{$("#emailDateRange_id").css("display","block");
$("#emailSelector .custom").css("display","block")
}}function viewMore(){var k=$(".aui-switchsel").get(0).value;
var l=window.open(""),c=l.document,a=c.createElement("form"),d=c.createElement("input"),f=c.createElement("div");
try{a.setAttribute("action",(document.location.protocol?document.location.protocol+"//":"")+document.location.host+"/download-reports/views/"+$("#product").val()+"/urls/details.do");
a.setAttribute("method","post");
d.value=k;
d.setAttribute("name","sortCol");
a.appendChild(d);
var b=getUrlParam({findFilter:'input[type!="button"], select',includeCpcodes:true},"post");
f.setAttribute("style","display:none;");
a.setAttribute("style","display:none;");
for(var i=0,h=b.length;
i<h;
i++){if(b.hasOwnProperty(i)){if(b[i].nodeType==1&&b[i].nodeName.toUpperCase()=="SELECT"){var g=$("option:selected",b[i]);
$("option",b[i]).not(g).removeAttr("selected");
g.attr("selected","selected")
}if(c.importNode){try{a.appendChild(c.importNode(b[i]))
}catch(j){f.innerHTML=b[i].outerHTML;
if(b[i].value){f.firstChild.value=b[i].value
}a.appendChild(f.firstChild)
}}else{f.innerHTML=b[i].outerHTML;
if(b[i].value){f.firstChild.value=b[i].value
}a.appendChild(f.firstChild)
}}}c.body.appendChild(a);
a.submit()
}catch(j){c.write("There is an exception raised."+j)
}}function getUrlParam(filter,method){var params,clonedParams;
method=method&&method.toUpperCase();
if(filter){if(filter.findFilter){params=$("#customSelector").find(filter.findFilter)
}else{filter=decodeURIComponent(filter);
filter=filter.replace(/\+/g," ");
filter=eval("("+filter+")");
params=$("#customSelector").find(filter.findFilter)
}if(filter.notFilter){params=params.not(filter.notFilter)
}params=params.not('select[id="cpcodes"]');
params=params.not('select[id="dateRange"]');
if(method!="POST"){params=params.serialize()
}var cpcodeElem,dateRangeElem;
if(filter.includeCpcodes){if(method!="POST"){params=params+"&cpcode="+[].concat($("#cpcodes").val()).join()
}else{cpcodeElem=$("<input/>").val([].concat($("#cpcodes").val()).join()).attr("name","cpcode")
}}if($("#dateRange").attr("disabled")==undefined){if(method!="POST"){params=params+"&dateRange="+encodeURIComponent($("#dateRange :selected").text())
}else{dateRangeElem=$("<input/>").val(encodeURIComponent($("#dateRange :selected").text())).attr("name","dateRange")
}}if(method=="POST"){clonedParams=(params&&params.add(cpcodeElem).add(dateRangeElem).clone());
if(clonedParams){clonedParams.each(function(index){var self=this,selectedOpt,originalElem=params.get(index);
if(self.nodeType==1&&self.nodeName.toUpperCase()=="SELECT"&&originalElem){selectedOpt=$("option:selected",originalElem);
$("option",self).removeAttr("selected");
$(self).val(selectedOpt.attr("value"))
}})
}}}return(method!="POST")?params:(clonedParams||null)
}function updateFilter(){var c=$("#searchstr").val();
c="'".concat(c).concat("'");
var a="";
if("checked"==$("#iCase").attr("checked")){a=" (Case Sensitive)"
}var d=$("#matchtype option:selected").text();
var b=d.concat(" ").concat(c).concat(a);
$("#trendUrlFilter").text(b);
$("#topUrlFilter").text(b);
if(c==="''"){$("#topFilterBox").removeClass("filterShow").addClass("filterHide");
$("#trendFilterBox").removeClass("filterShow").addClass("filterHide")
}else{$("#topFilterBox").removeClass("filterHide").addClass("filterShow");
$("#trendFilterBox").removeClass("filterHide").addClass("filterShow")
}}function setEncodedSearchStr(a){document.getElementById("encodedSearchStr").value=Base64.encode(a.value)
}var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(c){var a="";
var k,h,f,j,g,e,d;
var b=0;
c=Base64._utf8_encode(c);
while(b<c.length){k=c.charCodeAt(b++);
h=c.charCodeAt(b++);
f=c.charCodeAt(b++);
j=k>>2;
g=((k&3)<<4)|(h>>4);
e=((h&15)<<2)|(f>>6);
d=f&63;
if(isNaN(h)){e=d=64
}else{if(isNaN(f)){d=64
}}a=a+Base64._keyStr.charAt(j)+Base64._keyStr.charAt(g)+Base64._keyStr.charAt(e)+Base64._keyStr.charAt(d)
}return a
},decode:function(c){var a="";
var k,h,f;
var j,g,e,d;
var b=0;
c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");
while(b<c.length){j=Base64._keyStr.indexOf(c.charAt(b++));
g=Base64._keyStr.indexOf(c.charAt(b++));
e=Base64._keyStr.indexOf(c.charAt(b++));
d=Base64._keyStr.indexOf(c.charAt(b++));
k=(j<<2)|(g>>4);
h=((g&15)<<4)|(e>>2);
f=((e&3)<<6)|d;
a=a+String.fromCharCode(k);
if(e!=64){a=a+String.fromCharCode(h)
}if(d!=64){a=a+String.fromCharCode(f)
}}a=Base64._utf8_decode(a);
return a
},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");
var a="";
for(var e=0;
e<b.length;
e++){var d=b.charCodeAt(e);
if(d<128){a+=String.fromCharCode(d)
}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);
a+=String.fromCharCode((d&63)|128)
}else{a+=String.fromCharCode((d>>12)|224);
a+=String.fromCharCode(((d>>6)&63)|128);
a+=String.fromCharCode((d&63)|128)
}}}return a
},_utf8_decode:function(a){var b="";
var d=0;
var e=c1=c2=0;
while(d<a.length){e=a.charCodeAt(d);
if(e<128){b+=String.fromCharCode(e);
d++
}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);
b+=String.fromCharCode(((e&31)<<6)|(c2&63));
d+=2
}else{c2=a.charCodeAt(d+1);
c3=a.charCodeAt(d+2);
b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));
d+=3
}}}return b
}};