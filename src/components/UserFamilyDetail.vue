<template>
  <div class="user-family">
    <div class="user-family__content">
      <div class="user-family__detail" v-for="(user, index) in userFamilies" :key="index">
        <div class="user-family__markdown" @click="toggleExpandFamilyData(index)">
          <div class="user-family__heading" :class="{'icon-small-green': user.expanding}">
            <h4  :class="{'active-selected': isExpandedGroup(index)}">{{user.relationship | textFormatter }}</h4>
            <svg class="icon-small" :class="{'icon-small-green': isExpandedGroup(index)}" >
              <use  v-bind="{
              'xlink:href': `icons.svg#icon-${iconClass(index)}`}"/>
            </svg>
          </div>
          <hr />
        </div>
        <transition v-if="isExpandedGroup(index)" name="fade">
          <div class="user-family__data">
            <div class="user-family__container">
              <div class="user-family__box">
                <p class="title--big">Name</p>
                <span>{{user.name}}</span>
              </div>
              <div class="user-family__box">
                <p class="title--big">Date of Birth</p>
                <span>{{user.marriedDate || user.dateOfBirth}}</span>
              </div>
            </div>
            <div class="user-family__action">
              <h4 class="user-family__edit" @click="moveTo('edit-family-profile', user.id)">Edit</h4>
              <h4 class="user-family__remove" @click="removeUserFamily(user.id)">Remove</h4>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="bottom-navigation user-family__navigation">
      <div class="title--navigation" @click="moveTo('user')">Cancel</div>
      <div
        class="title--navigation"
        :class="{'disabled' : userFamilies.length == 4 }"
        @click.stop="addNewUserFamily"
      >Add Family</div>
    </div>
  </div>
</template>

<script src="./js/user-family-detail.js"></script>

<style lang="scss" scoped>
.user-family {
  &__content {
    min-height: 66vh;
  }

  &__detail {
    margin: 1rem 1.5rem;
    @include respond(large-phone) {
      width: 50vw;
      margin: 2rem 25vw;
    }
  }

  .active-selected{
    color: $color-green;
  }

  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }

  &__data,
  &__action {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    justify-content: space-evenly;
  }

  &__edit,
  &__remove {
    margin-right: 1rem;
    color: $color-green;
    margin-top: 0.5rem;
    font-family: "Nunito-Semibold";
    &:hover {
      cursor: pointer;
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