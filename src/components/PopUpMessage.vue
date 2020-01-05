<template>
  <div class="popup">
    <div class="popup__navigation" @click="$emit('onClose')">
      Close
    </div>
  </div>
</template>

<script src="./js/popup-message.js"></script>
<style lang="scss" scoped>
.popup {
  &__body {
    padding-top: 1.25rem;
    padding-left: 1.25rem;
  }

  &__navigation {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  &__navigation {
    display: flex;
    justify-content: space-evenly;
    color: $color-black;
  }

  input {
    border-bottom: $color-black solid 0.1rem;
  }
}
</style>
