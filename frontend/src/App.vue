<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: {
    title: 'Nestjs Websockets Chat',
    name: '',
    text: '',
    messages: [],
    socket: null
  },
  methods: {
    sendMessage() {
      if(this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text
        }
        this.socket.emit('msgToServer', message)
        this.text = ''
      }
    },
    receivedMessage(message) {
      this.messages.push(message)
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0
    }
  },
  created() {
    this.socket = io('http://localhost:3001')
    this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
