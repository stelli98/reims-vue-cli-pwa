<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

body {
  font-family: "Nunito Regular", sans-serif;
  font-weight: 400;
  line-height: 1.6;
  // color: $color-black;
  height: 100vh;
  position: relative;
  z-index: 1;
}
</style>
