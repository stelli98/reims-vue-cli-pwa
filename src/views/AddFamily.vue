<template>
  <div class="add-family">
    <div class="header add-family__header"></div>
    <div class="add-family__content">
      <div class="heading add-family__heading">Add Family</div>
      <form class="user-form__form">
        <div class="add-family">
          <h5
            class="add-family__action"
            v-if="family.length < maxFamilyField"
            @click="addFamilyField()"
          >Add Family Member</h5>
          <div v-for="(family,index) in family" :key="index">
            <div class="create-add-family__heading">
              <h5></h5>
              <h5
                class="add-family__action"
                v-if="index > 0"
                @click="removeFamilyField(index)"
              >Remove this user</h5>
            </div>
            <div class="form__child">
              <label class="input__label title--medium-form" for="type">Name</label>
              <input
                v-model="family.name"
                type="name"
                name="type"
                class="form__input"
                @blur="$v.family.$each[index].name.$touch()"
              />
              <div v-if="$v.family.$each[index].name.$error">
                <p
                  v-if="!$v.family.$each[index].name.required"
                  class="input__error-message"
                >Name must be filled</p>
              </div>

              <div v-if="$v.family.$each[index].name.$error">
                <p
                  v-if="!$v.family.$each[index].name.minLength"
                  class="input__error-message"
                >Name must have at least 3 characters</p>
              </div>
            </div>
            <div class="form__child">
              <label class="input__label title--medium-form" for="date">Date of Birth</label>
              <Datetime
                v-model="family.dateOfBirth"
                type="date"
                class="form__input"
                :max-datetime="currentDateTime"
                @close="$v.family.$each[index].dateOfBirth.$touch()"
              />
              <div v-if="$v.family.$each[index].dateOfBirth.$error">
                <p
                  v-if="!$v.family.$each[index].dateOfBirth.required"
                  class="input__error-message"
                >Date must be filled</p>
              </div>
            </div>
            <div class="form__child">
              <label class="input__label title--medium-form" for="type">Relationship</label>
              <p>{{family.relationship | textFormatter}}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="bottom-navigation add-family__navigation">
      <div class="title--navigation" @click="moveTo('user-detail')">Cancel</div>
      <div class="title--navigation" @click="sendCreateUserForm">Save</div>
    </div>
  </div>
</template>

<script src="./js/add-family.js"></script>

<style lang="scss">
@import "../../node_modules/vue-datetime/dist/vue-datetime.css";
.add-family {
  &__content {
    width: 65vw;
    min-height: 78vh;
    margin: 0 auto;
    @include respond(large-phone) {
      width: 40vw;
    }

    & > div {
      margin: 2rem 0;
    }
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: center;

    @include respond(large-phone) {
      justify-content: space-evenly;
    }
  }

  .active {
    color: $color-green;
  }

  //   &-family {
  &__action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: $color-green;
    font-weight: 400;
    margin: 1rem 0 0.5rem 0;
    &:hover {
      cursor: pointer;
    }
  }
  &__markdown {
    margin-bottom: 1rem;
  }

  &__line {
    margin-bottom: 1rem;
  }

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  //   }
}
</style>
