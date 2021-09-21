<template>
  <div class="blockWorld">
    <input class='input search' v-model="stringSearch" placeholder="search friends"/>
    <ul class="list">
      <li class="input itemList" v-for="elem in ethers"
        v-show="filterByWord(elem)"
        :key="elem.id">
        <div class="time">
          {{getTime(elem.duration)}}
        </div>
        <div class="revals">
          <div class="user1">
            {{elem.rivalOne}}
          </div>
          <div>
            <img src="./../../images/iconFight.svg" />
          </div>
          <div class="user2">
            {{elem.rivalTwo}}
          </div>
        </div>
        <div class="countWatching">
          {{elem.numberOfWatching}}
        </div>
        <div>
          <img src="./../../images/iconEye.svg" />
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  props: {},
  data() {
    return {
      stringSearch: '',
      ethers: [
        {
          id: 1,
          rivalOne: 'qmarowak',
          rivalTwo: 'utoomey',
          duration: 200,
          numberOfWatching: 5,
        },{
          id: 2,
          rivalOne: 'ninja',
          rivalTwo: 'stalin',
          duration: 2330,
          numberOfWatching: 12,
        },{
          id: 2,
          rivalOne: 'putin',
          rivalTwo: 'badBoy',
          duration: 1200,
          numberOfWatching: 125
        },{
          id: 3,
          rivalOne: 'pikachu',
          rivalTwo: 'hballabad',
          duration: 8200,
          numberOfWatching: 15
        },{
          id: 4,
          rivalOne: 'apple',
          rivalTwo: 'samsung',
          duration: 1000,
          numberOfWatching: 75
        },{
          id: 5,
          rivalOne: 'MaSHA',
          rivalTwo: 'DaSHA',
          duration: 2231,
          numberOfWatching: 51
        },{
          id: 6,
          rivalOne: 'MaSHA',
          rivalTwo: 'DaSHA',
          duration: 2231,
          numberOfWatching: 51
        },{
          id: 7,
          rivalOne: 'MaSHA',
          rivalTwo: 'DaSHA',
          duration: 2231,
          numberOfWatching: 51
        },{
          id: 8,
          rivalOne: 'MaSHA',
          rivalTwo: 'DaSHA',
          duration: 2231,
          numberOfWatching: 51
        },{
          id: 9,
          rivalOne: 'MaSHA',
          rivalTwo: 'DaSHA',
          duration: 2231,
          numberOfWatching: 51
        },{
          id: 10,
          rivalOne: 'MaSHA',
          rivalTwo: 'DaSHA',
          duration: 2231,
          numberOfWatching: 51
        },{
          id: 11,
          rivalOne: 'MaSHA',
          rivalTwo: 'DaSHA',
          duration: 2231,
          numberOfWatching: 51
        },
      ]
    }
  },
  methods: {
    getTime(time) {
      var hour = Math.trunc(time / 3600);
      var remainderMinut = time - hour * 3600;
      var minut = Math.trunc((time - hour * 3600) / 60);
      var second = remainderMinut - (minut * 60);
      

      hour = (Math.ceil(Math.log10(hour + 1)) <= 1) ? '0' + hour : hour;
      minut = (Math.ceil(Math.log10(minut + 1)) <= 1) ? '0' + minut : minut;
      second = (Math.ceil(Math.log10(second + 1)) <= 1) ? '0' + second : second;
      return (hour + ':' + minut + ':' + second);
    },
    filterByWord(id) {
      let rivalOneMin = id.rivalOne.toLowerCase();
      let rivalOneMax = id.rivalOne.toUpperCase();
      let rivalTwoMin = id.rivalTwo.toLowerCase();
      let rivalTwoMax = id.rivalTwo.toUpperCase();

      for (var i = 0; this.stringSearch[i]; ++ i) {
        if (rivalOneMin[i] != this.stringSearch[i] 
          && rivalOneMax[i] != this.stringSearch[i]
          && rivalTwoMin[i] != this.stringSearch[i]
          && rivalTwoMax[i] != this.stringSearch[i]) {
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

.countWatching {
  font-size: 20px;
  margin-left: 20%;

  /* background-color: lawngreen; */
  width: 40px;
  text-align: right;
}

.user1 {
  margin-top: 2%;
  margin-right: 5%;
  margin-left: 5%;

  width: 130px;
  text-align: right;

  /* background-color: khaki; */
}

.user2 {
  margin-top: 2%;
  margin-right: 5%;
  margin-left: 5%;

  width: 130px;

  /* background-color: khaki; */
}

.revals {
  display: flex;
  margin-top: 0.4%;
  margin-left: 16.5%;
  width: 400px;

  /* background-color: lawngreen; */
}

.time {
  margin-left: 2%;
  margin-bottom: 0.3%;
  /* background-color: indigo; */
  width: 70px;
  font-size: 17px;
}

.blockWorld {
  position: absolute;
  /* background-color: rgb(167, 167, 167); */
  width: 99.4%;
  height: 91.7%;
  /* align-items: center; */
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