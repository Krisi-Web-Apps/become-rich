import { defineStore } from "pinia";

import api from "../boot/axios";
import { useEnvStore } from "./env";
import { app } from "./../main";

export const useUserStore = defineStore("user", {
  state: () => ({
    loading: false,
    url: "/users",
    me: {},
    item: {},
    items: [],
  }),
  actions: {
    register() {
      this.loading = true;
      api.post(`${this.url}/register`, this.item)
        .then(res => {
          this.afterLogin(res.data.token);
          const env = useEnvStore();
          env.dialogs.auth.register = false;
        })
        .catch(err => {
          if (err.response.data.message === "Invalid email address.")
            app.$toast.error("Невалиден имейл адрес.");
          if (err.response.data.message === "The password is to leak.")
            app.$toast.error("Тръврде слаба парола.");
          if (err.response.data.message === "The password's don't match.")
            app.$toast.error("Паролите не съвпадат.");
          if (err.response.data.message === "The username must contain upper, lower letters and underscores.")
            app.$toast.error("Потребителското име трябва да съдържа главни, малки букви, долни черти или цифри.");
          if (err.response.data.message === "Dablicate email address.")
            app.$toast.error("Този имейл адрес вече съществува.");
          if (err.response.data.message === "Please select gender.")
            app.$toast.error("Моля, изберете пол.");
        })
        .finally(() => this.loading = false);
    },
    afterLogin(token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      localStorage.setItem("token", token);
    }
  }
});
