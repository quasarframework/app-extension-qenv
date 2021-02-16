/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */
const fs = require('fs')
const semver = require('semver')

// code used from // https://github.com/motdotla/dotenv-expand
const expandVariables = function (config) {
  // if ignoring process.env, use a blank object
  const environment = config.ignoreProcessEnv ? {} : process.env

  const interpolate = function (envValue) {
    const matches = String(envValue).match(/(.?\${?(?:[a-zA-Z0-9_]+)?}?)/g) || []

    return matches.reduce(function (newEnv, match) {
      const parts = /(.?)\${?([a-zA-Z0-9_]+)?}?/g.exec(match)
      const prefix = parts[1]

      let value, replacePart

      if (prefix === '\\') {
        replacePart = parts[0]
        value = replacePart.replace('\\$', '$')
      } else {
        const key = parts[2]
        replacePart = parts[0].substring(prefix.length)
        // process.env value 'wins' over .env file's value
        value = environment.hasOwnProperty(key) ? environment[key] : (config.parsed[key] || '')

        // Resolve recursive interpolations
        value = interpolate(value)
      }

      return newEnv.replace(replacePart, value)
    }, envValue)
  }

  for (const configKey in config.parsed) {
    const value = environment.hasOwnProperty(configKey) ? environment[configKey] : config.parsed[configKey]

    config.parsed[configKey] = interpolate(value)
  }

  for (const processKey in config.parsed) {
    environment[processKey] = config.parsed[processKey]
  }

  return config
}

const extendConfig = function (api, conf) {
  const qEnvName = process.env.QENV

  // see if QENV is set
  if (!qEnvName) {
    console.error(`! App Extension (qenv): missing QENV environment variable; skipping`)
    return
  }

  // split names into array
  const names = qEnvName.split('+')

  let envName = '.quasar.env.json'

  // resolve the path to the file
  const envPath = api.resolve.app(envName)

  // check file exists
  if (!fs.existsSync(envPath)) {
    console.error(`! App Extension (qenv): '${envPath}' file missing; skipping`)
    return
  }

  const version = api.getPackageVersion('@quasar/app')
  const v1 = semver.lt(version, '2.0.0')

  let envData
  try {
    envData = require(envPath)
  } catch (e) {
    console.error(`! App Extension (qenv): Error '${JSON.stringify(e)}'`)
    return
  }

  let data = {}

  names.forEach((name) => {
    if (name in envData) {
      data = Object.assign(data, envData[name])
    }
    else {
      console.error(`! App Extension (qenv): Missing '${name}' from ${envName}; skipping`)
    }
  })

  const results = {}
  results.parsed = data

  data = expandVariables(results).parsed

  // for brevity
  let target = conf.build.env

  // check for common root object
  if (api.prompts.common_root_object && api.prompts.common_root_object !== 'none') {
    let rootObject = api.prompts.common_root_object

    if (!target[rootObject]) {
      target[rootObject] = {}
      target = target[rootObject]
    }
  }

  for (const key in data) {
    target[key] = v1 === true ? JSON.stringify(data[key]) : data[key]
  }
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  // api.compatibleWith('quasar', '^1.1.1')
  api.compatibleWith('@quasar/app', '^1.1.0 || ^2.0.0 || ^3.0.0-beta.1')


  // We extend /quasar.conf.js
  api.extendQuasarConf((conf) => {
    extendConfig(api, conf)
  })
}
