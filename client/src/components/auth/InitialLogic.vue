<template></template>

<script>
import { useEnvStore } from '../../stores/env';
import { useUserStore } from '../../stores/user';

export default {
  name: "InitialLogic",
  setup() {
    const user = useUserStore();
    const env = useEnvStore();

    const tryToLogin = () => {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        user.setToken(token);
        user.afterLogin();
        user.getUser();
    }

    tryToLogin();
  }
};
</script>
