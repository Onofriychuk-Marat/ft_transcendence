<template>
  <div>
      <div v-if="typeUser != 'userBlocked'">
        <button @click="sendRequest('blocked')" class="blocked colorBtnRed third" >Blocked</button>
        <div v-if="typeUser == 'friendInvitation'" class="btnsRejectAndAccept">
            <button @click="sendRequest('reject')" class="blocked colorBtnRed third" >Reject</button>
            <button @click="sendRequest('accept')" class="blocked colorBtnGreen third" :style="{'margin-top': '2%'}" >accept</button>
        </div>
        <div v-else-if="typeUser == 'user' ||  typeUser == 'friendshipRequest'" class="btnsRejectAndAccept">
            <button @click="sendRequest('add')" class="add" :class="{'colorBtnGreen thrid': typeUser == 'user'}">add</button>
        </div>
        <div v-else-if="typeUser == 'friend'" class="btnsRejectAndAccept">
            <button @click="sendRequest('delete')" class="blocked colorBtnRed third">delete</button>
        </div>
      </div>
      <div v-else>
        <button @click="sendRequest('unblocked')" class="blocked colorBtnGreen third">restore</button>
      </div>
  </div>
</template>


<script>

import axios from 'axios'

export default {
  inject: ['getType', 'getId', 'getTocken'],
  data() {
    return {
      typeUser: this.getType(),
    }
  },
  methods: {
    sendRequest(typeRequest) {
      axios({
        method: 'post',
        url: '/api/world/users/' + this.getId() + '/' + typeRequest,
        headers: {
          'Authorization': `Basic ${this.getTocken()}`
        },
      })
    }
  },
  components: {}
}
</script>


<style scoped>

.btnsRejectAndAccept {
    width: 90px;
    margin-top: 2%;
    /* display: flex; */
}

.blocked {
    /* background-color: #EC5656; */
    background-color: rgba(253, 112, 112, 0);
    border: 0;
    border-radius: 15px;
    font-family: UnicaOne;
    font-size: 20px;
    width: 90px;
    height: 30px;
}

.add {
    /* background-color: #EC5656; */
    background-color: rgba(253, 112, 112, 0);
    border: 0;
    border-radius: 15px;
    font-family: UnicaOne;
    font-size: 20px;
    width: 50px;
    height: 30px;
    background-color: #838383;
}

.colorBtnGrey {
    border-color: #838383;
    color: #fff;
    box-shadow: 0 0 40px 40px #838383 inset, 0 0 0 0 #838383;
}

.colorBtnGrey:hover {
  box-shadow: 0 0 10px 0 #838383 inset, 0 0 10px 4px #838383;
}

.colorBtnRed {
    border-color: #EC5656;
    color: #fff;
    box-shadow: 0 0 40px 40px #EC5656 inset, 0 0 0 0 #EC5656;
}

.colorBtnRed:hover {
  box-shadow: 0 0 10px 0 #EC5656 inset, 0 0 10px 4px #EC5656;
}

.colorBtnGreen {
    border-color: #5bec56;
    color: #fff;
    box-shadow: 0 0 40px 40px #5bec56 inset, 0 0 0 0 #5bec56;
}

.colorBtnGreen:hover {
  box-shadow: 0 0 10px 0 #5bec56 inset, 0 0 10px 4px #5bec56;
}

.third {
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
}

</style>