<template>
  <div class="container">
      <span class="trunc">ft_transcendence</span>
      <input class="input login" placeholder="Login" v-model="login"/>
      <input class="input pass" placeholder="password" v-model="pass"/>
      <button class="reg" @click="sing">sign</button>
      <router-link to="/reg" style="text-decoration: none">
        <div class="photo">
          <img src="./../images/reg.svg" />
        </div>
        <div class="textReg">
          Registration
        </div>
      </router-link>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  props: {},
  data() {
    return {
      login: '',
      pass: '',
    }
  },
  methods: {
    sing() {
      axios('/api/user/login', {
        method: 'POST',
        data: {
          user: {
            username: this.login,
            password: this.pass,
          }
        }
      }).then(response => {
        alert("Вы успешно авторизировались!")
        this.$emit("getDataUser", response.data.user);
        this.$emit('sing');
      }).catch( response => {
        console.log(response);
        alert("Вы ввели не правильные данные, попробуйте снова")
      })
    }
  },
  components: {}
}
</script>


<style scoped>

.textReg {
    font-size: 30px;
    color:rgb(151, 150, 150);
    margin-left: 45.8%;
    text-decoration: none;
}

.container {
    margin-top: 3%;
    /* align-items: center; */
    /* text-align: center; */
}

.reg:hover {
    background-color: rgb(123, 187, 107);
}

.reg {
    width: 160px;
    height: 53.03px;
    font-size: 30px;
    border-radius: 17px;
    margin-left: 45.3%;
    margin-top: 1%;
    border: 1.5px #4F4F4F solid;
    
    background-color: #767373;
    color:rgb(44, 43, 43);

    font-family: UnicaOne;
    font-style: normal;
    font-weight: normal;

    align-items: center;
    text-align: center;
    letter-spacing: -0.03em;
}

.photo {
    margin-left: 48%;
    margin-top: 11.6%;
}

.pass {
    width: 197px;
    height: 53.03px;
    font-size: 30px;
    border-radius: 17px;

    margin-left: 43.5%;
    margin-top: 1%;
}

/* .login:hover {
    width: 201.4px;
    height: 54px;
    font-size: 30px;
    border-radius: 17px;

    margin-top: 11%;
    margin-left: 43.3%;
} */

.login {
    width: 197px;
    height: 53.03px;
    font-size: 30px;
    border-radius: 17px;

    margin-top: 11%;
    margin-left: 43.5%;
}

.trunc {
  margin-left: 15%;
  margin-top: 30%;

  font-style: normal;
  font-weight: normal;
  font-size: 140px;
  /* line-height: 170px;
  display: flex;
  align-items: center;
  text-align: right; */
  letter-spacing: -0.03em;

  color: #7663EF;
}
</style>