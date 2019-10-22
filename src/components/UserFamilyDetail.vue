<template>
  <div class="user-family">
    <div class="user-family__content">
      <div class="user-family__detail" v-for="(user, index) in userFamily" :key="index">
        <div class="user-family__markdown" @click="toggleExpandFamilyData(index)">
          <div class="user-family__heading" :class="{'active': isExpandedGroup(index)}">
            <h4>{{user.relationship | textFormatter }}</h4>
            <svg class="icon-small" :class="{'icon-small-green': user.expanding}">
              <use xlink:href="icons.svg#icon-down" />
            </svg>
          </div>
          <hr />
        </div>
        <transition v-if="isExpandedGroup(index)" name="fade">
          <div class="user-family__data">
            <div class="user-family__box">
              <p class="title--big">Name</p>
              <span>{{user.name}}</span>
            </div>
            <div class="user-family__box">
              <p class="title--big">Date of Birth</p>
              <span>{{user.marriedDate || user.dateOfBirth}}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="bottom-navigation user-family__navigation">
      <div
        class="title--navigation"
        :class="{'disabled' : userFamily.length == 4 }"
        @click.stop="userFamily.length == 4 ? null: moveTo('add-family')"
      >Add Family</div>
      <div class="title--navigation" @click="moveTo('edit-family-profile')">Edit Family</div>
    </div>
  </div>
</template>

<script src="./js/user-family-detail.js"></script>

<style lang="scss" scoped>
.user-family {
  &__content {
    min-height: 65vh;
  }

  &__detail {
    margin: 1rem 1.5rem;
    @include respond(large-phone) {
      width: 50vw;
      margin: 2rem 25vw;
    }
  }

  .active {
    color: $color-green;
  }

  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }

  &__box {
    padding: 0 1rem;
    p {
      margin-top: 0.5rem;
      font-size: 1rem;
    }
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include respond(large-phone) {
      justify-content: space-evenly;
    }
  }
}

.disabled {
  color: $color-dark-grey;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>