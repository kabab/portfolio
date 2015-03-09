var cmds = {};

function init() {
  cmds['help'] = help;
  cmds['?'] = help;
  cmds['clear'] = clear;
  cmds['age'] = age;
  cmds['name'] = name;
  cmds['skills'] = skills;
  cmds['education'] = education;
  cmds['exper'] = exper;
}

$('#cmd').keypress(function(e) {
  if( e.which == 13) {
   analyzeCmd();
  }
});

function analyzeCmd() {
  var cmd = $('#cmd').val();
  $('#hist').append(cmd + '</br>'); 

  if(cmd.trim() == '') {
    prompt();
    return;
  }

  if(cmds[cmd.trim()] == undefined ) {
    error();
  } else {
    (cmds[cmd.trim()])();
  }

  prompt();
  $('#cmd').val('');
}

function help() {
  var txt = '</br>This is the help for this simple terminal.' +
      'You can try some of this command to discovre more about my profile<br/><br>' + 
      'name age skills blog exper projects contact clear </br></br>';
  $('#hist').append(txt);
}

function clear() {
  $('#hist').text('');
}

function exper() {
  var txt = '</br>April 2013 : Two months internship, application developer for ' +
      'Hassan II university, Science college</br></br>' +
      'June 2012 : One month internship Application developer for ' +
      'SAMIR company at Mohammedia, Morocco </br></br>';
  $('#hist').append(txt);
}

function education() {
  var txt = '</br>2013 - 2016 : Software Engineering Student at '+ 
      'the Faculty of Science and Technique Mohammedia, Morocco </br>' +
      '2011 - 2013 : DUT in Computer Science, Software Engineering at' +
      ' the School of Technology Berrechid, Morocco </br></br>';
  $('#hist').append(txt);
}

function prompt() {
  var txt = 'amine # ';
  $('#hist').append(txt);
}

function name() {
  var txt = 'Amine KABAB </br>';
  $('#hist').append(txt);
}

function age() {
  var birthday = new Date('1993-1-4');
  var txt = (new Date()).getFullYear() - birthday.getFullYear();
  $('#hist').append(txt + '</br>');
}

function error() {
  var txt = 'Command not found ( try help command ) </br>';
  $('#hist').append(txt);
}

function projects() {
  var txt = '</br>Languages : C, C++, Python, JAVA </br>' +
      'Web technologies : PHP, Javascript, CSS, HTML5 </br>' +
      'Frameworks : jQuery, Angular.js, Express, Laravel </br>' +
      'Platforms : Nodejs, JavaEE </br>' +
      'DBMS : MySQL, Oracle, MongoDB </br>' +
      'Operting system : Linux (Ubuntu), Windows </br>' +
      'Modelisation : UML, Merise </br>' +
      'Networking : OSI, Static and dynamic routing </br></br>';
  
}

function skills() {
  var txt = '</br>Languages : C, C++, Python, JAVA </br>' +
      'Web technologies : PHP, Javascript, CSS, HTML5 </br>' +
      'Frameworks : jQuery, Angular.js, Express, Laravel </br>' +
      'Platforms : Nodejs, JavaEE </br>' +
      'DBMS : MySQL, Oracle, MongoDB </br>' +
      'Operting system : Linux (Ubuntu), Windows </br>' +
      'Modelisation : UML, Merise </br>' +
      'Networking : OSI, Static and dynamic routing </br></br>';
  $('#hist').append(txt);    
}

init();