//toDo

var chars1 = "ABCDEFGHIJ"
var chars2 = "KLMNOPQRS"
var chars3 = "TUVWXYZ"
//let chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var htmlData = chars1.split('').map((char) => '<div class="dots-element"> <div class="connect-dots-label">'+ char +'</div> <div id="left'+ char +'" class="connect-dots-point connect-dots-start"></div> </div>');
$('#dots').append(htmlData + "<br />")
var htmlData = chars2.split('').map((char) => '<div class="dots-element"> <div class="connect-dots-label">'+ char +'</div> <div id="left'+ char +'" class="connect-dots-point connect-dots-start"></div> </div>');
$('#dots').append(htmlData + "<br />")
var htmlData = chars3.split('').map((char) => '<div class="dots-element"> <div class="connect-dots-label">'+ char +'</div> <div id="left'+ char +'" class="connect-dots-point connect-dots-start"></div> </div>');
$('#dots').append(htmlData + "<br />")




jsPlumb.bind("ready", function() {

  var jspInstance = jsPlumb.getInstance();
  jspInstance.Defaults.Container = $("#connect-dots");
  
  var endpoint_source_options = {
    cssClass: 'endpoint-source',
    paintStyle: { fillStyle:'none' },
    isSource:true,
    connector: [ "Straight", { } ],
    connectorStyle: { strokeStyle:"#0db497", lineWidth:3 },
    isTarget:true,
    parameters: {}
  };

  var endpoint_target_options = {
    cssClass: 'endpoint-target',
    paintStyle: { fillStyle:'none' },
    isSource:false,
    isTarget:true,
    parameters: {}
  };
  
  var sources = chars.map((char) => {
    return jspInstance.addEndpoint('left' + char, endpoint_source_options)
  })
  /*
  var targets = chars.map((char) => {
    return jspInstance.addEndpoint('right' + char, endpoint_target_options)
  })
    var source1 = jspInstance.addEndpoint('connect-left-ledilamppu', endpoint_source_options );
    var source2 = jspInstance.addEndpoint('connect-left-halogeenilamppu', endpoint_source_options );
    var source3 = jspInstance.addEndpoint('connect-left-energiansaastolamppu', endpoint_source_options );
    var source4 = jspInstance.addEndpoint('connect-left-loistelamppu', endpoint_source_options );
  
  
    var target1 = jspInstance.addEndpoint('connect-right-syttyy', endpoint_target_options );
    var target2 = jspInstance.addEndpoint('connect-right-pitkaikainen', endpoint_target_options );
    var target3 = jspInstance.addEndpoint('connect-right-hyva', endpoint_target_options );
    var target4 = jspInstance.addEndpoint('connect-right-kun', endpoint_target_options );

  */
  // empty connections
  $('#connect-dots-empty').click(function() {
    resetSettings();
    console.log('test');
    $('.connect-dots-wrong').removeClass('connect-dots-wrong');
    $('.connect-dots-right').removeClass('connect-dots-correct');
    jspInstance.detachEveryConnection();
  });
  
  // validate answers
  $('#savebtn').click(function() {
     
    chars.map((char) => {
      var tmp = jspInstance.getConnections({ source: 'left'+char})[0]
      if(tmp){
        console.log(char + " => " +tmp.targetId.split('left')[1])
        plugBoard[char] = tmp.targetId.split('left')[1]
        plugBoard[tmp.targetId.split('left')[1]] = char

      }
    })

    hideSettings()
    clearText()
  });

});
