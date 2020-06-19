<template>
  <q-page class="flex flex-center">
    <div class="col-lg-3 col-sm-6 col-sm-10 col-xs-12">
      <div>Open the browser Dev Tools</div>
      <div>Using common root object "test"</div>
      <div>You should find something similar to (depending on which QEnv environment was run):</div>
      <div>
        <pre>
test: {
  "ENV_TYPE": "Running Development",
  "ENV_DEV": "Development",
  "MY_PORT": 4000
}
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
    console.log('test:', JSON.stringify(process.env.test, null, 2))
  }
}
</script>
