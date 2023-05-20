import { defineStore } from "pinia";

import api from "../boot/axios";
import { useEnvStore } from "./env";
import { app } from "./../main";
import { useQuestionStore } from "./question";

export const useUserStore = defineStore("user", {
  state: () => ({
    loading: false,
    isLoggedIn: false,
    url: "/users",
    offset: 0,
    limit: 10,
    me: {},
    item: {},
    items: [],
  }),
  actions: {
    register() {
      this.loading = true;
      api
        .post(`${this.url}/register`, this.item)
        .then((res) => {
          this.setToken(res.data.token);
          this.afterLogin();
          const env = useEnvStore();
          env.dialogs.auth.register = false;
          this.getUser();
          app.$toast.success("Вече сте регистриран.");
        })
        .catch((err) => {
          if (err.response.data.message === "Invalid email address.")
            app.$toast.error("Невалиден имейл адрес.");
          if (err.response.data.message === "The password is to leak.")
            app.$toast.error("Тръврде слаба парола.");
          if (err.response.data.message === "The password's don't match.")
            app.$toast.error("Паролите не съвпадат.");
          if (
            err.response.data.message ===
            "The username must contain upper, lower letters and underscores."
          )
            app.$toast.error(
              "Потребителското име трябва да съдържа главни, малки букви, долни черти или цифри."
            );
          if (err.response.data.message === "Dablicate email address.")
            app.$toast.error("Този имейл адрес вече съществува.");
          if (err.response.data.message === "Please select gender.")
            app.$toast.error("Моля, изберете пол.");
        })
        .finally(() => (this.loading = false));
    },
    login() {
      this.loading = true;
      api
        .post(`${this.url}/login`, this.item)
        .then((res) => {
          this.setToken(res.data.token);
          this.afterLogin();
          const env = useEnvStore();
          env.dialogs.auth.login = false;
          this.getUser();
          app.$toast.success("Влязохте в системата.");
        })
        .catch((err) => {
          if (err.response.data.message === "Invalid email address.")
            app.$toast.error("Невалиден имейл адрес.");
          if (
            err.response.data.message === "Invalid email address or password."
          )
            app.$toast.error("Невалиден имейл или парола.");
        })
        .finally(() => (this.loading = false));
    },
    logout() {
      api.defaults.headers.authorization = null;
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      app.$toast.success("Излязохте от системата.");
    },
    afterLogin() {
      this.isLoggedIn = true;
    },
    setToken(token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      localStorage.setItem("token", token);
    },
    getUser() {
      this.loading = true;
      api
        .get(this.url)
        .then((res) => {
          this.item = res.data;
          const question = useQuestionStore();
          if (this.item.role_as !== "admin") {
            question.restartTrivia();
          }
        })
        .catch((err) => {
          const question = useQuestionStore();
          app.$toast.error("Изтекла сесия.");
          this.logout();
          question.restartTrivia();
        })
        .finally(() => (this.loading = false));
    },
    saveItem() {
      this.loading = true;
      api
        .post(`${this.url}`, this.item)
        .then((res) => {
          this.item = res.data;
          const env = useEnvStore();
          env.dialogs.users.profile = false;
          app.$toast.success("Данните са актуализирани.");
        })
        .catch((err) => {
          if (
            err.response.data.message === "You are not authorized." ||
            err.response.data.message === "Invalid token." ||
            err.response.data.message === "The token can not be null."
          )
            app.$toast.error("Нямате достъп до този ресурс.");
          if (err.response.data.message === "The password is wrong.") {
            app.$toast.error("Невалидна парола.");
            this.logout();
          }
        })
        .finally(() => (this.loading = false));
    },
    getItems() {
      this.loading = true;
      api
        .get(`${this.url}/admin/all?limit=${this.limit}&offset=${this.offset}`)
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => {
          app.$toast.error("Изтекла сесия.");
          this.logout();
        })
        .finally(() => (this.loading = false));
    },
  },
});
