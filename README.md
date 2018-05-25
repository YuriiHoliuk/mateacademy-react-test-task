# \<react-test-task-app\>

Form validation app for Mate academy React course test task

## Preview

View working project [WebComponents form validation](https://mateacademy-react-test-task.firebaseapp.com)

Also, you can read docs [here](https://yuriiholiuk.github.io/mateacademy-react-test-task)

## TODO:
- Write tests
- Add webpack(or another method) to build polymer doc OR generate correct params doc by current gulp plugin
- Create another polymer elements project for reusable components
- Style button or create custom button
- Add custom styles to select & radio controls
- Create separate component for textarea
- Switch to typescript

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your application locally.

## Viewing Your Application

```
$ polymer serve
```

## Building Your Application

```
$ polymer build
```

This will create builds of your application in the `build/` directory, optimized to be served in production. You can then serve the built versions by giving `polymer serve` a folder to serve from:

```
$ polymer serve build/default
```

## Build Documentation

Create JSDoc documentation by gulp plugin in ```/docs``` folder

```
$ npm run docs
```

Create documentation based on Polymer ```<iron-component-page>``` - in progress

```
$ npm run docs:polymer
```

## Deploy Project

Deploy main project to firebase
You need setup firebase project before

```
$ npm run deploy
```

Run ```git push origin <branch_name>:master``` to deploy docs to GitHub Pages 

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
