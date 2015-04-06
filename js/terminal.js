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
  cmds['blog'] = blog;
  
}


function Terminal(id) {
  if( typeof document.getElementById(id) === undefined) {
    throw new Error('Undefined object');
  }
  this.histMax = 100;
  this.histPos = 0;
  this.histroy = [];
  this._prompt = 'amine # ';
  this.domObj = document.getElementById(id);
  this.cmds = {};
  this.init();
}

Terminal.prototype.init = function() {
  var txt = '<div class="console">' +
      '<div class="history">' + this._prompt + '</div>' +
      '<div class="tty">' + 
      '<input type="text">' +
      '</div></div>';

  this.domObj.className += ' terminal';
  this.domObj.innerHTML = txt;
  this.stdin = this.domObj.getElementsByTagName('input')[0];
  this.stdout = this.domObj.getElementsByClassName('history')[0];
  var o = this;
	
	
	if(typeof window != undefined ) {
		window.onload = function() {
			o.stdin.focus();
		}
	}
	
  function keyHandler(e) {
    switch(e.which) {
      case 13:
        analyzeCmd();
        break;
      case 9:
        e.preventDefault();
        break;
      case 38:
        historyUp();
        break;
      case 40:
        historyDown();
        break;
      case 13:
        analyzeCmd();
        break;
    }
  }
  
  var analyzeCmd = function () {
    var cmd = o.stdin.value.trim();
    var options = cmd.split(' ');
    
    o.histroy.push(cmd);
    o.histPos = o.histroy.length;
    
    o.stdin.value = '';
    o.writeln(cmd);
		
		if(cmd.length != 0) {
			if(typeof o.cmds[cmd] == 'undefined') {
				defaultError();
			} else { 
				o.cmds[cmd](o);
			}
		}
    o.write(o._prompt)
  };

  var defaultError = function () {
    o.writeln('Command not found (try help)');
  }
  
  var historyUp = function () {
    if(o.histPos <= 0) return;
    o.histPos--;
    o.stdin.value = o.histroy[o.histPos];
  };
  
  var historyDown = function() {
    if(o.histPos >=  o.histroy.length - 1) return;
    o.histPos++;
    o.stdin.value = o.histroy[o.histPos];
  };
  
  this.stdin.addEventListener('keydown', function(e) {
    keyHandler(e);
  });

};


Terminal.prototype.write = function(str) {
  console.log(str);
  str = str.replace('\n', '</br>');
  this.stdout.innerHTML += str;
}

Terminal.prototype.writeln = function(str) {
  this.write(str + '\n');
}

Terminal.prototype.register = function(func, callback) {
  if(func === '' || typeof this.cmds[func] != 'undefined' ) {
    throw Error ('Error when registering a command '+ func);
  }

  this.cmds[func] = callback;
}


Terminal.prototype.clear = function() {
	this.stdout.innerHTML = '';
}


function help(t) {
  var txt = 'This is the help for this simple terminal.' +
      ' You can try some of this command to discovre more about my profile<br/><br>';
	
	for(var cmd in t.cmds) {
		txt += ' ' + cmd;
	}
	
	t.writeln(' ');
	t.writeln(txt);
	t.writeln(' ');
}

function blog() {
  location.href = '/blog';
}

function clear(t) {
	t.clear();
}

function exper(t) {
  var txt = '</br>April 2013 : Two months internship, application developer for ' +
      'Hassan II university, Science college</br></br>' +
      'June 2012 : One month internship Application developer for ' +
      'SAMIR company at Mohammedia, Morocco </br></br>';
  t.write(txt);
}

function education() {
  var txt = '</br>2013 - 2016 : Software Engineering Student at '+ 
      'the Faculty of Science and Technique Mohammedia, Morocco </br>' +
      '2011 - 2013 : DUT in Computer Science, Software Engineering at' +
      ' the School of Technology Berrechid, Morocco </br></br>';
  t.write(txt);
}

function name(t) {
  var txt = 'Amine KABAB </br>';
  t.write(txt);
}

function age(t) {
  var birthday = new Date('1993-1-4');
  var txt = ((new Date()).getFullYear() - birthday.getFullYear()) + '\n';
  t.writeln(txt);
}

function error(t) {
  var txt = 'Command not found ( try help command ) </br>';
  t.write(txt);
}

function projects(t) {
  var txt = '</br>Languages : C, C++, Python, JAVA </br>' +
      'Web technologies : PHP, Javascript, CSS, HTML5 </br>' +
      'Frameworks : jQuery, Angular.js, Express, Laravel </br>' +
      'Platforms : Nodejs, JavaEE </br>' +
      'DBMS : MySQL, Oracle, MongoDB </br>' +
      'Operting system : Linux (Ubuntu), Windows </br>' +
      'Modelisation : UML, Merise </br>' +
      'Networking : OSI, Static and dynamic routing </br></br>';
  t.write(txt);
}

function skills(t) {
  var txt = '</br>Languages : C, C++, Python, JAVA </br>' +
      'Web technologies : PHP, Javascript, CSS, HTML5 </br>' +
      'Frameworks : jQuery, Angular.js, Express, Laravel </br>' +
      'Platforms : Nodejs, JavaEE </br>' +
      'DBMS : MySQL, Oracle, MongoDB </br>' +
      'Operting system : Linux (Ubuntu), Windows </br>' +
      'Modelisation : UML, Merise </br>' +
      'Networking : OSI, Static and dynamic routing </br></br>';
  t.write(txt);
}

// init();

var ter = new Terminal('terminal');

ter.register('skills', skills);
ter.register('projects', projects);
ter.register('name', name);
ter.register('age', age);
ter.register('exper', exper);
ter.register('help', help);
ter.register('blog', blog);
ter.register('clear', clear);