<template>
  <div class="crop-image">
    <div class="crop-image__container">
      <Croppa
        v-model="myCroppa"
        class="croppa-canvas"
        auto-sizing
        :initial-image="image"
      />
    </div>
    <div class="crop-image__button">
      <div class="btn-white-circle" @click="flipXImage">
        <div class="circle">
          <svg class="icon icon-small-green">
          <use xlink:href="icons.svg#icon-flip-x" />
        </svg>
        </div>
        <span>Flip Horizontally</span>
      </div>
      <div class="btn-white-circle" @click="flipYImage">
        <div class="circle">
        <svg class="icon icon-small-green">
          <use xlink:href="icons.svg#icon-flip-y" />
        </svg>
        </div>
        <span>Flip Vertically</span>
      </div>
      <div class="btn-white-circle" @click="rotateRight">
        <div class="circle">
        <svg class="icon icon-small-green">
          <use xlink:href="icons.svg#icon-circular-clockwise" />
        </svg>
        </div>
        <span>Rotate Right</span>
      </div>
      <div class="btn-white-circle" @click="rotateLeft">
        <div class="circle">
          <svg class="icon icon-small-green">
          <use xlink:href="icons.svg#icon-circular-counter-clockwise" />
        </svg>
        </div>
        <span>Rotate Left</span>
      </div>
    </div>
    <div class="bottom-navigation crop-image__navigation" @click="moveTo" >
        <h3 class="title--navigation">Next</h3>
        <svg class="icon icon-medium-green">
          <use xlink:href="icons.svg#icon-next" />
        </svg>
    </div>
  </div>
</template>

<script src="./js/crop-image.js"></script>

<style lang="scss">
.circle {
  border: solid 1px green;
  padding: 1.2rem;
  border-radius: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
    background-color: green;

    .icon-small-green{
      fill: $color-white;
    }

  }

}

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

.crop-image{
  display: flex;
  flex-flow: column;
  align-items: center;

  &__container,
  &__button{
    display: flex;
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
    & > div {
      display: flex;
      align-items: center;
      flex-flow: column;
      margin-left: 1rem;
    }
  }

  &__navigation{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
  }
}
</style>
