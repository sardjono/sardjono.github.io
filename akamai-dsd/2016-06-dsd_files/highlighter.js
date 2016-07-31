var agt=navigator.userAgent.toLowerCase();
var is_gecko = (agt.indexOf('gecko') != -1);
var is_safari = (agt.indexOf('AppleWebKit') != -1);
var browsersensitivetbody = "";
var browsersensitivetrow = "";
var browsersensitivecell = "";
if (is_gecko) {
    browsersensitivetbody = "table-row-group";
    browsersensitivetrow = "table-row";
    browsersensitivecell = "table-cell";
}
else {
    browsersensitivetbody = "inline";
    browsersensitivetrow = "inline";
    browsersensitivecell = "inline";
} 
var visiblesection = "default";
var navflag = 0;

window.onload = function () {
    if(document.body.id != "noonload") {
        if(document.body.id != "popup" || document.body.id != "widepopup") {
            if (window.initcountdown) {
                initcountdown();
            }
            addnavlinks();
            if (window.addhovernavarrowsinie) { 
                window.addhovernavarrowsinie();
            }
        }
        paintstripes();
        if (window.myOnload) { 
            myOnload();
        }
    }
}

function highlight() {
    if (document.getElementsByName && document.getElementById) {
        var thischoice = "";
        var thisbox = "";
        var numelements = 0;
        var numchoices = 1;
        for (var k=1; k <=arguments.length; k++) {
            numchoices = 1;
            numelements = document.getElementsByName(arguments[k-1]).length - 1;
            for (var m=0; m <=numelements; m++) {
                thischoice = document.getElementsByName(arguments[k-1])[m];
                if (thischoice.type == "radio" || thischoice.type == "checkbox") {
                    thisbox = document.getElementById(arguments[k-1] + 'box' + numchoices);
                    numchoices++;
                    if (thisbox) {
                        if (thischoice.checked==true) {
                            thisbox.className = "formboxoptionhi";
                        }
                        else {
                            thisbox.className = "formboxoption";
                        }
                    }
                }
            }
        }
    }
}

// The originalclass argument in the method below is optional. If it's
// set, the box will be set back to that class. This is useful in the 
// case where we do server-side striping and we want to alternate what
// color the row is set back to. Added by Abhijit for 5.7.0

function highlightcheckbox(checkboxname,num,originalclass) {
    if (document.getElementsByName && document.getElementById) {
        box = document.getElementsByName(checkboxname)[num-1];
        greybox = document.getElementById(checkboxname + "box" + num);
        if (box.checked===true) {
            greybox.className = "formboxoptionhi";
        }else {
            if (originalclass) {
                greybox.className = originalclass;
            } else {
                greybox.className = "formboxoption";
            }
        }
    }
}

function paintstripes() {
    
    if (document.getElementById && document.getElementsByTagName) {
        
        // we'll stripe up to ten datatables per page
        for (var t = 1; t < 10; t++) {
            
            // obtain a reference to the desired table
            // if no such table exists, abort
            
            var tableid = 'datatable' + t;
            var tabletype = 'data';
            if (! document.getElementById(tableid)) {
                tableid = 'combotable' + t;
                tabletype = 'combo';
            }
            if (! document.getElementById(tableid)) {    
                return;
            }
            stripetable(tableid, tabletype);
        }
    }
}

function stripetable(tableName, tableType){
    // the flag we'll use to keep track of 
    // whether the current row is odd or even
    var even = false;  
    
    // obtain a reference to the desired table
    // if no such table exists, abort
    
    //tableName = tableid
    var tabletype = 'data';
    
    //graceful code failure
    if (! document.getElementById(tableName)) {    
        return;
    }
    
    var table = document.getElementById(tableName);
    
    // get the list of child tbodies
    var tbodies = table.getElementsByTagName("tbody");
    
    // and iterate through them, skipping the tbodies of nested tables...
    for (var h = 0; h < tbodies.length; h++) {
        
        if (tbodies[h].parentNode.id != tableName) continue;
        
        // find all the tr elements... 
        var trs = tbodies[h].getElementsByTagName("tr");
        
        // ... and iterate through them, skipping the rows of nested tables
        for (var i = 0; i < trs.length; i++) {
             
            // reset striping when a no_stripe is encountered
            if (trs[i].className == 'no_stripe') 
                even = false;
            if (trs[i].parentNode.parentNode.id == tableName && trs[i].className != 'no_stripe') {
                // get all the cells in this row...
                var tds = trs[i].getElementsByTagName("td");
                
                // and iterate through them, skipping the cells of nested tables...
                for (var j = 0; j < tds.length; j++) {
                    if (tds[j].parentNode.parentNode.parentNode.id == tableName) {
                        var mytd = tds[j];
                        tempClass = mytd.className	                
                        
                        // If the class name contains oddrow or evenrow, strip it.
                        // This is useful while sorting columns of a table to keep stripes.
                        if (tempClass.indexOf('oddrow') != -1) {
                            tempClass = replaceSubstring(tempClass, "oddrow", "");
                        }
                        if (tempClass.indexOf('evenrow') != -1) {
                            tempClass = replaceSubstring(tempClass, "evenrow", "");
                        }
                        
                        mytd.className = even ? 'evenrow '+ tempClass : 'oddrow '+ tempClass;
                    }
                }
                
                if (tds.length && tds[0].getElementsByTagName("input").length > 0) {
                    var checkbox = tds[0].getElementsByTagName("input")[0];
                    if (checkbox.checked) {
                        turnrowblue(checkbox);
                    }
                }
            }
            
            // flip from odd to even (or vice-versa) on the tr for datatables
            if (tableType == "data") {
                even =  ! even;
            }
            
        }
        
        // flip from odd to even (or vice-versa) on the tbody for combotables
        if (tableType == "combo") {
            even =  ! even;
        }
    }
}

function replaceSubstring(inputString, fromString, toString) {
   // Goes through the inputString and replaces every occurrence of fromString with toString
   var temp = inputString;
   if (fromString == "") {
      return inputString;
   }
   if (toString.indexOf(fromString) == -1) { // If the string being replaced is not a part of the replacement string (normal situation)
      while (temp.indexOf(fromString) != -1) {
         var toTheLeft = temp.substring(0, temp.indexOf(fromString));
         var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
         temp = toTheLeft + toString + toTheRight;
      }
   } else { // String being replaced is part of replacement string (like "+" being replaced with "++") - prevent an infinite loop
      var midStrings = new Array("~", "`", "_", "^", "#");
      var midStringLen = 1;
      var midString = "";
      // Find a string that doesn't exist in the inputString to be used
      // as an "inbetween" string
      while (midString == "") {
         for (var i=0; i < midStrings.length; i++) {
            var tempMidString = "";
            for (var j=0; j < midStringLen; j++) { tempMidString += midStrings[i]; }
            if (fromString.indexOf(tempMidString) == -1) {
               midString = tempMidString;
               i = midStrings.length + 1;
            }
         }
      } // Keep on going until we build an "inbetween" string that doesn't exist
      // Now go through and do two replaces - first, replace the "fromString" with the "inbetween" string
      while (temp.indexOf(fromString) != -1) {
         var toTheLeft = temp.substring(0, temp.indexOf(fromString));
         var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
         temp = toTheLeft + midString + toTheRight;
      }
      // Next, replace the "inbetween" string with the "toString"
      while (temp.indexOf(midString) != -1) {
         var toTheLeft = temp.substring(0, temp.indexOf(midString));
         var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
         temp = toTheLeft + toString + toTheRight;
      }
   } // Ends the check to see if the string being replaced is part of the replacement string or not
   return temp; // Send the updated string back to the user
} // Ends the "replaceSubstring" function


function showalldetails() {
    if (document.getElementById) {
        var i = 0;
        var detailsRow = document.getElementById('details' + i);
        var regularRow = document.getElementById('row' + i);
        var linkToShow = document.getElementById('viewlink' + i);
        var linkToHide = document.getElementById('hidelink' + i);
        while (detailsRow != null) {
            i++;
            regularRow.className = "regularrowshowdetails";
            detailsRow.className = "detailsrowshowdetails";
            detailsRow.style.display = browsersensitivetrow;
            
            if (linkToHide != null) { linkToHide.style.display = "inline"; }
            if (linkToShow != null) { linkToShow.style.display = "none"; }
            
            detailsRow = document.getElementById('details' + i);
            regularRow = document.getElementById('row' + i);
            linkToShow = document.getElementById('viewlink' + i);
            linkToHide = document.getElementById('hidelink' + i);
        }
    }
    if (document.getElementById('viewalllink') && document.getElementById('hidealllink')) {
        document.getElementById('viewalllink').style.display = "none";
        document.getElementById('hidealllink').style.display = "inline";
    }
}

function hidealldetails() {
    if (document.getElementById) {
        var i = 0;
        var detailsRow = document.getElementById('details' + i);
        var regularRow = document.getElementById('row' + i);
        var linkToShow = document.getElementById('viewlink' + i);
        var linkToHide = document.getElementById('hidelink' + i);
        while (detailsRow != null) {
            i++;
            
            regularRow.className = "regularrowhidedetails";
            detailsRow.className = "detailsrowhidedetails";
            detailsRow.style.display = "none";
            
            if (linkToHide != null) { linkToHide.style.display = "none"; }
            if (linkToShow != null) { linkToShow.style.display = "inline"; }
            
            detailsRow = document.getElementById('details' + i);
            regularRow = document.getElementById('row' + i);
            linkToShow = document.getElementById('viewlink' + i);
            linkToHide = document.getElementById('hidelink' + i);
        }
    }
    if (document.getElementById('viewalllink') && document.getElementById('hidealllink')) {
        document.getElementById('viewalllink').style.display = "inline";
        document.getElementById('hidealllink').style.display = "none";
    }
}





function showdetails(configindex) {
    if (document.getElementById) {
        if (document.getElementById('viewlink' + configindex)) {
            document.getElementById('viewlink' + configindex).style.display = "none";
        }
        if (document.getElementById('hidelink' + configindex)) {
            document.getElementById('hidelink' + configindex).style.display = "inline";
        }
        if (document.getElementById('details' + configindex)) {
            document.getElementById('details' + configindex).style.display = browsersensitivetrow;
        }
        if (document.getElementById('row' + configindex)) {
            document.getElementById('row' + configindex).className = "regularrowshowdetails";
        }
        if (document.getElementById('details' + configindex)) {
            document.getElementById('details' + configindex).className = "detailsrowshowdetails";
        }
    }
}

function hidedetails(configindex) {
    if (document.getElementById) {
        if (document.getElementById('viewlink' + configindex)) {
            document.getElementById('viewlink' + configindex).style.display = "inline";
        }
        if (document.getElementById('hidelink' + configindex)) {
            document.getElementById('hidelink' + configindex).style.display = "none";
        }
        if (document.getElementById('details' + configindex)) {
            document.getElementById('details' + configindex).style.display = "none";
        }
        if (document.getElementById('row' + configindex)) {
            document.getElementById('row' + configindex).className = "regularrowhidedetails";
        }
        if (document.getElementById('details' + configindex)) {
            document.getElementById('details' + configindex).className = "detailsrowhidedetails";
        }
    }
}


function showalldetailsdiv(index) {
	if (document.getElementById) {
        for (i = 0; i< index; i++) {
	        var detailsRow = document.getElementById('details' + i);
	        var regularRow = document.getElementById('row' + i);
	        var linkToShow = document.getElementById('viewlink' + i);
	        var linkToHide = document.getElementById('hidelink' + i);
	        if (detailsRow != null) {
	            detailsRow.className = "adv_det";
	            detailsRow.style.display = "block";
	            
	            if (linkToHide != null) { linkToHide.style.display = "inline"; }
	            if (linkToShow != null) { linkToShow.style.display = "none"; }
	        }
        }
    }
}

function hidealldetailsdiv(index) {
	if (document.getElementById) {
    	for (i = 0; i< index; i++) {
	        var detailsRow = document.getElementById('details' + i);
	        var regularRow = document.getElementById('row' + i);
	        var linkToShow = document.getElementById('viewlink' + i);
	        var linkToHide = document.getElementById('hidelink' + i);
	        if (detailsRow != null) {
	            detailsRow.className = "adv_det";
	            detailsRow.style.display = "none";
	            
	            if (linkToHide != null) { linkToHide.style.display = "none"; }
	            if (linkToShow != null) { linkToShow.style.display = "inline"; }
	        }
    	}
    }
}




function showdetailsdiv(configindex) {
    if (document.getElementById) {
        if (document.getElementById('viewlink' + configindex)) {
            document.getElementById('viewlink' + configindex).style.display = "none";
        }
        if (document.getElementById('hidelink' + configindex)) {
            document.getElementById('hidelink' + configindex).style.display = "inline";
        }
        if (document.getElementById('details' + configindex)) {
            document.getElementById('details' + configindex).style.display = "block";
        }
        if (document.getElementById('details' + configindex)) {
            document.getElementById('details' + configindex).className = "adv_det";
        }
    }
}

function hidedetailsdiv(configindex) {
    if (document.getElementById) {
        if (document.getElementById('viewlink' + configindex)) {
            document.getElementById('viewlink' + configindex).style.display = "inline";
        }
        if (document.getElementById('hidelink' + configindex)) {
            document.getElementById('hidelink' + configindex).style.display = "none";
        }
        if (document.getElementById('details' + configindex)) {
            document.getElementById('details' + configindex).style.display = "none";
        }
        if (document.getElementById('details' + configindex)) {
            document.getElementById('details' + configindex).className = "adv_det";
        }
    }
}


function highlightrow(checkboxname) {
    if (!checkboxname.checked) {
        var newclass="";
        var rowcells = checkboxname.parentNode.parentNode.getElementsByTagName('td');  
        for (var h = 0; h < rowcells.length; h++) {
            newclass = rowcells[h].className.replace(/selectedrow /,"");
            rowcells[h].className = newclass;
        }
    }
    else { 
        turnrowblue(checkboxname);
    }
}

function turnrowblue(checkboxname) {
    var rowcells = checkboxname.parentNode.parentNode.getElementsByTagName('td');
    for (var h = 0; h < rowcells.length; h++) {
        tempClass = rowcells[h].className;
        rowcells[h].className = "selectedrow " + tempClass;
    }
}

function showcsv() {
    document.getElementById('csv').style.display = 'block';
    document.getElementById('showcsv').style.display = 'none';
    document.getElementById('hidecsv').style.display = 'inline';
}

function hidecsv() {
    document.getElementById('csv').style.display = 'none';
    document.getElementById('showcsv').style.display = 'inline';
    document.getElementById('hidecsv').style.display = 'none';
}

function showemail() {
    document.getElementById('email').style.display = 'block';
    document.getElementById('showemaillink').style.display = 'none';
    document.getElementById('hideemaillink').style.display = 'inline';
}

function hideemail() {
    document.getElementById('email').style.display = 'none';
    document.getElementById('showemaillink').style.display = 'inline';
    document.getElementById('hideemaillink').style.display = 'none';
}

function newpopup(link,windowname) {
    if (window.open) {
        window.open(link,windowname,'toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=640,height=585');
        return false;
    }
    else { 
        return true;
    }
}

function helppopup(link,windowname) {
    if (window.open) {
        window.open(link,windowname,'toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=640,height=585');
        return false;
    }
    else { 
        return true;
    }
}

function legalpopup(link,windowname) {
    if (window.open) {
        window.open(link,windowname,'toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,height=585');
        return false;
    }
    else { 
        return true;
    }
}

function disablefields() {
    if (document.getElementsByName) {
        for (var k=1; k <=arguments.length; k++) {
            thisfield = document.getElementsByName(arguments[k-1]);
            thisfield.disabled = true;
        }
    }
}

function enablefields() {
    if (document.getElementsByName) {
        for (var k=1; k <=arguments.length; k++) {
            thisfield = document.getElementsByName(arguments[k-1]);
            thisfield.disabled = false;
        }
    }
}

function showoptions() {
    document.getElementById('moreoptions').style.display = 'block';
    document.getElementById('showlink').style.display = 'none';
    document.getElementById('hidelink').style.display = 'inline';
}

function hideoptions() {
    document.getElementById('moreoptions').style.display = 'none';
    document.getElementById('showlink').style.display = 'inline';
    document.getElementById('hidelink').style.display = 'none';
}

function hidecpcodepicker() {
    if (document.getElementById('singlecpcodepicker')) {
        document.getElementById('singlecpcodepicker').style.display = 'none';
    }
    if (document.getElementById('tagpicker')) {
        document.getElementById('tagpicker').style.display = 'none';
    }
    if (document.getElementById('day')) {
        document.getElementById('day').style.display = 'none';
    }
    if (document.getElementById('timezone')) {
        document.getElementById('timezone').style.display = 'none';
    }
    if (document.getElementById('gobutton')) {
        document.getElementById('gobutton').style.display = 'none';
    }
}

function showcpcodepicker() {
    if (document.getElementById('singlecpcodepicker')) {
        document.getElementById('singlecpcodepicker').style.display = 'block';
    }
    if (document.getElementById('tagpicker')) {
        document.getElementById('tagpicker').style.display = 'inline';
    }
    if (document.getElementById('day')) {
        document.getElementById('day').style.display = 'inline';
    }
    if (document.getElementById('timezone')) {
        document.getElementById('timezone').style.display = 'inline';
    }
    if (document.getElementById('gobutton')) {
        document.getElementById('gobutton').style.display = 'inline';
    }
}

function showsomething(thingtoshow) {
    document.getElementById(thingtoshow).style.display = 'block';
    if (document.getElementById(thingtoshow + '_showlink') && document.getElementById(thingtoshow + '_hidelink')) {
        document.getElementById(thingtoshow + '_showlink').style.display = 'none';
        document.getElementById(thingtoshow + '_hidelink').style.display = 'inline';
    }
    return false;
}

function hidesomething(thingtoshow) {
    document.getElementById(thingtoshow).style.display = 'none';
    if (document.getElementById(thingtoshow + '_showlink') && document.getElementById(thingtoshow + '_hidelink')) {
        document.getElementById(thingtoshow + '_showlink').style.display = 'inline';
        document.getElementById(thingtoshow + '_hidelink').style.display = 'none';
    }
    return false;
}

function showgran() {
    if (document.getElementById('granularity')) {
        if (document.emailreport.email_report.value != "html" && document.emailreport.email_frequency.value != "now") {
            document.getElementById('granularity').style.display=browsersensitivetrow;
        }
        else {
            document.getElementById('granularity').style.display="none";
            if (document.emailreport.granularity.selectedIndex) {
                document.emailreport.granularity.options[0].value = null;
                document.emailreport.granularity.selectedIndex = false;
            }
        }
    }
}

function showdates(recurrence) {
    if (recurrence.value != "now") {
        document.getElementById('daterange').style.display="none";
    }
    else {
        document.getElementById('daterange').style.display=browsersensitivetbody;
    }
}

function showformat(aggregation){
    if (aggregation == "full") {
        document.getElementById('format').style.display=browsersensitivetrow;
    }
    else {
        document.getElementById('format').style.display="none";
    }
}


function showurls(urloption){
    if (urloption == "other") {
        document.getElementById('topnspan').style.display="inline";
    }
    else {
        document.getElementById('topnspan').style.display="none";
    }
}


function showtopn(emailformat){
    if (emailformat != "html") {
        document.getElementById('topnurls').style.display=browsersensitivetrow;
    }
    else {
        document.getElementById('topnurls').style.display="none";
    }
}

function showtab(current,total,tabname) {
    if(!tabname) {
        tabname = "tab";
    }
    for (var i=1; i<= total; i++) {
        document.getElementById(tabname + i).style.display = "none";
        document.getElementById(tabname + "link" + i).className = "notcurrent";
    }
    document.getElementById(tabname + current).style.display = "block";
    document.getElementById(tabname + "link" + current).className = "current";
}



function toshow() {
    if (document.getElementById) {
        for (var i=0; i< arguments.length; i++) {
            document.getElementById(arguments[i]).style.display="block";
        }
    }
}

function tohide() {
    if (document.getElementById) {
        for (var i=0; i< arguments.length; i++) {
            document.getElementById(arguments[i]).style.display="none";
        }
    }
    
}

function toshowinline() {
    if (document.getElementById) {
        for (var i=0; i< arguments.length; i++) {
            document.getElementById(arguments[i]).style.display="inline";
        }
    }
}

function switchtoclass() {
    if (document.getElementById) {
        for (var i=0; i < (arguments.length - 1); i++) {
            document.getElementById(arguments[i]).className=arguments[arguments.length-1];
        }
    }
}

function showsection(sectiontoshow) {
    if (navflag != 1) {
        if (sectiontoshow == visiblesection) {
            document.getElementById(sectiontoshow).parentNode.className = "";
            visiblesection = "";
            if ((typeof footertop != "undefined") && footertop < 3000) {
                setcontentheight();
            }
        }
        else {
            if (document.getElementById(visiblesection)) {
                document.getElementById(visiblesection).parentNode.className = "";
            }
            document.getElementById(sectiontoshow).parentNode.className = "selected";
            visiblesection = sectiontoshow;
            if ((typeof footertop != "undefined") && footertop < 3000) {
                setcontentheight();
            }
        }
    }
}

function addnavlinks() {
    var x = document.getElementById('productlist');
    if (!x) return;
    var z = x.getElementsByTagName('div');
    for (var j=0;j<z.length;j++) {
        if (z[j].parentNode.className != "currentproduct") {
            z[j].onclick = function() {showsection(this.id)};
            z[j].firstChild.onclick = function() {navflag=1;};
        }
    }
}

function checkIndirectSelection() {                                                                            
    var selectedCustomer = document.forms["indirectCustomerForm"].elements["newProvisioningAcct"].value;
    if (selectedCustomer == undefined || selectedCustomer == '' ) {
        alert('Please select an account');
        return false;
    } else {
    return true;
}
}
