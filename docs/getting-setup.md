**[↤ Developer Overview](../README.md#developer-overview)**

Getting Setup
===

Requirements
---

* [NodeJS](https://nodejs.org/en/)
* Experience with [Electron.js](https://electronjs.org)
* Experience with [Vue.js 2](https://vuejs.org)


Project Setup
---

First, Clone the Repo:

```
cd /path/to/projects
git clone git@github.com:manifestinteractive/weather-bar-app.git .
cd weather-bar-app
```

Next, edit the .env file:

```
cp .env.example .env
nano .env
```

Now, you can install and run the app:

```
npm install
npm run dev
```

Once you have the Weather Bar running, you can manage it using our [Development Scripts](development-scripts.md).

Developer Resources
---

* [Electron Docs](https://electronjs.org/docs)
* [Vue Docs](https://vuejs.org/v2/guide/)
* [Electron-Vue Docs](https://simulatedgreg.gitbooks.io/electron-vue/en/)
* [Electron Menubar](https://github.com/maxogden/menubar)
* [NeDB Persistent Storage](https://github.com/louischatriot/nedb)
* [Open Weather Map - Weather Conditions](https://openweathermap.org/weather-conditions)
* [Open Weather Map - API](https://openweathermap.org/api)
