<template>
  <form @submit.prevent="handleSubmit">
    <base-dialog>
      <template v-slot:header>Регистрация</template>
      <template v-slot:body>
        <div class="h-[400px] overflow-y-scroll pr-5">
          <div class="mb-5">
            <label for="email">Имейл Адрес *</label>
            <input type="email" v-model="user.item.email" class="base-input">
          </div>
          <div class="mb-5">
            <label for="username">Потребителско Име *</label>
            <input type="text" v-model="user.item.username" class="base-input">
          </div>
          <div class="mb-5">
            <label for="password">Парола *</label>
            <input type="password" v-model="user.item.password" class="base-input">
          </div>
          <div class="mb-5">
            <label for="cpassword">Повторете Парола *</label>
            <input type="password" v-model="user.item.cpassword" class="base-input">
          </div>
          <div>
            <p>Пол *</p>
            <div class="flex gap-5">
              <div class="mb-5 flex items-center gap-2">
                <label for="gender_male">Мъж</label>
                <input type="radio" v-model="user.item.gender" value="male" id="gender_male">
              </div>
              <div class="mb-5 flex items-center gap-2">
                <label for="gender_female">Жена</label>
                <input type="radio" v-model="user.item.gender" value="female" id="gender_female">
              </div>
              <div class="mb-5 flex items-center gap-2">
                <label for="gender_other">Друг</label>
                <input type="radio" v-model="user.item.gender" value="other" id="gender_other">
              </div>
            </div>
          </div>
          <div class="mb-5">
            <label for="first_name">Първо Име</label>
            <input type="text" v-model="user.item.options.first_name" class="base-input">
          </div>
          <div class="mb-5">
            <label for="last_name">Фамилия</label>
            <input type="text" v-model="user.item.options.last_name" class="base-input">
          </div>
          <div class="mb-5">
            <label for="city">Град</label>
            <input type="text" v-model="user.item.options.city" class="base-input">
          </div>
        </div>
      </template>
      <template v-slot:bottom>
        <div class="flex gap-2">
          <button type="button" class="base-button text-green-500 border-green-500" :disabled="user.loading">Потвърди</button>
          <button type="button" class="base-button text-red-500 border-red-500" :disabled="user.loading" @click="handleCancel">Отакз</button>
        </div>
      </template>
    </base-dialog>
  </form>
</template>

<script>
// stores
import { useEnvStore } from '../../stores/env';
import { useUserStore } from '../../stores/user';

// components
import BaseDialog from '../dialogs/BaseDialog.vue';

export default {
  name: "RegisterDialog",
  components: {
    BaseDialog,
  },
  setup() {
    const env = useEnvStore();
    const user = useUserStore();

    const functions = {
      handleSubmit() {
        user.register();
      },
      handleCancel() {
        env.dialogs.auth.register = false;
      }
    }
    
    return { user, ...functions };
  },
};
</script>
