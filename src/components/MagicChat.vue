<template>
  <div class="diary">
    <div v-if="!greeting" class="d-flex flex-column justify-content-center align-items-center">
      <p class="h1">Hi, Nice to meet you. I am Tom. What do you know about wizard world</p>
      <div class="d-flex justify-content-center" @click="startChat">
        <img class="diary__pen" src="../assets/pen.png"/>
      </div>
    </div>
    <div v-else>
      <div v-if="!isAsking">
        <p>{{ response }}</p>
      </div>
      <div v-else-if="!isLoading && isAsking">
        <input v-model="userMessage" class="diary__input" placeholder="Write a question...here" />
        <button class="diary__button" @click="sendMessage">Ask</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMessage: "",
      response: "",
      greeting: true,
      isLoading: false,
      isAsking: true
    };
  },
  methods: {
    startChat() {
      this.greeting = false;
    },
    async sendMessage() {
      try {
        this.isLoading = true
        const response = await fetch("http://localhost:3000/ask-openai", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage: this.userMessage,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          this.response = data.openaiResponse;
          this.isLoading = false
        } else {
          console.error("Error from backend:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending message to backend:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.diary {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__pen {
    width: 40%;
  }

  &__input  {
    border: none;
    background-color: inherit;
    font-size: 40px;

    &:focus {
      outline: none;
      border: none;
    }
  }

  &__button {
    border: none;
    background-color: inherit;
    font-size: 40px;
  }
}

</style>
