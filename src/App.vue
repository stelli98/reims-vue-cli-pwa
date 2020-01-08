<template>
  <div id="app">
    <NotificationContainer></NotificationContainer>
    <router-view />
  </div>
</template>

<script src="./lib/syncTransactions.js" />
<style lang="scss">
#app {
  position: relative;
}
</style>
