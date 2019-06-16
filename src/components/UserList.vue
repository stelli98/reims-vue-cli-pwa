<template>
  <div class="user__list">
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
export default {
  components: {
    UserCard
  },
  props: {
    users: Array
  }
};
</script>

<style lang="scss" scoped>
.user {
  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
    row-gap: 1.2rem;
    margin: 2rem 0;
  }
}
</style>
