**[↤ Developer Overview](../README.md#developer-overview)**

Troubleshooting
===

<img src="https://octodex.github.com/images/inspectocat.jpg" width="300" />

This document will contain a list of known issues, and how to solve them.

__Debug Window Too Small !!__

> Ya, this is probably the very first thing you saw.  To fix this, click anywhere within the dev tools window and press `Command+Shift+D` on Mac or `Control+Shift+D` until the debug window pops out into its own window.

A Note for Windows Users
---

If you run into errors during `npm install` about `node-gyp`, then you most likely do not have the proper build tools installed on your system. Build tools include items like Python and Visual Studio. Thanks to [@felixrieseberg](https://github.com/felixrieseberg), there are a few packages to help simplify this process.

The first item we need to check is our npm version and ensure that it is not outdated. This can is accomplished using [npm-windows-upgrade](https://github.com/felixrieseberg/npm-windows-upgrade). If you are using `yarn`, then you can skip this check.

Once that is complete, we can then continue to setup the needed build tools. Using [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools), most of the dirty work is done for us. Installing this globally will in turn setup Visual C++ packages, Python, and more.

At this point things should successfully install, but if not then you will need a clean installation of Visual Studio. Please note that these are not direct problems with `electron-vue` itself ( Windows can be difficult sometimes `¯\_(ツ)_/¯` ).
