<template>
  <div class="FAB">
    <div class="FAB__mini-action-button" v-if="displayMenu">
      <div class="mini-action-button mini-action-button">
        <p class="mini-action-button__text">Medical</p>
        <input type="file" id="medical" @change="onNonOCRFileChange" multiple />
        <label for="medical" class="mini-action-button__icon">
          <svg class="icon icon-medium">
            <use xlink:href="icons.svg#icon-medical" />
          </svg>
        </label>
      </div>
      <div class="mini-action-button mini-action-button">
        <p class="mini-action-button__text">Parking</p>
        <input type="file" id="fuel-parking" @change="onOCRFileChange($event,'parking')" />
        <label for="fuel-parking" class="mini-action-button__icon">
          <svg class="icon icon-medium">
            <use xlink:href="icons.svg#icon-parking" />
          </svg>
        </label>
      </div>
      <div class="mini-action-button mini-action-button">
        <p class="mini-action-button__text">Fuel</p>
        <input type="file" id="fuel-parking" @change="onOCRFileChange($event,'fuel')" />
        <label for="fuel-parking" class="mini-action-button__icon">
          <svg class="icon icon-medium">
            <use xlink:href="icons.svg#icon-fuel" />
          </svg>
        </label>
      </div>
    </div>
    <div class="FAB__action-button" @click="toggleDisplayMenu" v-if="!displayMenu">
      <div class="action-button__icon">
        <svg class="icon icon-medium">
          <use v-bind="{
              'xlink:href': `icons.svg#icon-plus`
            }" />
        </svg>
      </div>
    </div>
    <div class="FAB__action-button" @click="toggleDisplayMenu" v-if="displayMenu">
      <div class="action-button__icon">
        <svg class="icon icon-medium">
          <use v-bind="{
              'xlink:href': `icons.svg#icon-cancel`
            }" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script src="./js/floating-action-button.js"></script>

<style lang="scss" scoped>
@mixin circleShadow($vertical) {
  box-shadow: 0 0 $vertical rgba(0, 0, 0, 0.14),
    0 $vertical $vertical * 2 rgba(0, 0, 0, 0.28);
}

.FAB {
  &__action-button,
  &__mini-action-button {
    cursor: pointer;
    position: absolute;
    margin-right: 1.2rem;
  }

  &__action-button {
    bottom: 0;
    right: 0;

    &:hover {
      .action-button__icon {
        @include circleShadow(8px);
      }
    }
  }

  &__mini-action-button {
    bottom: 6.5rem;
    right: 1rem;

    & > div {
      margin-bottom: 1.5vh;
    }
  }
}

.action-button {
  &__icon {
    @include circleShadow(4px);
    background-color: $color-green;
    border-radius: 50%;
    color: #fff;
    padding: 2rem;
    width: 6rem;
    height: 6rem;
  }

  &__text {
    &--hide {
      display: none;
    }

    &--show {
      background-color: #212121;
      border-radius: 3px;
      color: #fff;
      right: 75px;
      font-size: 14px;
      font-family: "Helvetica Neue";
      opacity: 0.8;
      padding: 5px 9px;
      position: absolute;
      top: 2px;
      white-space: nowrap;
    }
  }
}

.mini-action-button {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &__icon {
    @include circleShadow(0.5rem);
    background-color: $color-green;
    border-radius: 50%;
    color: #fff;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;

    &:hover {
      @include circleShadow(1rem);
    }
  }

  &__text {
    background-color: $color-black;
    border-radius: 3px;
    padding: 0.5rem;
    color: #fff;
    display: block;
    font-size: 1.2rem;
    margin-right: 1rem;
    opacity: 0.8;
    white-space: nowrap;
  }

  &--show {
    position: absolute;
    text-align: center;
  }
}

#fuel-parking,
#medical   {
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: none;
}
</style>
