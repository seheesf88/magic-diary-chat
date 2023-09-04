<template>
  <div>
    <input v-model="userMessage" placeholder="Ask a question..." />
    <button @click="sendMessage">Send</button>
    <p>{{ response }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMessage: "",
      response: "",
    };
  },
  methods: {
    async sendMessage() {
      try {
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

<style scoped>
/* Add your CSS styles here */
</style>
