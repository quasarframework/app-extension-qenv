/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const fs = require('fs')

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

  let envData
  try {
    envData = require(envPath)
  }
  catch(e) {
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

  // make sure there is a build.env object
  if (!conf.build.env) {
    conf.build.env = {}
  }

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
    target[key] = JSON.stringify(data[key])
  }
}

module.exports = function (api, ctx) {
  api.extendQuasarConf((conf) => {
    extendConfig(api, conf)
  })
}
