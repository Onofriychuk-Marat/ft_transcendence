<template>
  <div class="container">
      <span class="trunc">ft_transcendence</span>
      <input class="input login" placeholder="Login" v-model="user.username"/>
      <input class="input pass" placeholder="password" v-model="user.password"/>
      <button class="reg" @click="registration">registration</button>
      <router-link to="/auth" style="text-decoration: none">
        <div class="photo">
          <img src="./../images/autor.svg" />
        </div>
        <div class="textReg">
          autorisation
        </div>
      </router-link>

  </div>
</template>


<script>
import axios from 'axios'
export default {
  props: {},
  emits: ['sing', 'getDataUser'],
  data() {
    return {
      user:  {
        username: '',
        password: '',
      }
    }
},
  methods: {
    registration(){
      axios('/api/user/registration', {
        method: 'POST',
        data: {
          user: {
            username: this.user.username,
            password: this.user.password
          }
        }
      }).then(response => {
        alert("Вы успешно зарегестрировались!")
        this.$emit("getDataUser", response.data.user);
        this.$emit('sing');
      }).catch(() => {
        alert("Такой пользователь уже есть")
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
    margin-left: 45.4%;
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
    width: 197px;
    height: 53.03px;
    font-size: 30px;
    border-radius: 17px;
    margin-left: 43.7%;
    margin-top: 1%;
    border: 1.5px #4F4F4F solid;
    
    background-color: #767373;

    font-family: UnicaOne;
    font-style: normal;
    font-weight: normal;

    align-items: center;
    text-align: center;
    letter-spacing: -0.03em;
}

.photo {
    margin-left: 48.3%;
    margin-top: 14%;
}

.pass {
    width: 197px;
    height: 53.03px;
    font-size: 30px;
    border-radius: 17px;

    margin-left: 43.5%;
    margin-top: 1%;
}

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
  letter-spacing: -0.03em;

  color: #7663EF;
}
</style>