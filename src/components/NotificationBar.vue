<template>
  <div
    transition="fade"
    enter-stagger="50"
    leave-stagger="0"
    class="notification-bar"
    :class="notificationTypeClass"
  >
    <p>{{ notification.message }}</p>
  </div>
</template>

<script src ="./js/notification-bar.js"></script>

<style lang="scss">
.notification-bar {
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  color: white;
}

.-text-error {
  background-color: #d91414;
}

.-text-success {
  background-color: #008954;
}
</style>
