<template></template>

<script>
import { useEnvStore } from '../../stores/env';
import { useQuestionStore } from '../../stores/question';
import { useUserStore } from '../../stores/user';

export default {
  name: "InitialLogic",
  setup() {
    const user = useUserStore();
    const env = useEnvStore();
    const question = useQuestionStore();

    const tryToLogin = () => {
        const token = localStorage.getItem("token");
        if (!token) {
          env.screens.start = true;
          setTimeout(() => env.screens.start = false, 4000);
          setTimeout(() => env.trivia.showTheWindow = true, 5000);
          setTimeout(() => question.start(), 6000);
          return;
        }
        setTimeout(() => env.trivia.showTheWindow = true, 100);
        user.setToken(token);
        user.afterLogin();
        user.getUser();
    }

    tryToLogin();
  }
};
</script>
