<template>
<div>
<div class="transaction-form">
    <div v-show="image" class="transaction-form__image">
      <img crossorigin="Anonymous" :src="image" />
    </div>

    <div class="transaction-form__menu">
      <div class="title--big" :class="{ active: !isSwitchOn }" :disabled="true">
        Fuel
      </div>
      <div>
        <div class="switch-button-control">
          <div
            class="switch-button"
            :class="{ enabled: isSwitchOn }"
            @click="toggle"
          >
            <div class="button" />
          </div>
        </div>
      </div>
      <div class="title--big" :class="{ active: isSwitchOn }">
        Parking
      </div>
    </div>

    <Component :is="currentComponent" ref="sendForm" />
    
  </div>
  
    <div class="bottom-navigation filter-image__navigation">
      <div >
          <svg class="icon icon-medium-green">
            <use xlink:href="icons.svg#icon-circular-clockwise" />
          </svg>
          <h3 class="title--navigation">Re-Upload</h3>
      </div>
      <div>
          <h3 class="title--navigation">Save</h3>
          <svg class="icon icon-medium-green">
            <use xlink:href="icons.svg#icon-save" />
          </svg>
      </div>
    </div>
  </div>
</div>
  
</template>

<script src="./js/transaction-form.js"></script>

<style lang="scss">
.transaction-form {
  width: 60vw;
  margin: 0 auto;

  @include respond(large-phone) {
    width: 40vw;
  }

  & > div {
    margin: 2rem 0;
  }

  &__fuel,
  &__parking {
    margin: 2rem 0;
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

  &__menu {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.5rem 0;

    & > div {
      margin: 0 0.5rem;
    }
  }
}

.active {
  color: $color-green;
}

.switch-button-control {
  display: flex;
  flex-direction: row;
  align-items: center;

  .switch-button {
    $switch-button-height: 3.55rem;
    $switch-button-color: linear-gradient(
      to right,
      rgba(145, 214, 147, 1),
      rgba(56, 144, 148, 1)
    );
    $switch-button-border-thickness: 0.2rem;
    $switch-transition: all 0.2s ease-in-out;
    $switch-is-rounded: true;

    height: 4rem;
    width: 12rem;
    border: $switch-button-border-thickness solid $color-dark-grey;
    box-shadow: inset 0px 0px $switch-button-border-thickness 0px
      rgba(0, 0, 0, 0.33);
    border-radius: if($switch-is-rounded, 4rem, 0);
    transition: $switch-transition;
    cursor: pointer;

    .button {
      height: 3.55rem;
      width: 3.55rem;
      border-radius: 4rem;
      background: $switch-button-color;
      transition: $switch-transition;
    }

    &.enabled {
      background: $switch-button-color;
      box-shadow: none;

      .button {
        background: white;
        transform: translateX(8.1rem);
      }
    }
  }

  .switch-button-label {
    margin-left: 10px;
  }
}
</style>
