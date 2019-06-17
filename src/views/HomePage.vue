<template>
  <div class="home">
    <header class="home__header">
      <div class="home__header__upper">
        <div class="home__header__upper__left">
          <img
            src="../assets/images/logo.png"
            class="logo__small"
          />
        </div>
        <div class="home__header__upper__right">
          <div
            class="home__header__nav__user"
            @click="moveTo('user')"
          >
            Manage User
          </div>
          <div
            class="home__header__nav__password"
            @click="moveTo('change')"
          >
            Change Password
          </div>
          <div class="home__header__nav__logout">
            Logout
          </div>
        </div>
      </div>
      <div class="home__header__footer">
        <div class="home__header__footer__container">
          <div class="home__header__footer__heading">
            Make Reimbursement Reporting Become Easier
          </div>
          <div class="home__header__footer__button">
            <input
              id="file"
              type="file"
              name="file"
              @change="onFileChange"
            />
            <label
              for="file"
              class="btn-white"
            >
              Upload Receipt
            </label>
          </div>
        </div>
      </div>
    </header>
    {{isOnline}}
    <TransactionList :transactions="transactions" />
    <Pagination
      :paging="pagination"
      @changePage="changePage"
    />
  </div>
</template>

<script>
import TransactionList from "@/components/TransactionList";
import Pagination from "@/components/Pagination.vue";
import { mapActions, mapState } from "vuex";
import { DetectOnlineMixin } from "@/mixins/DetectOnlineMixin";

export default {
  components: {
    TransactionList,
    Pagination
  },
  created () { 
    this.updateTransaction();
  },
  mixins: [DetectOnlineMixin],
  computed: {
    ...mapState("transaction", ["transactions", "pagination"]),
    options () {
      return {
        page: parseInt(this.$route.query.page) || 1,
        size: parseInt(this.$route.query.size) || 5,
        sort_by: "created_at"
      };
    },
    test(){
      return this.$root.$data.onLine
    }
  },
  methods: {
    ...mapActions("transaction", ["setImage", "getTransactions"]),
    onFileChange (e) {
      const file = URL.createObjectURL(e.target.files[0]);
      this.setImage(file);
      this.$router.push({
        name: "create",
        params: { step: 1 }
      });
    },
    changePage (toPage) {
      this.options.page = parseInt(toPage);
      this.$router.push({ name: "home", query: this.options });
      this.getTransactions(this.options);
    },
    updateTransaction () {
      this.getTransactions(this.options);
      // this.$store.dispatch("transaction/getTransactions");
    },
    moveTo (toPage) {
      this.$router.push({ name: toPage });
    }
  },
  watch: {
    options () {
      this.updateTransaction();
    }
  }
};
</script>

<style lang="scss">
.home__header {
  display: flex;
  background: $color-green-gradient-transparent;
  background-size: cover;
  background-position: center bottom;
  flex-direction: column;
  padding: 1.5rem 1rem;
  height: 45vh;

  @include respond(medium-phone) {
    height: 55vh;
  }

  @include respond(large-phone) {
    height: 65vh;
  }

  @include respond(tab) {
    height: 70vh;
  }
  &__upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__right {
      display: flex;
      color: $color-white;
      font-size: 1rem;
      font-family: "Nunito-Regular";

      @include respond(large-phone) {
        font-size: 1.2rem;
      }

      & > div,
      &:not(:last-child) {
        margin-right: 1rem;

        @include respond(large-phone) {
          margin-right: 1.5rem;
        }
      }

      & > div:hover {
        cursor: pointer;
      }
    }
  }

  &__footer {
    display: flex;
    flex-flow: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    flex-grow: 1;

    @include respond(large-phone) {
      align-items: flex-end;
    }
    &__container {
      @include respond(large-phone) {
        width: 45%;
      }

      @include respond(tab) {
        width: 40%;
      }

      @include respond(desktop) {
        width: 30%;
      }
    }

    &__section > div {
      margin-bottom: 2rem;
    }

    &__heading {
      color: #fff;
      font-size: 1.6rem;
      font-family: "Nunito-Bold";
      margin: 2rem auto;
      width: 70%;
      @include respond(large-phone) {
        width: 100%;
      }

      @include respond(desktop) {
        font-size: 2rem;
      }
    }
  }
}

#file {
  display: none;
}
</style>
