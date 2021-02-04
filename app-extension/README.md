# Quasar App Extension qenv

quasar-app-extension-qenv is a `CLI App Extension` for [Quasar Framework](https://quasar.dev/). It is a stand-alone environment-to-browser parser and aggregator.

![@quasar/quasar-app-extension-qenv](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qenv.svg?label=@quasar/quasar-app-extension-qenv)
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qenv.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qenv)

**Now compatible with Quasar v2 beta**

# Demo
Can be found [here](https://quasarframework.github.io/app-extension-qenv/).

# Install
```bash
quasar ext add @quasar/qenv
```
Quasar CLI will retrieve it from NPM and install the extension.

## Prompts

1. "What name would you like to use for your Common Root Object ('none' means to not use one)?"
  The default is "none"
  The "common root object" means off of "process.env" you will have a named object, basically for organization purposes.

2. "For security, would you like your .quasar.env.json file automatically added to .gitignore?"
  The default is "true" (yes)
  If you say "yes" to this question, then your .quasar.env.json file will automatically be inserted into the .gitignore.
  For security purposes, because you may have sensitive data in your `.quasar.env.json` file, you should not keep it in a repository.

# Accessing the data
Any data in a `.quasar.env.json` will be placed in `process.env` at the browser level.

# Tips
If you specified a common root object, say `MyData`, then the data will be placed at `process.env.MyData`.

Be aware, if you have something like this in your `.quasar.env.json`:

```json
"APP_PORT": "4000"
```

Then you will need to use the `parseInt()` function as it will be propogated to the browser code as a string. You should really do it this way:

```json
"APP_PORT": 4000
```
Now, the variable will be accessible in the browser as a number.

# Format
The format of the `.quasar.env.json` is as follows:
```json
{
  "development": {
    "ENV_TYPE": "Running Development",
    "ENV_DEV": "Development"
  },
  "production": {
    "ENV_TYPE": "Running Production",
    "ENV_PROD": "Production"
  },
  "test": {
    "ENV_TYPE": "Running Test",
    "ENV_Test": "Test"
  }
}
```
This is the default that is installed and you will need to modify it to fit your needs.

You can add as many environments as needed (top-level keys). You are not restricted to the `development`, `production` and `test` that come by default. And, you can add as many variables under those environment types as you like.

# Specifying environment
So, how is this accessed?

You will need to modify your `package.json` in the scripts area. Let's take a look at an example:

```json
  "scripts": {
    "dev": "QENV=development quasar dev",
    "test-dev": "QENV=test quasar dev",
    "combined": "QENV=development+test quasar dev",
    "build": "QENV=production quasar build"
  },
```

Basically, you need to set the QENV environment variable for Node. You specifiy the key that you want for the propgated data.

# QEnv with Windows
There are several ways to set the QENV enviironment variable on Windows.

**CMD**
```json
"dev": "set QENV='development' & quasar dev"
```

**PowerShell (VS Code default)**
```json
"dev": "$env:QENV='development'; quasar dev"
```

...and for a solution that works for either:

Many thanks to [NicksonYap](https://github.com/NicksonYap) for the following information:

QEnv will work on Windows by additionally installing [cross-env](https://www.npmjs.com/package/cross-env).

```js
npm install --save-dev cross-env

or

yarn add --dev cross-env
```

Then, in package.json:

```json
"dev": "cross-env QENV=development quasar dev"
```

# QEnv with Docker
QEnv will work with Docker by using the following syntax to inject your QENV variable into Node:

```bash
$ sudo docker run [...] -e QENV="development"
```

# Chaining environments
Look at the `combined` script. Absolutely, you can chain two or more configurations together. When doing this, if there is any conflicting variables, the last one in wins.

In other words:

```json
"combined": "QENV=development+test quasar dev",
```

will give different results than:

```json
"combined": "QENV=test+development quasar dev",
```

And to be clear, you would do the following to run it:

```bash
# npm
npm run combined

# or

# yarn
yarn combined
```

# Uninstall
```bash
quasar ext remove @quasar/qenv
```

# Donate
If you appreciate the work that went into this, please consider donating to [Quasar](https://donate.quasar.dev) or [Jeff](https://github.com/sponsors/hawkeye64).

# License
MIT (c) Jeff Galbraith <jeff@quasar.dev>
