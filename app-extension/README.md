# Quasar App Extension qenv

quasar-app-extension-qenv is a `CLI App Extension` for [Quasar Framework](https://quasar.dev/). It is a stand-alone environment-to-browser parser and aggregator.

![@quasar/quasar-app-extension-qenv](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qenv.svg?label=@quasar/quasar-app-extension-qenv)
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qenv.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qenv)

**Now compatible with Quasar v2 beta**

> v1.1.0 now supports expanding environmental variables put inside your `.quasar.env.json` file!

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

# Accessing the Data
Any data in a `.quasar.env.json` will be placed in `process.env` at the browser level. DO NOT `console.log(process.env)` as you will not see anything. For security purposes Quasar abstracts this away from prying eyes. If your env variable is `PORT`, then you can `console.log(process.env.PORT)` to see the results.

# Tips
If you specified a common root object, say `MyData`, then the data will be placed at `process.env.MyData`.

# Format
The format of the `.quasar.env.json` is as follows:
```json
{
  "development": {
    "ENV_TYPE": "Running Development",
    "ENV_DEV": "Development",
    "SHELL: "${SHELL}"
  },
  "production": {
    "ENV_TYPE": "Running Production",
    "ENV_PROD": "Production",
    "SHELL: "${SHELL}"
  },
  "test": {
    "ENV_TYPE": "Running Test",
    "ENV_Test": "Test",
    "SHELL: "${SHELL}"
  }
}
```
This is the default that is installed and you will need to modify it to fit your needs.

You can add as many environments as needed (top-level keys). You are not restricted to the `development`, `production` and `test` that come by default. And, you can add as many variables under those environment types as you like.

# Using Environment Variables
Environment variable are accessed like this: `$MyVar` or `${MyVar}`. If it exists, then it will be expanded.

Let's use the `test` object from above to expand it out for something that would be used in production:

```bash
  "test": {
    NODE_ENV: "test",
    BASIC: "basic",
    BASIC_EXPAND: "$BASIC",
    MACHINE: "machine_env",
    MACHINE_EXPAND: "$MACHINE",
    UNDEFINED_EXPAND: "$UNDEFINED_ENV_KEY",
    ESCAPED_EXPAND: "\$ESCAPED",
    MONGOLAB_DATABASE: "heroku_db",
    MONGOLAB_USER: "username",
    MONGOLAB_PASSWORD: "password",
    MONGOLAB_DOMAIN: "abcd1234.mongolab.com",
    MONGOLAB_PORT: 12345,

    MONGOLAB_URI: "mongodb://${MONGOLAB_USER}:${MONGOLAB_PASSWORD}@${MONGOLAB_DOMAIN}:${MONGOLAB_PORT}/${MONGOLAB_DATABASE}",

    MONGOLAB_USER_RECURSIVELY: "${MONGOLAB_USER}:${MONGOLAB_PASSWORD}",

    MONGOLAB_URI_RECURSIVELY: "mongodb://${MONGOLAB_USER_RECURSIVELY}@${MONGOLAB_DOMAIN}:${MONGOLAB_PORT}/${MONGOLAB_DATABASE}",

    WITHOUT_CURLY_BRACES_URI: "mongodb://$MONGOLAB_USER:$MONGOLAB_PASSWORD@$MONGOLAB_DOMAIN:$MONGOLAB_PORT/$MONGOLAB_DATABASE",

    WITHOUT_CURLY_BRACES_USER_RECURSIVELY: "$MONGOLAB_USER:$MONGOLAB_PASSWORD",

    WITHOUT_CURLY_BRACES_URI_RECURSIVELY: "mongodb://$MONGOLAB_USER_RECURSIVELY@$MONGOLAB_DOMAIN:$MONGOLAB_PORT/$MONGOLAB_DATABASE"
  }
```

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
