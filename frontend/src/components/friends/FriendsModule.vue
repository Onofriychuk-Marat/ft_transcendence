<template>
  <div>
    <div class="blockScrollBar">
      <ScollBar />
    </div>
  </div>
</template>


<script>
import ScrollBar from "./scrollBarFriendsAndChats.vue"
export default {
  props: {},
  data() {
    return {}
  },
  components: {
    ScollBar: ScrollBar,
  }
}
</script>


<style scoped>

.blockScrollBar {
  /* background-color: royalblue; */
  width: 100%;
  height: 120px;

  margin-left: 0.5%;
  margin-top: 2%;
}

</style>