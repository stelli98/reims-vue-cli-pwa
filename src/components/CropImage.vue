<template>
  <div class="crop-image">
    <div class="crop-image__container">
      <Croppa v-model="myCroppa" class="croppa-canvas" auto-sizing :initial-image="image" />
      <div class="crop-image__button">
        <div class="btn-white-circle" @click="flipXImage">
          <div class="circle">
            <svg class="icon icon-small-green">
              <use xlink:href="icons.svg#icon-flip-x" />
            </svg>
          </div>
        </div>
        <div class="btn-white-circle" @click="flipYImage">
          <div class="circle">
            <svg class="icon icon-small-green">
              <use xlink:href="icons.svg#icon-flip-y" />
            </svg>
          </div>
        </div>
        <div class="btn-white-circle" @click="rotateRight">
          <div class="circle">
            <svg class="icon icon-small-green">
              <use xlink:href="icons.svg#icon-circular-clockwise" />
            </svg>
          </div>
        </div>
        <div class="btn-white-circle" @click="rotateLeft">
          <div class="circle">
            <svg class="icon icon-small-green">
              <use xlink:href="icons.svg#icon-circular-counter-clockwise" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-navigation crop-image__navigation">
      <h3 class="title--navigation" @click="moveTo('home')">Cancel</h3>
      <h3 class="title--navigation" @click="moveToFilterImage">Next</h3>
    </div>
  </div>
</template>

<script src="./js/crop-image.js"></script>

<style lang="scss">
.circle {
  border: solid 1px green;
  padding: 1.2rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: green;

    .icon-small-green {
      fill: $color-white;
    }
  }
}

.croppa-container.croppa-canvas {
  width: 80vw;
  height: 55vh;

  @include respond(small-phone) {
    width: 70vw;
    height: 55vh;
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

  &__container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-content: center;
    margin: 1.5rem;
  }

  &__button {
    display: flex;
    margin-top: 3rem;
    justify-content: space-around;
    & > div {
      display: flex;
      align-items: center;
      flex-flow: column;
    }
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1.4rem;
  }
}
</style>
