<template>
  <div class="user__list">
    <div  v-for="(user, index) in users">
      <UserCard
      :key="user.id"
      :user="user"
      :index="index"
    />
    </div>
  </div>
</template>

<script src="./js/user-list.js"></script>

<style lang="scss">
.user {
  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
    row-gap: 1.2rem;
    margin: 1rem 0;
  }
}
</style>
