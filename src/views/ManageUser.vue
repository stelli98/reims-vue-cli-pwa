<template>
  <div class="manage-user">
    <div class="manage-user__header">
      <div class="manage-user__close" @click="moveTo">
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-cancel" />
        </svg>
      </div>
      <div class="title--menu manage-user__next" />
    </div>
    <div class="manage-user__content">
      <div class="manage-user__heading">
        List of User
      </div>
      <div class="manage-user__action">
        <div class="manage-user__create" @click="routeTo">
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
      <UserList v-if="users.length" :users="users" />
      <Pagination :paging="pagination" @changePage="changePage" />
    </div>
  </div>
</template>

<script>
import UserList from "@/components/UserList.vue";
import Pagination from "@/components/Pagination.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    UserList,
    Pagination
  },
  data() {
    return {
      isActiveTab: true
    };
  },
  computed: {
    ...mapState("user", ["users", "pagination"]),
    options() {
      return {
        page: parseInt(this.$route.query.page) || 1,
        size: parseInt(this.$route.query.size) || 10,
        sort_by: "created_at",
        search: this.$route.query.search || ""
      };
    }
  },
  methods: {
    ...mapActions("user", ["getUsers"]),
    moveTo() {
      this.$router.go(-1);
    },
    changeTab() {
      this.isActiveTab = !this.isActiveTab;
    },
    routeTo() {
      this.$router.push({ name: "user-create" });
    },
    updateUser() {
      this.getUsers(this.options);
    },
    changePage(toPage) {
      this.options.page = parseInt(toPage);
      this.$router.push({ name: "user", query: this.options });
      this.getUsers(this.options);
    },
    submitSearch(event) {
      this.options.search = event.target.value;
      this.$router.push({ name: "user", query: this.options });
      this.getUsers(this.options);
    }
  },
  watch: {
    options() {
      this.updateUser();
    }
  },
  mounted() {
    this.updateUser();
  }
};
</script>

<style lang="scss" scoped>
.manage-user {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $color-green-gradient;
    height: 5rem;
    padding: 0 1.5rem;
  }

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

  &__heading {
    display: flex;
    font-size: 1.5rem;
    font-family: "Nunito-Bold";
    margin-bottom: 1rem;

    @include respond(tab) {
      font-size: 1.8rem;
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

  // &__tab {
  //   margin-right: 1rem;
  //   font-size: 1.2rem;
  // }

  // &__card {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   grid-column: span 1;
  //   background-color: $color-grey;
  //   -webkit-transition: all 0.2s linear;
  //   transition: all 0.2s linear;

  //   @include respond(tab) {
  //     // margin: 2.5rem 0;
  //   }

  //   &:hover {
  //     transform: scale(1.01);
  //     box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2),
  //       0 1px 15px 0 rgba(0, 0, 0, 0.19);
  //   }

  //   &__center {
  //     flex-grow: 1;
  //     margin-left: 1rem;
  //   }

  //   &__right {
  //     padding: 2rem;
  //   }
  // }
}
.active {
  color: $color-green;
  font-weight: 550;
  border-bottom: solid 0.15rem $color-green;
}
</style>
