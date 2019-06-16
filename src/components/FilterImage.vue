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

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  props: {
    pictureUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      filterFunctions: null,
      width: 0,
      height: 0
    };
  },
  computed: {
    filters() {
      return this.makeFilter();
    }
  },
  created() {
    if (!this.pictureUrl) {
      this.$router.push({ name: "create", params: { step: 1 } });
    }
    this.filterFunctions = this.defaultValues();
  },
  methods: {
    ...mapActions("transaction", ["createTransaction"]),
    makeFilter(filterSet) {
      if (!filterSet) {
        filterSet = this.filterFunctions;
      }

      let filterString = "";
      const defaultValues = this.defaultValues();
      for (const filterFunc in filterSet) {
        if (filterSet[filterFunc] !== defaultValues[filterFunc]) {
          filterString =
            filterString + filterFunc + "(" + filterSet[filterFunc] + ") ";
        }
      }
      return { filter: filterString };
    },
    setToDefault() {
      this.filterFunctions = this.defaultValues();
    },
    defaultValues() {
      return {
        grayscale: 1,
        brightness: 1.1,
        contrast: 1
      };
    },
    changeImage() {
      this.$store.dispatch("setImage", "").then(() => {
        this.$router.push({ name: "crop-image" });
      });
    },
    fillForm() {
      this.$router.push({
        name: "add"
      });
    },
    generateImage() {
      const canvas = document.createElement("canvas");
      canvas.width = document.getElementById("image").clientWidth;
      canvas.height = document.getElementById("image").clientHeight;

      const ctx = canvas.getContext("2d");
      ctx.filter = this.filters.filter;
      const img = new Image();
      img.src = document.getElementById("image").src;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const resultImage = canvas.toDataURL();
      this.uploadImageOCR(resultImage);
      return resultImage;
    },
    uploadImageOCR(resultImage) {
      this.createTransaction(resultImage);
    }
  }
};
</script>

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
