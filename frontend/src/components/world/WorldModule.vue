<template>
  <div class="blockWorld">
    <input class='input search' v-model="stringSearch" placeholder="search friends"/>
    <ul class="list">
      <li :style="{'display': 'block'}"  v-for="elem in listWord" v-show="filterByWord(elem)" :key="elem.id">
        <router-link :to="'/profile/user' + elem.id" class="input itemList" :style="{'text-decoration': 'none'}">
          <div class="divPhoto">
            <img class="photo" :src="require('./../../images/' + (elem.image == '' ? 'image.svg' : elem.image))"/>
          </div> 
          <div class='blockName'>
            <div>{{elem.name}}</div>
            <svg class="circle" :class="elem.status == 'online' ? 'online' : 'offline'" />
          </div>
          <div class='iconBlock'>
            <img v-if="isBlocked(elem.type) == 'block'" src="./../../images/iconBlock.svg" />
          </div>
          <div class="iconTypeElemList">
            <img v-if="getType(elem.type) == 'chat'" src="./../../images/iconGroup.svg">
            <img v-else src="./../../images/iconUser.svg">
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  inject: ['getTocken'],
  data() {
    return {
      stringSearch: '',
      listWord: null,
    }
  },
  mounted() {
    console.log("mounted:");
    axios({
      method: 'get',
      url: '/api/world',
      headers: {
        'Authorization': `Basic ${this.getTocken()}`
        }
      }).then(response => {
        this.listWord = response.data.chats;
        console.log("chats: ")
        console.log(response.data.chats);
      }).catch(response => {
        console.log(response)
      })
  },
  methods: {
    isBlocked(type) {
      if (type.length > 4 && type[4] == 'B') {
        return ('block');
      }
      return null
    },
    getType(type){
      if (type[0] == 'c'){
        return 'chat'
      }
      return 'user';
    },
    filterByWord(id) {
      let min = id.name.toUpperCase();
      let max = id.name.toLowerCase();

      for (var i = 0; this.stringSearch[i]; ++ i) {
        if (min[i] != this.stringSearch[i] 
          && max[i] != this.stringSearch[i]) {
          return false;
        }
      }
      return id
    }
  },
  components: {}
}
</script>


<style scoped>

.blockName {
  /* background-color: rgb(158, 101, 199); */
  width: 200px;
  display: flex;
  align-items: center;
  margin-left: 2%;
}

.iconBlock {
  /* background-color: indigo; */
  position: relative;
  margin-left: 60%;
  margin-top: 0.4%;
  width: 25px;
  height: 25px;
}

.iconTypeElemList {
  position: relative;
  margin-left: 1%;
}

.divPhoto {
   margin-left: 1%;
}

.photo {
  /* position:absolute; */
  /* margin-bottom: 10%; */
  width: 47px;
  height: 47px;
}

.blockWorld {
  position: absolute;
  /* background-color: rgb(167, 167, 167); */
  width: 99.4%;
  height: 91.7%;
  /* align-items: center; */
}

.circle {
  margin-bottom: 0.2%;
  margin-left: 5%;
  width: 10px;
	height: 10px;
	-moz-border-radius: 50px;
	-webkit-border-radius: 50px;
	border-radius: 50px;
  /* text-align: left; */
}

.online {
	background: rgb(57, 201, 57);
}

.offline {
	background: rgb(201, 57, 57);
}

.list {
  /* background-color: rgb(194, 201, 162); */
  width: 920px;
  height: 650px;
  margin-left: 16.5%;
  overflow: auto;
  /* align-items: center; */
}

.list::-webkit-scrollbar {
  width: 6px;
  background-color: #606061;
  border-radius: 1000px;
}

.list::-webkit-scrollbar-thumb {
  border-radius:1000px;
  background-color: #2e2e2e;
}

.list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  border-radius: 100px;
  background-color: #606061;
}

.itemList {
  opacity: .5s;
  width: 893px;
  height: 43.86px;
  border-radius: 20px;

  margin-top: 0.6%;

  display: flex;
  align-items: center;

  text-align: left;
  padding-top: 0.5%;
  font-size: 26px;
}

.search {
  font-size: 28px;
  
  width: 632px;
  height: 49px;
  margin-top: 2%;

  border-radius: 17px;
  margin-left: 24%;
  text-align: left;
  
  background-image: url('./../../images/freeIconFind.png');
  background-repeat: no-repeat;
  padding-left: 10%;
  background-position-x: 20px;
  background-position-y: 45%;
  background-size: 4%;
}
</style>