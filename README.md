pouchdb-fauxton-chrome-extension
================================

A chrome extension that allows you to view all PouchDB databases on the
current web page. IndexedDB backed databases are supported only (but
that's the default anyway).

![pouchdb-fauxton-chrome-extension in action](http://s30.postimg.org/l2nh5v1up/chrome_donegd.png)

Internals
---------

Make sure you're familiar with how
[pouchdb-fauxton-logic](https://github.com/marten-de-vries/pouchdb-fauxton-logic)
works before reading this.

This extension shows a special version of PouchDB-Fauxton inside a
developer tool panel in Chrome. This version doesn't directly run
pouchdb-route on the resultive CouchDB request object, but instead uses
message passing to pass it to the extension. The extension passes it
to the current page in the current tab, which *does* run pouchdb-route
on it, and then the whole thing happens again in reverse. This way, it
gets to see the PouchDB databases of the current page, not of the
developer tools.

Building
--------

Get a copy of [pouchdb-fauxton-logic](https://github.com/marten-de-vries/pouchdb-fauxton-logic)
and make sure it's accessable under `../pouchdb-fauxton-logic`. Also
make sure `npm install` has been ran at least once it that directory.
Then run:

	./build-generated-files.sh

The result is a complete unpacked extension you can load (or pack to a
.crx file) using Chrome/Chromium.
