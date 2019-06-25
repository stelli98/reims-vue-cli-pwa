<template>
  <div class="manage-user">
    <div class="header manage-user__header">
      <div
        class="manage-user__close"
        @click="moveTo"
      >
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-cancel" />
        </svg>
      </div>
      <div class="title--menu manage-user__next" />
    </div>
    <div class="manage-user__content">
      <div class="heading manage-user__heading">
        List of User
      </div>
      <div class="manage-user__action">
        <div
          class="manage-user__create"
          @click="routeTo"
        >
          <div class="btn-green">
            <svg class="icon icon-small">
              <use xlink:href="icons.svg#icon-plus" />
            </svg>
            <span>Add User</span>
          </div>
        </div>
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
      <UserList
        v-if="users.length"
        :users="users"
      />
      <Pagination
        :paging="pagination"
        @changePage="changePage"
      />
    </div>
  </div>
</template>

<script src="./js/manage-user.js"></script>

<style lang="scss" >
.manage-user {
  &__content {
    display: flex;
    flex-direction: column;
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
}
</style>
