'use strict';

import { Menu, MenuBar, MenuItem } from 'phosphor-menus';
import { DockPanel } from 'phosphor-dockpanel';
import { Message } from 'phosphor-messaging';
import { Widget } from 'phosphor-widget';

import { DocumentPanel } from './document';

import { Compiler } from 'gakuon';

import './index.css';


/**
 * Create a placeholder content widget.
 */
function createPlaceholder(title: string, color: string): Widget {
  let widget = new Widget();
  widget.addClass('content');
  widget.addClass(color);

  widget.title.text = title;
  widget.title.closable = true;

  return widget;
}


/**
 * A handler which logs the item text to the log span.
 */
function logHandler(item: MenuItem): void {
  console.log(item.text);
}

function exportSID(): void {
  let compiler = new Compiler();
  // alert('exported');
}

/**
 * Create the example menu bar.
 */
function createMenuBar(): MenuBar {
  let fileMenu = new Menu([
    new MenuItem({
      text: 'New',
      shortcut: 'Ctrl+N',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Open',
      shortcut: 'Ctrl+O',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Save',
      shortcut: 'Ctrl+S',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Save As...',
      shortcut: 'Ctrl+Shift+S',
      disabled: true
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Export SID file',
      handler: exportSID
    }),
    new MenuItem({
      text: 'Export to...',
      submenu: new Menu([
        new MenuItem({
          text: 'Assembly code (.asm)',
          handler: logHandler
        }),
        new MenuItem({
          text: 'Player program (.prg)',
          handler: logHandler
        })
      ])
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Close',
      shortcut: 'Ctrl+W',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Close All',
      handler: logHandler
    })
  ]);

  let editMenu = new Menu([
    new MenuItem({
      text: '&Undo',
      icon: 'fa fa-undo',
      shortcut: 'Ctrl+Z',
      handler: logHandler
    }),
    new MenuItem({
      text: '&Repeat',
      icon: 'fa fa-repeat',
      shortcut: 'Ctrl+Y',
      disabled: true
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: '&Copy',
      icon: 'fa fa-copy',
      shortcut: 'Ctrl+C',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Cu&t',
      icon: 'fa fa-cut',
      shortcut: 'Ctrl+X',
      handler: logHandler
    }),
    new MenuItem({
      text: '&Paste',
      icon: 'fa fa-paste',
      shortcut: 'Ctrl+V',
      handler: logHandler
    })
  ]);

  let findMenu = new Menu([
    new MenuItem({
      text: 'Find...',
      shortcut: 'Ctrl+F',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Find Next',
      shortcut: 'F3',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Find Previous',
      shortcut: 'Shift+F3',
      handler: logHandler
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Replace...',
      shortcut: 'Ctrl+H',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Replace Next',
      shortcut: 'Ctrl+Shift+H',
      handler: logHandler
    })
  ]);

  let helpMenu = new Menu([
    new MenuItem({
      text: 'Documentation',
      handler: logHandler
    }),
    new MenuItem({
      text: 'About',
      handler: logHandler
    })
  ]);

  return new MenuBar([
    new MenuItem({
      text: 'File',
      submenu: fileMenu
    }),
    new MenuItem({
      text: 'Edit',
      submenu: editMenu
    }),
    new MenuItem({
      text: 'Find',
      submenu: findMenu
    }),
    new MenuItem({
      text: 'View',
      type: MenuItem.Submenu
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Help',
      submenu: helpMenu
    })
  ]);
}



/**
 * The main application entry point.
 */
function main(): void {
  let panel = new DockPanel();
  panel.id = 'main';

  let oscWidget = createPlaceholder('Oscilloscope', 'blue');
  let contextWidget = createPlaceholder('Context', 'red');
  let pianoRollWidget = createPlaceholder('Piano Roll', 'green');

  let docPanel = new DocumentPanel();

  panel.insertRight(docPanel);
  panel.insertRight(oscWidget, docPanel);
  panel.insertBottom(contextWidget, oscWidget);
  panel.insertBottom(pianoRollWidget);

  let menuBar = createMenuBar();

  // attach menu and panel to HTML body
  menuBar.attach(document.body);
  panel.attach(document.body);

  window.onresize = () => { panel.update(); };
}

window.onload = main;
