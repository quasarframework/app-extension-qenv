<template>
  <q-page class="flex flex-center">
    <div class="col-lg-3 col-sm-6 col-sm-10 col-xs-12">
      <div>Open the browser Dev Tools</div>
      <div>Using common root object "test"</div>
      <div>You should find something similar to (depending on which QEnv environment was run):</div>
      <div>
        <pre>
test: {{ JSON.stringify(data, null, 2)}}
        </pre>
      </div>
      <div>SHELL is coming from an environmental variable inside the .env file</div>
      <div>SHELL=${SHELL}</div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      data: {
        ENV_TYPE: process.env.test.ENV_TYPE,
        ENV_DEV: process.env.test.ENV_DEV,
        MY_PORT: process.env.test.MY_PORT,
        SHELL: process.env.test.SHELL
      }
    }
  },

  mounted () {
    /* eslint-disable no-console */
    console.log('test:', JSON.stringify(process.env.test, null, 2))
  }
}
</script>
