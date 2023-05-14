import { defineStore } from "pinia";

export const useEnvStore = defineStore("env", {
    state: () => ({
        screens: {
            start: true,
            theTrivia: false,
        }
    })
});
