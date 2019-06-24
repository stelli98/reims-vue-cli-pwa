<template>
  <div class="filter-image">
    <div v-show="pictureUrl" class="filter-image__image">
      <img
        id="image"
        crossorigin="Anonymous"
        :src="pictureUrl"
        :style="filters"
      />
    </div>

    <div class="filter-image__option">
      <div>
        <label class="filter-image__label">
          Grayscale ({{ filterFunctions.grayscale }})
        </label>
        <input
          v-model="filterFunctions.grayscale"
          type="range"
          class="form-control"
          step="0.1"
          min="0"
          max="1"
          :disabled="!pictureUrl"
        />
      </div>
      <div>
        <label class="filter-image__label">
          Brightness ({{ filterFunctions.brightness }})
        </label>
        <input
          v-model="filterFunctions.brightness"
          type="range"
          class="form-control"
          step="0.01"
          min="0"
          max="5"
          :disabled="!pictureUrl"
        />
      </div>
      <div>
        <label class="filter-image__label">
          Contrast ({{ filterFunctions.contrast }})
        </label>
        <input
          v-model="filterFunctions.contrast"
          type="range"
          class="form-control"
          step="0.01"
          min="0"
          max="10"
          :disabled="!pictureUrl"
        />
      </div>
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

  & > div {
    margin: 1.2rem 0;
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      width: 80vw;

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
    justify-content: center;
    align-items: center;

    & > div {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
