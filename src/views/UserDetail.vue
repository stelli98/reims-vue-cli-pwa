<template>
  <div class="user-detail">
    <div class="header user-detail__header"></div>
    <div class="user-detail__content">
      <div class="heading user-detail__heading">User Profile Detail</div>
      <div class="user-detail__tab">
        <h6 class="title--medium user-detail__tab-active">Personal</h6>
        <h6 class="title--medium">Family</h6>
      </div>
    </div>
    <!-- <UserPersonalDetail></UserPersonalDetail> -->
    <UserFamilyDetail></UserFamilyDetail>
  </div>
</template>

<script src="./js/user-detail.js"></script>

<style lang="scss" scoped>
.user-detail {
  position: relative;
  height: 100vh;

  &__content {
    display: flex;
    flex-direction: column;
    width: 90vw;
    margin: 1.5rem 5vw 0;

    @include respond(large-phone) {
      width: 70vw;
      margin: 1.8rem 15vw;
    }

    @include respond(large-phone) {
      width: 50vw;
      margin: 2rem 25vw;
    }
  }

  &__tab {
    margin-bottom: 0.5rem;
    & > h6 {
      margin-right: 1rem;
      display: inline;
    }
  }
}
</style>
