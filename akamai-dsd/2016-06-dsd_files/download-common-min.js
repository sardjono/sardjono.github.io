function displayCpCode(b){var a=17;
if(b&&b.cpCodeStringMaxLength){try{a=parseInt(b.cpCodeStringMaxLength)
}catch(g){}}if(typeof $!="undefined"){if(1==[].concat($("#cpcodes").val()).length){var f=$("#cpcodes :selected").text();
$("#codes_label").attr("title",f);
var c=f.substring(0,f.indexOf(" "));
var h;
var d;
if(isNaN(c)){h=f.substring(0,f.lastIndexOf("(")).trim();
d=f.substring(f.lastIndexOf("("),f.lastIndexOf(")")+1)
}else{h=f.substring(f.indexOf("(")+1,f.lastIndexOf(")")).trim();
d="("+f.substring(0,f.indexOf(" ")).trim()+")"
}if(a<f.length){h=h.substring(0,10)+"..."
}f=h+" "+d;
$("#codes_label").text(f);
$("#codes_label").text(f)
}else{if("checked"==$("#aui-cps-selectall0").attr("checked")){$("#codes_label").text("All");
$("#codes_label").attr("title","")
}else{if(1<$("#cpcodes").val().length){$("#codes_label").text("Custom");
$("#codes_label").attr("title","")
}}}}}function shrinkText(a,b){if(a&&a.length>b){return"<span title='"+a+"'>"+a.substring(0,b)+"...</span>"
}else{return a
}}function performInitTask(a){return function(){if(typeof $!="undefined"){displayCpCode(a);
if(a&&a.customInitFunction&&typeof a.customInitFunction=="function"){a.customInitFunction(a)
}if(typeof jqueryAvailable!="undefined"){clearTimeout(jqueryAvailable)
}}}
}function removeWidgetsForEmail(a){$("#recurrence").change(function(){var b=$(this);
$.each(a,function(d,e){var c=$("#"+e);
if(b.val()=="X"||b.val()=="W"||b.val()=="M"){if(c.attr("checked")){c.removeAttr("checked")
}c.attr("disabled","disabled");
c.siblings().css("color","#AAAAAA")
}else{c.removeAttr("disabled");
c.siblings().css("color","")
}})
})
}function init(a){jqueryAvailable=setInterval(performInitTask(a),1000)
}function addLoadEvent(b,a){var c=window.onload;
if(typeof window.onload!="function"){window.onload=function(){b(a)
}
}else{window.onload=function(){if(c){c()
}b(a)
}
}}function getFilterParams(filterParam){var otherParam;
var otherParamStr="";
var filter=filterParam;
if(!filter){filter={findFilter:'input[type!="button"], select',includeCpcodes:true}
}if(filter){if(filter.findFilter){otherParam=$("#customSelector").find(filter.findFilter)
}else{filter=decodeURIComponent(filter);
filter=filter.replace(/\+/g," ");
filter=eval("("+filter+")");
otherParam=$("#customSelector").find(filter.findFilter)
}if(filter.notFilter){otherParam=otherParam.not(filter.notFilter)
}otherParam=otherParam.not('select[id="cpcodes"]');
otherParam=otherParam.not('select[id="dateRange"]');
otherParamStr=otherParam.serialize();
if(filter.includeCpcodes){var cpcodesArr=[].concat($("#cpcodes").val());
otherParamStr=otherParamStr+"&cpcode="+cpcodesArr.join()
}}return otherParamStr
}function viewAllDl(a){window.open("/download-reports/views/httpdl/alltopdl.do?georegion="+a+"&"+getFilterParams())
}function populateGeoTable(){var a=this;
var f=a._data;
if(f){var d=document.getElementById(a._config.GeoTableParentId).getElementsByClassName("aui-map-table")[0];
if(d){var c,e,b;
e='<table summary="'+a._config.title_text+'"><caption>'+a._config.title_text+'</caption><thead><tr><th class="'+a._config.tbl_col1_class+'">'+f[a._config.rootColsData][a._config.GeoNameIndex][a._config.rootColNameData]+'</th><th class="'+a._config.tbl_col2_class+'">'+f[a._config.rootColsData][a._config.data_index][a._config.rootColNameData]+"</th></tr></thead>";
b=f[a._config.rootRowsData];
for(c=0;
c<b.length;
++c){oValue=b[c];
e+='<tr><td class="aui-locale">'+oValue[a._config.rowColumnData][a._config.GeoNameIndex]+'</td><td class="aui-data">'+formatNumber(oValue[a._config.rowColumnData][a._config.data_index])+"</td></tr>"
}e+="</tbody></table></div>";
d.innerHTML=e
}}}function formatNumber(c){c+="";
var b=c.split(".");
var e=b[0];
var d=b.length>1?"."+b[1]:"";
var a=/(\d+)(\d{3})/;
while(a.test(e)){e=e.replace(a,"$1,$2")
}return e+d
}function updateTimezone(){if(typeof useCPCodeTimezone!="undefined"&&useCPCodeTimezone){var a=this._codes,f=$("option",a),e=f.filter(":selected"),c=e.size();
var d="";
if(c>0){if(!a._sortedById){var b=[];
e.each(function(){b.push({id:parseInt(this.value),timezone:this.getAttribute("data-tz")})
});
b=b.sort(function(h,g){return h.id-g.id
});
d=b[0].timezone
}else{d=f.eq(a.selectedIndex).attr("data-tz")
}}$("#selector_time_zone",this._container).val(getTimeZoneFromOffset(d))
}}function getTimeZoneFromOffset(a){var c="Etc/GMT";
var b="GMT";
if(a>0){b=c+"+"+a
}else{if(a<0){b=c+a
}}return b
}function getHighBox(){var d="";
var e=this._data;
d=getHTMLString(e.ui_components,this._config.highBoxIds);
var b=this._getCustomVar(e,this._config.timeZoneOffsetData);
b=(b)?parseInt(b):parseInt(this._config.xOffset);
var c='<div style="clear: both;margin-top:1em;"><p class="disclaimer" style="padding-left:0px !important;">';
if(this._config.disclaimers[1]&&e[this._config.realTimeData]!=null&&e[this._config.realTimeData]<e[this._config.endData]){c+="<span>"+YAHOO.lang.substitute(this._config.disclaimers[1],{estTime:Highcharts.dateFormat(this._config.disclaimersDateFormat,(parseInt(e[this._config.realTimeData])+b)*1000)})+"</span>"
}c+="</p></div> </div>";
var a=document.getElementById(this._config.highBoxContainer);
if(!a){a=document.createElement("div");
a.className="highBoxContainer";
if(this._config.highBoxContainer){a.id=this._config.highBoxContainer
}this._container.appendChild(a)
}a.innerHTML=d+c
}function getHTMLString(a,c){var d='<div class="aui-boxes" style="width:100%;"> <table class="box-high"> <tbody> ';
for(var b=0;
b<c.length;
b++){var e="";
if(b==0){e="top-row"
}d+='<tr> <td> <div class="'+e+'"> <span class="title">'+getComponentValue(a,c[b][0],"box_header")+'</span> <span class="value">'+getComponentValue(a,c[b][0],"box_value")+'</span> </span></div> </td><td rowspan="2"> <div class="'+e+' computed"> <div class="title-big">'+getComponentValue(a,c[b][1],"box_header")+'</div> <div class="value-big"> <span class="value-part">'+getComponentValue(a,c[b][1],"box_value")+'</span> <span class="unit-big"> '+getComponentValue(a,c[b][1],"box_units")+'</span> </div> </div> </td> </tr><tr> <td> <div> <span class="title">'+getComponentValue(a,c[b][2],"box_header")+'</span> <span class="value">'+getComponentValue(a,c[b][2],"box_value")+"</span> </span></div> </td> </tr>"
}d+="</tbody></table>";
return d
}function getComponentValue(b,d,c){for(var a=0;
a<b.length;
a++){if(b[a].id==d){return b[a][c]
}}}drawResponseTables=function(){var b,c,a;
populateTable(this._config.responseCodeConfig.containerID,this._config.responseCodeConfig.includeID,this._config.responseCodeConfig.columns,this);
populateTable(this._config.responseGroupConfig.containerID,this._config.responseGroupConfig.includeID,this._config.responseGroupConfig.columns,this);
document.getElementById("custom-response").style.display="block"
};
function populateTable(p,n,d,l){var o=document.getElementById(p);
var b=l._data;
if(o){aComponents=b[l._config.rootData];
for(var e=0;
e<aComponents.length;
++e){oComponent=aComponents[e];
if((!n||n==oComponent[l._config.idData])&&oComponent[l._config.typeData]==="table_component"){var a=oComponent.table_headers;
var m=oComponent.table_component_rows;
var g="<table>";
if(a){g+="<thead><tr>";
for(var h=0;
h<d.length;
h++){if(h==0){g+="<th class='aui-head0 aui-first-col'>"
}else{g+="<th class='aui-head"+h+"'>"
}g+=a[d[h]]+"</th>"
}g+="</tr></thead>"
}if(m){g+="<tbody>";
for(var h=0;
h<m.length;
h++){g+="<tr>";
var c=m[h];
for(var f=0;
f<d.length;
f++){if(f==0){g+="<td class='aui-col0 aui-first-col'>"
}else{g+="<td class='aui-col"+f+"'>"
}g+=c[d[f]]+"</td>"
}g+="</tr>"
}g+="</tbody>"
}g+="</table>";
o.innerHTML=g
}}}}function initSummary(){if(!$.fn.dataTableExt){var a=new YAHOO.util.YUILoader({loadOptional:false,timeout:10000,combine:false});
a.addModule({name:"dt",type:"js",fullpath:"/download-reports/static/js/jquery.dataTables-min.js",varName:"jqdt"});
a.onSuccess=applyDT;
a.require("dt");
a.insert(null,"js")
}else{applyDT()
}}function applyDT(){$("#cpCodesTable table").attr("id","summaryTable");
$("#summaryTable").dataTable({aoColumns:[{bSearchable:true,sType:"string"},{sType:"numeric",bSearchable:true},{bVisible:false,sType:"numeric",bSearchable:false},{iDataSort:2},{bVisible:false,sType:"numeric",bSearchable:false},{iDataSort:4}],aaSorting:[[5,"desc"]],oLanguage:{sSearch:""}});
$("<div id='clearId' style='clear:both; padding-bottom:10px;'/>").insertBefore("#summaryTable");
$("#summaryTable").css("visibility","visible")
};