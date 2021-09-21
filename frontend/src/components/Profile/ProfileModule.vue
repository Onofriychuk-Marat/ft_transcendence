<template>
  <div>
    <div class="topBlock">
      <div class="avatarBlock">
        <avatar-block :username="profile.username" :image="profile.image" :status="status"/>
      </div>
      <div class="statisticBlock">
        <span class="statistic">Statistic</span>
        <div class="topBlockInStatistic">
          <div class='blockGames'>
            <span class="games">Games {{profile.countGames}}</span>
            <div>
              <svg :style="getStyleScale" />
            </div>
            <div class="numbersScale">
              <span class="numberWin">WIN {{profile.countWin}}</span>
              <span class="numberLose">Lose {{profile.countLose}}</span>
            </div>
          </div>
          <div class="blockRating">
            <div :style="{'display': 'flex'}">
              <span class="games">Rating {{profile.rating}}</span>
              <div>
                <img class="cup" src="./../../images/iconCup.svg" />
              </div>
            </div>
            <div :style="{'display': 'flex'}">
              <span class="numberRating Min">Min  {{profile.minimalRating}}</span>
              <span class="numberRating Max">Max  {{profile.maximumRating}}</span>
            </div>
          </div>
        </div>
        <div class="bottomBlockInStatistic">
          <div class="blockGames">
            <div>
              <span class="strBestWinStreak">Best Win streak</span>
            </div>
            <div class="num8_fire">
              <span class="number8">{{profile.bestWinStreak}}</span>
              <div class="fire">
                <img src="./../../images/iconFire.svg" />
              </div>
            </div>
          </div>
          <div class="blockRating">
            <div>
              <span class="strBestWin">Best Win</span>
            </div>
            <div class="num8_fire">
              <span class="number">{{profile.bestWin}}</span>
              <div class="bestCup">
                <img src="./../../images/iconCupBestWin.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttonBlock">

        <router-view></router-view>

      </div>
    </div>
    <div class="bottomBlock">
      <span class="strHistoryFights">History Fights</span>
      <div class="headerHistory">
        <span class="header" :class="'positionApponent'">Apponent</span>
        <span class="header" :class="'positionScore'">Score</span>
        <span class="header" :class="'positionMe'">Me</span>
        <span class="header" :class="'positionData'">Data</span>
      </div>
      <ul class="listHistory">
        <li v-for="elem in profile.history" :key="elem.id" class="elemList" :class="getColor(elem)">
          <span class="wordList" :class="'apponent'">{{elem.apponent}}</span>
          <div class="wordList" :class="'score'">
            <div class="goalsApponent">
              {{elem.goalsApponent}}
            </div>:
            <div class="goalsUser">
              {{elem.goalsUser}}
            </div>
          </div>
          <div class="user">
            <span class="wordList">{{elem.user}}</span>
          </div>
          <div class="data">
            <span>{{elem.data}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>

import axios from 'axios'
import AvatarBlock from "./avatarBlock.vue"

export default {
  props: {},
  inject: ['getTocken'],
  mounted() {
    let urlAddres = this.$route.path;

    if (urlAddres == '/profile') {
      urlAddres = '/api/user/profile'
    } else {
      urlAddres = '/api/world/users/' + urlAddres.substr(13);
    }

    console.log("url: " + urlAddres);

    axios({
      method: 'get',
      url: urlAddres,
      headers: {
        'Authorization': `Basic ${this.getTocken()}`
        }
    }).then(response => {
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  },
  data() {
    return {
      profile: {
        id: 1,
        username: 'Qmarowak',
        image: 'image.svg',
        countGames: 1000,
        countWin: 801,
        countLose: 199,
        bestWinStreak: 5,
        rating: 200,
        minimalRating: 150,
        maximumRating: 250,
        bestWin: 265,
        history: [
          {
            id: 1,
            user: 'qmarowak',
            apponent: 'utoomey',
            goalsUser: 15,
            goalsApponent: 10,
            data: "1 Dec 2012",
          },
          {
            id: 2,
            user: 'qmarowak',
            apponent: 'hballaba',
            goalsUser: 5,
            goalsApponent: 7,
            data: "21 Feb 2002",
          },
          {
            id: 3,
            user: 'qmarowak',
            apponent: 'hballaba',
            goalsUser: 5,
            goalsApponent: 7,
            data: "21 Feb 2002",
          },
          {
            id: 4,
            user: 'qmarowak',
            apponent: 'hballaba',
            goalsUser: 5,
            goalsApponent: 7,
            data: "21 Feb 2002",
          },
          {
            id: 5,
            user: 'qmarowak',
            apponent: 'hballaba',
            goalsUser: 56,
            goalsApponent: 7,
            data: "21 Feb 2002",
          },
          {
            id: 6,
            user: 'qmarowak',
            apponent: 'hballaba',
            goalsUser: 5,
            goalsApponent: 7,
            data: "21 Feb 2002",
          },
          {
            id: 7,
            user: 'qmarowak',
            apponent: 'hballaba',
            goalsUser: 51,
            goalsApponent: 7,
            data: "1 Feb 2002",
          },
          {
            id: 8,
            user: 'qmarowak',
            apponent: 'hballaba',
            goalsUser: 5,
            goalsApponent: 72,
            data: "21 Feb 2002",
          },
          {
            id: 9,
            user: 'ninja',
            apponent: 'stalit',
            goalsUser: 115,
            goalsApponent: 72,
            data: "2 Feb 2022",
          },
          {
            id: 10,
            user: 'Op-hey-lalaly',
            apponent: 'Op-hey-lalaly',
            goalsUser: 5,
            goalsApponent: 72,
            data: "21 Feb 2002",
          },
          {
            id: 11,
            user: 'qmarowak',
            apponent: 'hballaba',
            goalsUser: 5,
            goalsApponent: 72,
            data: "21 Feb 2002",
          },
          {
            id: 12,
            user: 'qmarowak',
            apponent: 'hballaba',
            goalsUser: 5,
            goalsApponent: 72,
            data: "21 Feb 2002",
          }
        ]
      },
      typeUser: "friendInvitation",
      status: 'online',
    }
  },
  provide() {
    return {
    getType: this.getType,
    getId: this.getId,
    }
  },
  methods: {
    getColor(elem) {
      if (elem.goalsUser - elem.goalsApponent < 0) {
        return 'colorLose';
      }
      return 'colorWin';
    },
    getType() {
      return (this.typeUser);
    },
    getId() {
      return (this.profile.id);
    }
  },
  computed: {
    getStyleScale() {
      var percentWin = 100 * this.profile.countWin / this.profile.countGames;
      return ({
        'width': '23.8%',
        'height': '10px',
        'border-radius': '30px',
        'position': 'absolute',
        'margin-left': '2%',
        'margin-top': '0.9%',
        'background': `linear-gradient(90deg, #37C35E ${percentWin}%, #DB4141 ${percentWin}%)`,

      })
    }
  },
  components: {
    AvatarBlock: AvatarBlock,
  }
}
</script>

<style scoped>

.buttonBlock {
  /* background-color: rgba(165, 71, 71, 0.616); */
  width: 200px;
  height: 294px;

  margin-top: 1.95%;
}

.colorLose {
  color:rgb(223, 172, 172);
  background-color: rgba(219, 65, 65, 0.26);
}

.colorWin {
  background-color: rgba(55, 195, 94, 0.26);
  color:rgb(172, 223, 172);
}

.data {
  /* background-color: aquamarine; */
  margin-left: 22%;
  width: 195px;
  text-align: right;
}

.goalsUser {
  /* background-color: aquamarine; */
  width: 50px;
  text-align: left;
}

.goalsApponent {
  /* background-color: aquamarine; */
  width: 50px;
  text-align: right;
}

.user {
  margin-left: 12.6%;
  /* background-color: rgb(58, 184, 184); */
  width: 200px;
}

.score {
  margin-left: 6.2%;
}

.apponent {
  margin-left: 3.6%;
  /* background-color: antiquewhite; */
  width: 210px;
}

.wordList {
  /* color: #fff; */
  font-size: 28px;
  display: flex;
}

.elemList {
  opacity: .5s;
  width: 1298px;
  height: 43.86px;

  margin-top: 0.3%;

  display: flex;
  align-items: center;

  text-align: left;
  /* padding-top: 0.5%; */
  font-size: 28px;
  display: flex;
}

.listHistory::-webkit-scrollbar {
  width: 0px;
  /* background-color: #606061;
  border-radius: 1000px; */
}

/* .listHistory::-webkit-scrollbar-thumb {
  border-radius:1000px;
  background-color: #2e2e2e;
}

.listHistory::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  border-radius: 100px;
  background-color: #606061;
} */

.listHistory {
  margin-left: 2%;
  width: 1315px;
  height: 378px;
  overflow: auto;
}

.positionApponent {
  margin-left: 8%;
}

.positionScore {
  margin-left: 13%;
}

.positionMe {
  margin-left: 13%;
}

.positionData {
  margin-left: 41%;
}

.header {
  font-size: 32px;
  color: #fff;
  /* background-color: brown; */
}

.headerHistory {
  display: flex;
}

.strHistoryFights {
  /* background-color:brown; */
  color: #fff;
  font-size: 38px;
  margin-left: 40%;
}

.bottomBlock {
  /* background-color: chartreuse; */
  height: 468px;
}

.bestCup {
  /* background-color: rgb(211, 42, 76); */
  margin-left: 3%;
  margin-top: 1%;
  width: 60px;
  height: 60px;
}

.number {
  text-align: right;
  width: 100px;
  /* background-color: darkorange; */
  font-size: 50px;
  color: #fff;
  margin-left: 24%;
}

.strBestWin {
  font-size: 28px;
  margin-left: 35%;
  color: #fff;
}

.num8_fire {
  width: 100%;
  height: 60px;
  /* background-color: darkgray; */
  display: flex;
}

.fire {
  margin-left: 4%;
  width: 60px;
  height: 60px;
}

.number8 {
  text-align: right;
  width: 100px;
  font-size: 50px;
  color: #fff;
  margin-left: 20%;
}

.strBestWinStreak {
  font-size: 28px;
  margin-left: 25%;
  color: #fff;
}

.bestWinStreak {
  text-align: center;
}

.Min {
  margin-left: 20%;
}

.Max {
  margin-left: 10%;
}

.numberRating {
  margin-top: 2%;
  font-size: 25px;
  color: #fff;
}

.cup {
  margin-top: 22%;
  width: 25px;
  height: 25px;
}

.blockRating {
  width: 49%;
  /* background-color: rgb(47, 122, 100); */
  margin-left: 1.9%;
}

.numberWin {
  color: #93FF82;
  font-size: 17px;
}

.numberLose {
  color: #DB4141;
  font-size: 17px;
  margin-left: 61%;
}

.numbersScale {
  display: flex;
  margin-left: 7.5%;
  margin-top: 5.5%;
  /* background-color: coral; */
}

.games {
  margin-left: 30%;
  font-size: 30px;
  color: rgb(255, 255, 255);
  /* background-color: cornsilk; */
}

.blockGames {
  width: 49%;
  /* background-color: rgb(47, 122, 100); */
}

.topBlockInStatistic {
  /* background-color: rgb(177, 177, 235); */
  widows: 100%;
  height: 120px;
  display: flex;
}

.bottomBlockInStatistic {
  /* background-color: rgb(187, 121, 173); */
  margin-top: 1%;
  widows: 100%;
  height: 120px;
  display: flex;
}

.statistic {
  font-size: 38px;
  margin-left: 42%;
  color:rgb(255, 255, 255)
}

.statisticBlock {
  /* background-color: bisque; */

  width: 800px;
  margin-top: 2%;
  /* margin-left: 4%; */
}

.avatarBlock {
  /* background-color: rgb(218, 216, 112); */
  width: 320px;
  margin-top: 2%;
  margin-left: 5%;
}

.topBlock {
  /* background-color: rgb(112, 218, 218); */
  display: flex;
}
</style>
