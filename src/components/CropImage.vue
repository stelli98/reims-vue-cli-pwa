<template>
  <div class="crop-image">
    <div class="crop-image__container">
      <Croppa
        v-model="myCroppa"
        class="croppa-canvas"
        auto-sizing
        :initial-image="transaction.image"
      />
    </div>
    <div class="crop-image__button">
      <div class="btn-green" @click="flipXImage">
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-flip-x" />
        </svg>
        <span>Flip Horizontally</span>
      </div>
      <div class="btn-green" @click="flipYImage">
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-flip-y" />
        </svg>
        <span>Flip Vertically</span>
      </div>
      <div class="btn-green" @click="rotateRight">
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-circular-clockwise" />
        </svg>
        <span>Rotate Right</span>
      </div>
      <div class="btn-green" @click="rotateLeft">
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-circular-counter-clockwise" />
        </svg>
        <span>Rotate Left</span>
      </div>
    </div>
  </div>
</template>

<script src="./js/crop-image.js"></script>

<style lang="scss">
.croppa-container.croppa-canvas {
  width: 80vw;
  height: 55vh;

  @include respond(small-phone) {
    width: 65vw;
    height: 57vh;
  }

  @include respond(medium-phone) {
    width: 28rem;
    height: 38rem;
  }
}

.crop-image {
  display: flex;
  flex-flow: column;
  align-items: center;

  & > div {
    display: flex;
    flex-flow: column;
    margin: 1.5rem 0;

    @include respond(medium-phone) {
      display: flex;
      flex-flow: row;
      & > div {
        margin-right: 0.8rem;
      }
    }
  }

  &__container {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-bottom: 1.5rem;
  }

  &__button {
    margin-bottom: 1.5rem;
    & > div {
      margin-bottom: 1rem;
    }
  }
}
</style>
