<template>
  <div>
    <div class="topBlock">
      <img class="image" src="./../../images/image.svg">
      <div class="blockUpload">
        <div class="iconDown">
          <img src="./../../images/iconDownloud.svg" />
        </div>
        <div class="uploadPhoto">Upload PHOto</div>
      </div>
    </div>
    <div class="blockAccount">
      <span class="txtAccount">Account</span>
      <div class="logIn">
        <span class="wordLog">LOGIN</span>
        <input style="margin-left: 18.6%;" class="input inputLogin" placeholder="login"/>
      </div>
      <div class="passIn">
        <span  class="wordLog">PASSWORD</span>
        <input style="margin-left: 6%;" class="input inputLogin" placeholder="password"/>
        <button class="btnNew">New</button>
      </div>
    </div>
  </div>
  
</template>


<script>
export default {
  props: {},
  data() {
    return {}
},
  components: {}
}
</script>


<style scoped>

.btnNew {
  background-color: rgba(47, 160, 223, 1);
  border-radius: 15px;
  width: 67px;
  height: 36px;
  border: 0;
  margin-left: 2%;
  font-size: 20px;
  font-family: UnicaOne;
}

.inputLogin {
  font-size: 30px;
  border-radius: 80px;
  background-color: rgba(68, 67, 67, 0.42);
  border: 0;

  width: 170px;
  height: 34px;
}

.wordLog {
  font-size: 26px;
  margin-top: 1%;
  color: #fff;
}

.logIn{
  margin-top: 7%;
  display: flex;
}

.passIn{
  margin-top: 3%;
  display: flex;
}

.txtAccount {
  font-size: 28px;
  color:rgb(255, 255, 255);
}

.blockAccount {
  width: 380px;
  margin-left: 35%;
  margin-top: 2%;
  text-align: center;
}

.iconDown {
  margin-top: 0.5%;
}

.blockUpload {
  display: flex;
  margin-left: 45%;
}

.uploadPhoto {
  font-size: 21px;
  color: rgb(255, 255, 255);
  margin-left: 0.5%;
}

.image {
  width: 240px;
  height: 240px;
}

.topBlock {
  text-align: center;
  margin-right: 5%;
  margin-top: 2%;
}

</style>