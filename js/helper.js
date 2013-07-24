
function searchInstance(){
  var href = '../api/v2/view/instances;';  
  var id = document.getElementById('id').value;
  if(id != '')
    href = href + 'instanceId='+id;

  var dateType = document.getElementsByName('date');
  var since='';
  var until='';
  var at='';

  if(dateType[0].checked){
    since = document.getElementById('since').value;
    until = document.getElementById('until').value;
    if(since != '')
      since = '_since='+Date.parse(since)+';';
    
    if(until != '')
      until = '_until='+Date.parse(until)+';';
  }
  else{
    at = document.getElementById('at').value;
    if(at != '')
      at = '_at='+Date.parse(at)+';';
  }

  var ami = document.getElementById('ami').value;
  if(ami != '')
    href = href + 'imageId='+ami+';';

  var privateIp = document.getElementById('privateIp').value;
  if(privateIp != '')  
    href = href + 'privateIpAddress='+privateIp+';';
  
  var publicIp = document.getElementById('publicIp').value;
  if(publicIp != '')   
    href = href + 'publicIpAddress='+publicIp+';';

  var zone = document.getElementById('zone').value;
  if(zone != '')  
    href = href + 'placement.availabilityZone='+zone+';';
  
  var type = document.getElementById('type').value;
  if(type != "")
  	href +='instanceType='+type+";";
   
  var state = document.getElementById('state').value;
  if(state != "")
    href +='state.name='+state+";";

  var tag = document.getElementById('tag').value;

  href = href +at+since+until+";";
  var ul = "<table class='tablesorter'><thead><tr><th>Instance</th>";

  var items= document.getElementsByName('setCheckbox');
  for(var i=1;i<items.length;i++){
    if(items[i].checked){
      var tmp = items[i].value;
      if(tmp == 'placement:(availabilityZone)')
        tmp='availabilityZone';
      if(tmp == 'securityGroups:(groupName)')
        tmp='securityGroups';
       if(tmp == 'state:(name)')
        tmp='state';
      ul=ul+"<th>"+tmp+"</th>";   
    }
  }

  ul+="</tr></thead><tbody>";
  
  $.ajax({
    url: href,    
    async:false,          
    success:function(data1) {                                        
      for(var i=0;i<data1.length;i++){
        var item="";
        var count;
        item +="<tr><td>"+data1[i]+"</td>";

        $.ajax({
          url: "../api/v2/view/instances/"+data1[i]+";"+filter(),
          async:false,
          success:function(data){
                
            $.each(data,function(key,val){                
              if(key =="securityGroups"){
                item+="<td>";
                for(var i = 0;i<val.length;i++)
                  item+=val[i].groupName+"; ";
                item+="</td>"
              }

              else if(key == "placement")
                item+="<td>"+val.availabilityZone+"</td>";

              else if(key == "launchTime"){
                var d = new Date(val);
                item+="<td>" +d.toUTCString()+"</td>";
              }
                  
              else if(key == "state")
                item +="<td>"+val.name+"</td>";
              
              else if(key =="tags"){
                count =0;
                item+="<td>";
                for(var i=0;i<val.length;i++){
                  item+=val[i].key+":"+val[i].value+";";
                  if(val[i].key.indexOf(tag)!=-1||val[i].value.indexOf(tag)!=-1 )
                    count ++;                       
                }
                     
                item+="</td>"
              }
              else
                item+="<td>"+val+"</td>";
             });
          }
              
        }); 

        if(count ==0) 
          item=""; 
        ul+=item;             
        ul+="</tr>";
      }
      ul+="</tbody></table>"             
      $('#instanceNum').html('<b>You have: '+data1.length+' instances</b>');
    }        
  });

  $('#result').html(ul);
  $("table").tablesorter({
    theme : 'blue',
    // initialize zebra striping and resizable widgets on the table
    widgets: [ "zebra", "resizable" ],
    widgetOptions: {
      resizable_addLastColumn : true
    }
  });
}

function filter(){
  var meta ='_expand:(';
  var items= document.getElementsByName('setCheckbox');
  
  for(var i=0;i<items.length;i++){
    if(items[i].checked){
      var tmp = items[i].value;   
      meta = meta+ tmp+',';
    }
  }
  meta = meta +')';
  return meta;
}

function selectAll(){
  var checkboxs = document.getElementsByName('setCheckbox');
 
  for(var i=1;i<checkboxs.length;i++){
    var e = checkboxs[i];
    e.checked = !e.checked;
  } 
}



