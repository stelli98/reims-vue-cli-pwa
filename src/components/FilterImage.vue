<template>
  <div class="filter-image">
    <div v-show="image" class="filter-image__image">
      <img id="image" crossorigin="Anonymous" :src="image" :style="filters" />
    </div>
    <div class="filter-image__option">
      <div>
        <label class="filter-image__label"
          >Grayscale ({{ filterFunctions.grayscale }})</label
        >
        <input
          v-model="filterFunctions.grayscale"
          type="range"
          class="form-control"
          step="0.1"
          min="0"
          max="1"
          :disabled="!image"
        />
      </div>
      <div>
        <label class="filter-image__label"
          >Brightness ({{ filterFunctions.brightness }})</label
        >
        <input
          v-model="filterFunctions.brightness"
          type="range"
          class="form-control"
          step="0.01"
          min="0"
          max="5"
          :disabled="!image"
        />
      </div>
      <div>
        <label class="filter-image__label"
          >Contrast ({{ filterFunctions.contrast }})</label
        >
        <input
          v-model="filterFunctions.contrast"
          type="range"
          class="form-control"
          step="0.01"
          min="0"
          max="10"
          :disabled="!image"
        />
      </div>
    </div>
    <div class="bottom-navigation filter-image__navigation">
      <h3 class="title--navigation" @click="setFilterToDefault">Reset</h3>
      <h3 class="title--navigation" @click="filterImage">Next</h3>
    </div>
  </div>
</template>

<script src="./js/filter-image.js"></script>

<style lang="scss">
.filter-image {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.2rem 0;

    & img {
      width: 80vw;
      height: 55vh;

      @include respond(medium-phone) {
        width: 25rem;
      }
    }
  }

  &__label {
    margin-right: 2rem;
  }

  &__option {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    min-height: 30vh;

    & > div > label {
      display: block;
    }
  }

  &__navigation,
  &__navigation > div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
