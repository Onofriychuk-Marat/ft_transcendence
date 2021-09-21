<template>
  <div>
    <div class="blockImageAndStatus">
      <img :class="status != null ? 'outline' : 'avatar'" :style="{'color': getColor()}" :src="require('./../../images/' + image)" />
			<span v-if="status != null" :style="{'color': getColor()}">{{status}}</span>
    </div>
    <span class="username">
      {{username}}
    </span>
  </div>
</template>


<script>
export default {
  props: ['username', 'image', 'status'],
  data() {
    return {}
	},
  methods: {
		getColor() {
			if (this.status == 'play') {
				return ('rgb(228, 230, 126)')
			} else if (this.status == 'online') {
				return ('rgb(71, 216, 83)')
			} else if (this.status == 'offline') {
				return ('rgb(219, 55, 55)')
			} else {
				return ('rgb(114, 114, 114)')
			}
		}
	}
}
</script>


<style scoped>

.blockImageAndStatus {
	/* background-color: rgb(185, 82, 82); */
	display: flex;
}

.status {
	color:rgb(114, 114, 114);
}

.username {
  color: #fff;
  font-size: 35px;
  margin-left: 18%;
}

.outline {
	border: 5px solid;
  border-radius: 100%;
	width: 242px;
  height: auto;
}

.avatar {
	border: 5px solid rgb(101, 108, 209, 0);
  width: 242px;
  height: auto;
}
</style>