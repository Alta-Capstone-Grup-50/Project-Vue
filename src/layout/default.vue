<template>
<div>
  <Navbar />
      <router-view/>
</div>
</template>
<script>
import Navbar from "@/components/navbar.vue"
export default {
  name: 'DefaultPage',
  components: {
      Navbar
  },
};
</script>