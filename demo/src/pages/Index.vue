<template>
  <q-page class="flex flex-center">
    <div class="col-lg-3 col-sm-6 col-sm-10 col-xs-12">
      <div>Open the browser Dev Tools, then find "QEnv Test" and expand it</div>
      <div>You should find something similar to (depending on which QEnv was run):</div>
      <div>
        <pre>
jeff:
  ENV_DEV: "Development"
  ENV_TYPE: "Running Development"
  MY_PORT: 4000
        </pre>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',

  mounted () {
    /* eslint-disable no-console */
    console.log('QEnv Test', process.env)
  }
}
</script>
