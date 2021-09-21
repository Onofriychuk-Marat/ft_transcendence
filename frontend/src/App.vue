<template>
  <div class="chat">
  <button
        class="btn"
        @click="initUser"
    >Init</button>
    <div class="chat-users collection">
        <a
          class="collection-item"
          v-for="conversation in conversations"
          @click="clickConversation(conversation)"
          v-bind:key="conversation">
            {{conversation.name}}
        </a>
        <div class="input-field">
          <input
              type="text"
              placeholder="jwt"
              v-model.trim="jwt"
              autofocus
              autocomplete="false"
              @keydown.enter="entrance"
          >
        </div>
    </div>
            <div class="chat-messages" ref="messages">
            <!-- <chat-message
                v-for="(m, idx) in messages"
                :message="m"
                :key="idx"
            ></chat-message> -->
            <a class="message"
            v-for="message in messages"
        >
            {{message}}
        </a>
        </div>
  </div>
  <div class="actions">
    <div class="input-field">
        <input
            type="text"
            placeholder="Type your message..."
            v-model.trim="text"
            autofocus
            autocomplete="false"
            @keydown.enter="sendMessage"
        >
    </div>
    <button
        class="btn"
        @click="sendMessage"
    >Send</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      title: 'Nestjs Websockets Chat',
      name: '',
      text: '',
      chatId: '',
      jwt: '',
      messages: [],
      socket: null,
      conversations: [],
      selectChat: undefined,
      profile: undefined,
      flagInit: false
    }
  },
  methods: {
        initUser() {
          this.$socket.emit('init', this.jwt)
          this.sockets.subscribe('init', response => {
            console.log('INIT')
            if (response.status === 'success' && this.flagInit === false) {
              this.flagInit = true
              this.initializeConnection()
            }
          })
        },
        entrance() {
          this.getConversations()
          this.getProfile()
        },
        clickConversation(conversation) {
          this.selectChat = conversation.id
          this.$socket.emit('joinInChat', {
            jwt: this.jwt,
            chatId: conversation.id
          })
          console.log('join in chat: ', conversation.id);
        },
        joinInChat() {
          if (this.chatId === '' || this.jwt === '') {
            return;
          }
          this.$socket.emit('joinInChat', {
            jwt: this.jwt,
            chatId: this.chatId
          })
          this.getConversations()
          this.getProfile()
        },
        sendMessage() {
          console.log('sendMessage')
          console.log(this.validateInput() === false)
          console.log(this.selectChat === '')
          console.log(this.jwt === '')
          if (this.validateInput() === false || this.selectChat === '' || this.jwt === '') {
            return;
          }
          console.log('go sendMessage')
          const message = {
            userId: this.profile.id,
            chatId: this.selectChat,
            text: this.text
          }
          this.$socket.emit('msgToServer', message)
          this.text = ''
        },
        receivedMessage(message) {
            this.messages.push(message)
        },
        validateInput() {
            return this.text.length > 0
        },
        initializeConnection() {
          console.log('initializeConnection')
          // this.sockets.subscribe('message:new', message => {
          //   this.messages.push(message)
          // })

          this.sockets.subscribe('openingChatForUser', chat => {
            chat.messages.map(message => {
              this.messages.push(message.text)
            })
          })
          this.sockets.subscribe('msgToClient', message => {
            console.log('msgToClient: ', message)
            this.messages.push(message.text)
          })
        },
        getProfile() {
          axios('/api/user/profile', {
          method: 'get',
          headers: {
              'Authorization': 'Token ' + this.jwt
            }
          }).then(response => {
            this.profile = response.data.profile
            console.log('profile', this.profile)
          }).catch(error => {
            console.log('error send /api/user/profile', error)
          })
        },
        getConversations() {
          axios('/api/chats/conversations', {
          method: 'get',
          headers: {
              'Authorization': 'Token ' + this.jwt
            }
          }).then(response => {
            console.log('>>>> ', response)
            this.conversations = []
            response.data.chats.map(conversation => {
              this.conversations.push(conversation)
            })
            console.log(this.conversations[0])
          }).catch(error => {
            console.log('error: ', error)
          })
        }
    },
    sockets: {
      connect: function () {
          console.log('socket connected')
      },
      customEmit: function (data) {
          console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)' + data)
      },
  },
  created() {

  },
  mounted() {
    // this.$socket.emit('init', this.jwt)
    // this.sockets.subscribe('init', response => {
    //   console.log('INIT')
    //   if (response.status === 'success' && this.flagInit === false) {
    //     this.flagInit = true
    //     this.initializeConnection()
    //   }
    // })
  },
  components: {}
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
html, body {
    margin: 0;
    padding: 0;
    font-family: "Roboto";
}

.auth {
    display: flex;
    padding-top: 50px;
    justify-content: center;
}

.auth .card {
    width: 400px;
}

.chat {
    display: flex;
    height: 70vh;
    width: 100%;
}

.chat-users {
    width: 300px;
    border: 1px solid #e0e0e0;
    margin: 0;
}

.actions {
    border: 1px solid #e0e0e0;
    height: 30vh;
    padding: 20px;
}

.chat-messages {
    border: 1px solid #e0e0e0;
    width: 100%;
    padding: 15px;
    overflow-y: auto;
}

.message {
    display: flex;
}

.message-content {
    border-radius: 3px;
    padding: 6px 9px;
    font-size: 14px;
    margin-bottom: 10px;
    max-width: 250px;
}

.message.owner {
    justify-content: flex-end;
}

.message.owner .message-content {
    color: #fff;
    background: #26a69a;
}
</style>
