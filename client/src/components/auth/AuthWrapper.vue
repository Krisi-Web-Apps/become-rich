<template>
  <initial-logic />
  <transition-group name="fade">
    <login-dialog v-if="env.dialogs.auth.login" />
    <register-dialog v-if="env.dialogs.auth.register" />
  </transition-group>
</template>

<script>
// stores
import { useEnvStore } from '../../stores/env';

// components
import InitialLogic from './InitialLogic.vue';
import LoginDialog from './LoginDialog.vue';
import RegisterDialog from './RegisterDialog.vue';

export default {
  name: "AuthWrapper",
  components: {
    InitialLogic,
    LoginDialog,
    RegisterDialog,
},
  setup() {
    const env = useEnvStore();
    return { env }
  }
};
</script>
