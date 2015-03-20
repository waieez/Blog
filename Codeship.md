##Codeshipped!

###Continuous Deployment
Using [Codeship](https://codeship.com) for continuous deployment is really easy. It's so ridiculously easy that I considered not writing this post.

Still there's some small value to having everything on one page.
Also, there are some minor gotchas when switching between local development and deployment.
I'll be going over a Node.js deployment on Heroku via Codeshipped.
But I imagine the process is pretty much the same across the board.

### Heroku
[Signup](https://signup.heroku.com/) for a Heroku Account. 

[Follow their setup](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).


In the terminal:
```
$ cd to/project/directory
$ heroku create
```

#### Setup Environment Variables
[Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars)

```
$ heroku config:set <variable>=<value>
```

[Create a Procfile](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile)

```
web: <server>.js
```

Double check that your dependencies are in your package.json.

If you're using bower, make sure you've saved bower as a dependency
```
$ npm install --save <dependencies>
```

#### Gotcha!:

You may need to add a postinstall script to your package.json for heroku to actually install your bower dependencies and automate some build tasks via grunt/gulp.

[For example:](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process)

```javascript
"scripts": {
  "start": "node index.js",
  "test": "mocha",
  "postinstall": "bower install && grunt build"
}
```

### Codeship

At this point you should be able to just follow their guide and get your shiny new codeshipped badge. There are a couple gotchas though.

#### Connect SCM
Simply click Github or Bitbucket...

#### Select Repository
Search/Select your repo...

#### Modify Setup and Test Commands
Select node.js (or whatever you're using).
You should see this, or something similar.


```
# By default we use the Node.js version set in your package.json or 0.10.25
# You can use nvm to install any Node.js version.
# i.e.: nvm install 0.10.25
nvm install 0.10.25
nvm use 0.10.25
npm install
# Install grunt-cli for running your tests or other tasks
# npm install grunt-cli
```
Feel free to edit this to include whatever your project needs.

For example: when using grunt, simply uncomment the last line to install grunt-cli

These commands will execute in order.


Always double check this, package.json, and your environment variables first if a build works locally but fails to deploy. Likely you messed up a step.


#### Deployment
Here I've selected Heroku Deployment.
Just follow their instructions.

#### Push
If you've done everything right, throw this in your README.md for a shiny new badge.
```
![Codeshipped](https://codeship.com/projects/YOUR_PROJECT_UUID/status?branch=master)
```

## Voila! Continuous Deployment!