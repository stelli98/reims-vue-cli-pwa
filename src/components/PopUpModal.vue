<template>
  <transition name="fade">
    <div
      class="modal-backdrop"
      v-show="isOpen"
      :class="{ open: isOpen }"
      @click="$emit('onClose')"
    >
      <div class="modal-dialog" :class="{ open: isOpen }" @click.stop>
        <div class="modal-title" v-if="title">{{ title }}</div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./js/pop-up-modal.js"></script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter .modal-dialog,
.fade-leave-to .modal-dialog {
  transform: translateY(-20%);
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  width: 30rem;
  background: rgb(255, 255, 255);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.3rem;
  transition: 0.5s;
  position: relative;
}

.modal-title {
  background-color: $color-green;
  color: $color-white;
  padding: 1.2rem;
  font-size: 1.25rem;
}
</style>
