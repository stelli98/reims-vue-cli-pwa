<template>
  <div class="user-family">
    <div class="user-family__detail" v-for="(user,index) in userData" :key="index" >
      <div class="user-family__markdown" @click="expandFamilyData(index)">
        <div class="user-family__heading" :class="{'active': user.expanding}">
          <h4>{{user.relationshipStatus}}</h4>
          <svg class="icon-small" :class="{'icon-small-green': user.expanding}">
            <use xlink:href="icons.svg#icon-down" />
          </svg>
        </div>
        <hr />
      </div>
      <transition v-if="user.expanding" name="fade">
      <div class="user-family__data">
        <div class="user-family__box">
          <p class="title--big">Name</p>
          <span>{{user.name}}</span>
        </div>
        <div class="user-family__box">
          <p class="title--big">{{user.detail}}</p>
          <span>{{user.marriedDate || user.bornDate}}</span>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script src="./js/user-family-detail.js"> </script>

<style lang="scss" scoped>
.user-family {
  &__detail {
    margin: 0 1.5rem;
  }

  .active {
    color: $color-green;
  }

  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 0.5rem;
  }

  &__box {
    padding: 0 1rem;
    p {
      margin-top: 0.5rem;
      font-size: 1rem;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>