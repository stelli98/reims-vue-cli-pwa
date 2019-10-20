<template>
  <div class="create-user">
    <div class="header create-user__header"></div>
    <div class="create-user__content">
      <div class="heading create-user__heading">Create User</div>
      <form class="user-form__form">
        <div class="create-user-family__markdown" @click="toggleExpandPersonalData()">
          <div class="create-user-family__heading" :class="{'active': isExpandedPersonal}">
            <h3>Personal</h3>
            <svg class="icon-small" :class="{'icon-small-green': isExpandedPersonal}">
              <use xlink:href="icons.svg#icon-down" />
            </svg>
          </div>
          <hr />
        </div>
        <div v-if="isExpandedPersonal">
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Username</label>
            <input
              v-model="user.username"
              type="username"
              name="type"
              class="form__input"
              @blur="$v.user.username.$touch()"
            />
            <div v-if="$v.user.username.$error">
              <p
                v-if="!$v.user.username.required"
                class="input__error-message"
              >Username must be filled</p>
            </div>
            <div v-if="$v.user.username.$error">
              <p
                v-if="!$v.user.username.minLength"
                class="input__error-message"
              >Username must have at least 3 characters</p>
            </div>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="date">Date of Birth</label>
            <Datetime
              v-model="formatDate"
              type="datetime"
              class="form__input"
              :max-datetime="currentDateTime"
              @close="$v.user.dateOfBirth.$touch()"
            />
            <div v-if="$v.user.dateOfBirth.$error">
              <p
                v-if="!$v.user.dateOfBirth.required"
                class="input__error-message"
              >Date must be filled</p>
            </div>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Gender</label>
            <select
              v-model="user.gender"
              class="form__input form__input__select"
              @blur="$v.user.gender.$touch()"
            >
              <option
                v-for="gender in genderType"
                :key="gender"
                :value="gender"
                :selected="user.gender"
              >{{ gender | textFormatter }}</option>
            </select>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Division</label>
            <select
              v-model="user.division"
              class="form__input form__input__select"
              @blur="$v.user.division.$touch()"
            >
              <option
                v-for="division in divisionType"
                :key="division"
                :value="division"
                :selected="user.division"
              >{{ division | textFormatter }}</option>
            </select>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Status</label>
            <select
              v-model="user.status"
              class="form__input form__input__select"
              @blur="$v.user.status.$touch()"
            >
              <option
                v-for="status in statusType"
                :key="status"
                :value="status"
                :selected="user.status"
              >{{ status | textFormatter }}</option>
            </select>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Plate Number</label>
            <input
              v-model="user.vehicle.plateNumber"
              type="username"
              name="type"
              class="form__input"
              @blur="$v.user.vehicle.plateNumber.$touch()"
            />
            <div v-if="$v.user.vehicle.plateNumber.$error">
              <p
                v-if="!$v.user.vehicle.plateNumber.required"
                class="input__error-message"
              >Plate Number must be filled</p>
            </div>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Vehicle Type</label>
            <input
              v-model="user.vehicle.type"
              type="username"
              name="type"
              class="form__input"
              @blur="$v.user.vehicle.type.$touch()"
            />
            <div v-if="$v.user.vehicle.type.$error">
              <p
                v-if="!$v.user.vehicle.type.required"
                class="input__error-message"
              >Vehicle Type must be filled</p>
            </div>
          </div>
        </div>
        <div v-show="showFamilyField" class="create-user-family">
          <div class="create-user-family__markdown" @click="toggleExpandFamilyData()">
            <div class="create-user-family__heading" :class="{'active': isExpandedFamily}">
              <h3>User Family</h3>
              <svg class="icon-small" :class="{'icon-small-green': isExpandedFamily}">
                <use xlink:href="icons.svg#icon-down" />
              </svg>
            </div>
            <hr />
          </div>
          <div v-if="isExpandedFamily">
            <h5
              class="create-user-family__action"
              v-if="userFamily.length < 4"
              @click="addFamilyField(childrenData)"
            >Add Family Member</h5>
            <div v-for="(userFamily,index) in userFamily" :key="index">
              <div class="create-create-user__heading">
                <h5></h5>
                <h5
                  class="create-user-family__action"
                  v-if="index > 0"
                  @click="removeFamilyField(index)"
                >Remove this user</h5>
              </div>
              <div class="form__child">
                <label class="input__label title--medium-form" for="type">Name</label>
                <input
                  v-model="userFamily.name"
                  type="name"
                  name="type"
                  class="form__input"
                  @blur="$v.userFamily.$each[index].name.$touch()"
                />
                <div v-if="$v.userFamily.$each[index].name.$error">
                  <p
                    v-if="!$v.userFamily.$each[index].name.required"
                    class="input__error-message"
                  >Name must be filled</p>
                </div>

                <div v-if="$v.userFamily.$each[index].name.$error">
                  <p
                    v-if="!$v.userFamily.$each[index].name.minLength"
                    class="input__error-message"
                  >Name must have at least 3 characters</p>
                </div>
              </div>
              <div class="form__child">
                <label class="input__label title--medium-form" for="date">Date of Birth</label>
                <Datetime
                  v-model="userFamily.dateOfBirth"
                  type="date"
                  class="form__input"
                  :max-datetime="currentDateTime"
                  @close="$v.userFamily.$each[index].dateOfBirth.$touch()"
                />
                <div v-if="$v.userFamily.$each[index].dateOfBirth.$error">
                  <p
                    v-if="!$v.userFamily.$each[index].dateOfBirth.required"
                    class="input__error-message"
                  >Date must be filled</p>
                </div>
              </div>
              <div class="form__child">
                <label class="input__label title--medium-form" for="type">Relationship</label>
                <p>{{userFamily.relationship | textFormatter}}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="bottom-navigation create-user__navigation">
      <div class="title--navigation" @click="moveTo('user-detail')">Cancel</div>
      <div class="title--navigation" @click="sendCreateUserForm">Save</div>
    </div>
  </div>
</template>

<script src="./js/create-user.js"></script>

<style lang="scss">
@import "../../node_modules/vue-datetime/dist/vue-datetime.css";
.create-user {
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

  &-family {
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
  }
}
</style>
