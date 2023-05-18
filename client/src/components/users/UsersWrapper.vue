<template>
  <transition-group name="fade">
    <profile-dialog v-if="env.dialogs.users.profile" />
    <administration-dialog v-if="env.dialogs.users.administration" />
  </transition-group>
</template>

<script>
// stores
import { useEnvStore } from '../../stores/env';

// components
import ProfileDialog from './ProfileDialog.vue';
import AdministrationDialog from './AdministrationDialog.vue';

export default {
  name: "UsersWrapper",
  components: {
    ProfileDialog,
    AdministrationDialog,
  },
  setup() {
    const env = useEnvStore();
    return { env }
  }
};
</script>
