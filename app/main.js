var win = nw.Window.get();
win.showDevTools();

var title = document.getElementById("title");
title.innerHTML = "NW.js version = " + process.versions['nw'] + " <br>    chromium version = " + process.versions[
	'chromium'];

var openWindow,
	number = 0,
	progress = 0;

function newWindow() {
	nw.Window.open('https://github.com/nwjs/nw.js', {
		"frame": false
	}, function (new_win) {
		openWindow = new_win;
	});
}

function closeOpenWindow() {
	openWindow.window.close();
}

function setBadgeLabel() {
	number++;
	win.setBadgeLabel(number.toString());
}

function setProgressBar() {
	progress += 0.01;
	win.setProgressBar(progress);
	if (progress >= 1) {
		progress = 0;
		win.setProgressBar(progress);
		return;
	}
	setTimeout(function () {
		setProgressBar();
	}, 50);
}

win.on('focus', function () {
	win.setBadgeLabel("");
	number = 0;
});

function menuBar() {
	var your_menu = new nw.Menu({
		type: 'menubar'
	});
	var submenu = new nw.Menu();
	submenu.append(new nw.MenuItem({
		label: 'Item A',
		click: function () {
			alert("Item A click");
		}
	}));
	submenu.append(new nw.MenuItem({
		label: 'Item B',
		click: function () {
			alert("Item B click");
		}
	}));
	your_menu.append(new nw.MenuItem({
		label: 'First Menu',
		submenu: submenu
	}));
	your_menu.append(new nw.MenuItem({
		label: 'Second Menu',
		submenu: submenu
	}));
	your_menu.append(new nw.MenuItem({
		label: 'Third Menu',
		submenu: submenu
	}));
	nw.Window.get().menu = your_menu;
}

function menu(event) {
	var menu = new nw.Menu();
	menu.append(new nw.MenuItem({
		label: 'Item A',
		click: function () {
			alert("Item A click");
		}
	}));
	menu.append(new nw.MenuItem({
		label: 'Item B',
		click: function () {
			alert("Item B click");
		}
	}));
	menu.append(new nw.MenuItem({
		label: 'Item C',
		click: function () {
			alert("Item C click");
		}
	}));
	menu.popup(event.x, event.y);
}

function clipboard() {
	var clipboard = nw.Clipboard.get();
	var text = clipboard.get('text');
	alert(text);
	clipboard.set('I love NW.js :)', 'text');
}

function clipboardImg() {
	var fs = require('fs');
	var path = require('path');
	var pngPath = path.resolve('app/nw.png');
	var data = fs.readFileSync(pngPath).toString('base64');
	var clip = nw.Clipboard.get();
	clip.set({
		type: 'png',
		data: data,
		raw: true
	});
}

function shortcut() {
	var option = {
		key: "Ctrl+Shift+A",
		active: function () {
			console.log("1 Global desktop keyboard shortcut: " + this.key + " active.");
		},
		failed: function (msg) {
			console.log(msg);
		}
	};
	var shortcut = new nw.Shortcut(option);
	shortcut.on('active', function () {
		console.log("2 Global desktop keyboard shortcut: " + this.key + " active.");
	});
	shortcut.on('failed', function (msg) {
		console.log(msg);
	});
	nw.App.unregisterGlobalHotKey(shortcut);
	nw.App.registerGlobalHotKey(shortcut);
}

function tray() {
	var tray = new nw.Tray({
		title: 'Tray',
		tooltip: 'NWjs Demo',
		icon: 'app/nw.png'
	});
	var menu = new nw.Menu();
	menu.append(new nw.MenuItem({
		type: 'checkbox',
		label: 'box1'
	}));
	menu.append(new nw.MenuItem({
		label: '关闭',
		click: function () {
			nw.App.quit();
		}
	}));
	tray.menu = menu;
	tray.on("click", function (event) {
		win.show();
	});
}