<template>
  <div class="manage-user">
    <div class="header manage-user__header">
      <div class="title--menu manage-user__title"></div>
      <div class="title--menu manage-user__title" @click="doLogout">Logout</div>
    </div>
    <div class="manage-user__content">
      <div class="heading manage-user__heading">List of User</div>
      <div class="manage-user__action">
        <div class="manage-user__search">
          <svg class="icon-green">
            <use xlink:href="icons.svg#icon-search" />
          </svg>
          <input
            type="text"
            placeholder="search by name"
            @keyup="submitSearch"
          />
        </div>
      </div>
      <UserList v-if="users.length" :users="users" @deleteUser="updateUser" />
      <Pagination
        :paging="pagination"
        @changePage="changePage"
        class="manage-user__pagination"
      />
    </div>
    <div class="bottom-navigation manage-user__navigation">
      <div
        class="title--navigation"
        @click="moveToWithQuery('change-password', { role: 'admin' })"
      >
        Change Password
      </div>
      <div class="title--navigation" @click="moveTo('user-create')">
        Add User
      </div>
    </div>
  </div>
</template>

<script src="./js/manage-user.js"></script>

<style lang="scss" scoped>
.manage-user {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    flex: 1;
    width: 90vw;
    margin: 1.5rem 5vw;

    @include respond(large-phone) {
      width: 70vw;
      margin: 1.8rem 15vw;
    }

    @include respond(large-phone) {
      width: 50vw;
      margin: 2rem 25vw;
    }
  }

  &__action {
    display: flex;
    justify-content: space-between;
  }

  &__filter {
    display: flex;
    align-items: center;
    & > div {
      margin-right: 0.8rem;
    }
  }

  &__search {
    display: flex;
    align-items: center;
    width: 50%;
    border-bottom: solid 0.1rem $color-green;

    & input {
      width: 100%;
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
