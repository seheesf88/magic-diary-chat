<template>
  <div class="diary">
    <div v-if="greeting" class="diary__greeting">
      <p>Hi, nice to meet you. I'm Tom. What do you know about the wizarding world?</p>
      <div class="d-flex justify-content-center" @click="startChat">
        <img class="diary__pen" src="../assets/pen.png"/>
      </div>
    </div>
    <div v-else class="diary__chat">
      <div v-if="showResponse" class="diary__chat-response">
        <p class="fade-in">{{ response }}</p>
        <button @click="backToQuestion" class="diary__chat-back-btn">Ask another question</button>
      </div>
      <div v-else>
        <p v-if="sentMessage" class="diary__chat-sent">{{ sentMessage }}</p>
        <div v-else class="diary__chat-question">
          <input v-model="userMessage" class="diary__input" placeholder="Write a question...here" />
          <button v-show="isInputNotEmpty" class="diary__button" @click="sendMessage">Ask</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      userMessage: "",
      sentMessage: "",
      response: "",
      greeting: true,
      isLoading: false,
      showResponse: false
    };
  },
  computed: {
    isInputNotEmpty() {
      return this.userMessage.trim() !== '';
    }
  },
  methods: {
    startChat() {
      this.greeting = false;
    },
    backToQuestion() {
      this.showResponse = false
      this.sentMessage = false
    },
    async sendMessage() {
      try {
        this.isLoading = true
        this.sentMessage = this.userMessage

        const response = await fetch("https://magic-diary-be.onrender.com/ask-openai", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage: this.userMessage,
          }),
        });


        if (response.ok) {
          const data = await response.json()
          this.response = data.openaiResponse

          setTimeout(() => {
            this.showResponse = true;
          }, 3000);

          this.isLoading = false
        } else {
          console.error("Error from backend:", response.statusText);
        }
        this.userMessage = ""
      } catch (error) {
        console.error("Error sending message to backend:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'homemade';
  src: url('~@/assets/fonts/HarryP-MVZ6w.ttf') format('truetype');
}
.diary {
  font-family: 'homemade';
  font-size: 48px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__greeting {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__pen {
    width: 40%;
  }

  &__chat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  &__chat-response {
    width: 60vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  &__chat-sent {
    animation: fadeOut 3s forwards !important;
    transition: opacity 3s;
    opacity: 1;
  }

  &__chat-question {
    width: 60vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  &__input  {
    border: none;
    background-color: inherit;
    padding: 8px 16px;

    &:focus {
      outline: none;
      border: none;
    }
  }

  &__button, &__chat-back-btn {
    background-color: inherit;
    cursor: url('~@/assets/wand.png'), auto !important;
    margin-top: 16px;
    border: 3px solid;
    padding: 0.25em 0.5em;
    box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
  }
}

.fade-in {
  animation: fadeIn 3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-out {
  opacity: 0;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>