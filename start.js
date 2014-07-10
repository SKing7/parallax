var fs = require('fs');
var relativeRes = '../avalon.oniui/';
var dir = '/Users/liuzhe/qunar/avalon.oniui/';
var dirWWW = '/Users/liuzhe/qunar/www/';
var files = fs.readdirSync(dir);
var child = require('child_process');
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path
var indexJson = {};
var monthIndex = {};
for(var i = 0; i < files.length; i++){
	var baseName = files[i];
	var name = dir+baseName;
	if (fs.statSync(name).isDirectory()){
		//avalon.tooltip.doc.html
		var absPath = name + '/avalon.' + baseName + '.doc.html' 
		if (fs.existsSync(absPath)) {
			var monthNum = monthIndex[baseName] || Math.ceil(Math.random() * 10);
			indexJson[monthNum] = indexJson[monthNum] || [];
			indexJson[monthNum].push({
				name:baseName,
				url: relativeRes + baseName + '/avalon.' + baseName + '.doc.html',
				title:'测试标题',
				des: '这里是描述:accordion组件是在有限的区域显示可折叠内容面板的信息，通过不同的配置选项和丰富的api可以灵活的设置和调用accordion，接下来对所有的配置项和可用的API做以说明',
				cover: 'doc/img/' + baseName + '.png'
			});
			child.exec(binPath + ' ' + dirWWW + 'capture.js ' + absPath,  function(err, stdout, stderr) {
				console.log(absPath + 'don');
				child.exec('mv *.png doc/img/', function () {});
			})
		}
	}
}
fs.writeFile(dirWWW + 'doc/index.js', 'window.indexData = ' + JSON.stringify(indexJson, null, 4), function(err) {}); 
//index.json {4->[{name,url,title,des}], 5->[]}
