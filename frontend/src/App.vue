<template>
  <router-view v-if="!auth"
    @sing="sing"
    @getDataUser="setDataUser"
    :userData="'data from App'"></router-view>
  <div v-else>
    <div class="header">
      <div>
        <button class="button" :class="''">Play</button>
      </div>
      <div class="elem friends"
      :class="activeModule == '/friends' ? 'active' : ''"
      @click="goToModule('/friends')">
        friends
      </div>
      <div class="elem world"
      :class="activeModule == '/world' ? 'active' : ''"
      @click="goToModule('/world')">
        world
      </div>
      <div class="elem profile"
      :class="activeModule == '/profile' ? 'active' : ''"
      @click="goToModule('/profile')">
        Profile
      </div>
      <div class="elem ethers"
      :class="activeModule == '/ethers' ? 'active' : ''"
      @click="goToModule('/ethers')">
        ethers
      </div>
      <div class="elem setting"
      :class="activeModule == '/setting' ? 'active' : ''"
      @click="goToModule('/setting')">
        settings
      </div>
      <div class="elem info"
      :class="activeModule == '/info' ? 'active' : ''"
      @click="goToModule('/info')">
        info
      </div>

      <span class="nick" @click="activeModule = 'prodile'"> qmarowak </span>
      <div class="photo">
        <img src="./images/image.svg"/>
      </div>
    </div>
    <div>
      <router-view v-if="auth"/>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      auth: true,
      userData: 'begininValue',
      activeModule: null,
      url: this.$route.path
    }
  },
  mounted(){
    console.log("APP");
    if (!this.auth){
      this.$router.push('/auth')
      console.log("mounted")
    }
  },
  updated() {
      console.log("updated: ");
  },
  provide() {
    return {
      getTocken: this.getUserTocken
    }
  },
  methods: {
    sing() {
      this.auth = true;
      this.$router.push('/info')
    },
    goToModule(path) {
      // this.activeModule = path;
      this.$router.push(path);
    },
    getClass(value) {
      if (this.activeModule === value) {
        return ('active')
      }
      return ''
    },
    setDataUser(dataUser) {
      console.log(dataUser);
      this.userData = dataUser.token;
    },
    getUserTocken() {
      return (this.userData)
    }
  },
  computed: {
  },
  components: {
  },
  watch: {
    $route (to){
      this.activeModule = to.path
      if (this.activeModule == '/reg' || this.activeModule == '/auth') {
        this.auth = false;
      }
    }
  },
}
</script>

<style scoped>

.photo {
  margin-left: 1%;
}

.nick {
  font-size: 33px;
  margin-left: 21%;
  color:rgb(255, 255, 255)
}

.back {
  background-color: #fef;
}

.button:hover{
  background: #EC5656;
}

.button {
    /* position: absolute; */
  width: 97px;
  height: 43px;
  /* left: 36px;
  top: 35px; */
  margin-left: 6%;

background: #2FA0DF;
border-radius: 19px;
border-width: 0;

  font-family: UnicaOne;

font-style: normal;
font-weight: normal;
font-size: 26px;
/* line-height: 31px; */
/* identical to box height */

/* display: flex; */
/* align-items: center;
text-align: right;
letter-spacing: -0.03em; */

color: #000000;
}

.steps {
  position: relative;
}

.header {
  /* position: absolute; */
  /* background-color: gold; */
  width: 100%;
  height: 2%;

  /* justify-content: space-between; */
  /* display: inline-block; */
  /* flex-direction: row; */
  /* float: left; */
  display: flex;
  align-items: center;
  /* text-align: center; */
  /* justify-content: space-between; */
}

.friends {
  /* width: 95px; */
  height: auto;
  /* margin-left: 2.5%; */
  margin-left: 2.5%;

  top: 37px;
}

.world {
  /* width: 82px; */
  height: auto;
  margin-left: 2.5%;
  top: 37px;
}

.profile {
  /* width: 93px; */
  height: auto;
  margin-left: 2.5%;
  top: 37px;
}

.ethers {
  /* width: 83px; */
  height: auto;
  margin-left: 2.5%;
  top: 37px;
}

.setting {
  /* width: 106px; */
  height: auto;
  margin-left: 2.5%;
  top: 37px;
}

.info {
  /* width: 56px; */
  height: auto;
  margin-left: 2.5%;
  top: 37px;
}

.elem:hover {
  border: 3px solid; /* Параметры границы */
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-color: #EC5656;
}

.elem {
  /* background: #817f7f; */

  /* position: absolute; */

  /* font-style: normal;
  font-weight: normal; */
  font-size: 200%;
  /* line-height: 40px; */
  /* display: flex; */
  /* align-items: center; */
  text-align: center;
  /* letter-spacing: -0.03em; */

  color: #FFFFFF;
}

.active {
  border: 3px solid; /* Параметры границы */
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-color: #EC5656;
}

.steps-item span {
  cursor: pointer;
  border-radius: 50%;
  padding: .75rem 1rem;
  font-size: .75rem;
  background: #cccccc;
}
</style>
