<template>
  <PopUpModal :isOpen="!!component" :title="title" @onClose="handleModalClose" :content="content" :type="type">
    <component :is="component" @onClose="handleClose" v-bind="props"/>
  </PopUpModal>
</template>

<script src="./js/pop-up-modal-root.js"></script>
