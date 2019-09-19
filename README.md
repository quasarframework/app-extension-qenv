QEnv (@quasar/qenv)
===

![official icon](https://img.shields.io/badge/Quasar%201.0-Official%20CLI%20App%20Extension-green.svg)
![npm (scoped)](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qenv.svg?style=plastic)

[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/app-extension-qenv.svg)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/app-extension-qenv.svg)]()
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qenv.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qenv)

This project is an official Quasar v1 CLI App Extension.

@quasar/qenv is a `CLI App Extension` for [Quasar Framework v1](https://v1.quasar-framework.org/). It will not work with legacy versions of Quasar Framework.

This work is currently in `beta` and there are expected changes while things get worked out. Your help with testing is greatly appreciated.

# Test Project
In **demo** folder of **app-extension-qenv**.

# Demo
Can be found [here](https://quasarframework.github.io/app-extension-qenv/).

# Install
To add this App Extension to your Quasar application, run the following (in your Quasar app folder):

```bash
quasar ext add @quasar/qenv
```

Quasar CLI will retrieve it from NPM and install the extension.

You will be asked a couple of questions. Type in your answers:
```
? What name would you like to use for your Common Root Object ('none' means to not
 use one)? none
? For security, would you like your .quasar.env.json file automatically added to .
gitignore? Yes
```

Selecting `[enter]` on your keyboard will give you the defaults. There will be no common root object and the `.quasar.env.json` will be added to your `.gitignore`.

Also, it is highly recommended to add your `.quasar.env.json` file to your `.gitignore`. It really does not belong in your repository as it may contain sensitive data.

# Accessing the Data
Any specified data in `.quasar.env.json` will be placed in `process.env` at the browser level.

If you specified a common root object, say `MyData`, then the data will be placed at `process.env.MyData`.

# Tips
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

# Specifying the Environment
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

Basically, you need to set the QENV environment variable for Node. You specify the key that you want for the propagated data.

# QEnv with Windows
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

# Qenv with Docker
QEnv will work with Docker by using the following syntax to inject your QENV variable into Node:

```bash
$ sudo docker run [...] -e QENV="development"
```

# Chaining the Environments
Look at the `combined` script. Absolutely, you can chain two or more together. When doing this, if there is any conflicting variables, the last one in wins.

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
To uninstall:
```
quasar ext remove @quasar/qenv
```

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
