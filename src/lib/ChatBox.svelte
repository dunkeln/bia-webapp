<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Send } from "lucide-svelte";
  import { onMount } from "svelte";

  let userMessage = '';
  let chatHistory = [
    { sender: 'bot', message: 'Hello! How can I assist you today?' }
  ];

  const sendReq = (msg: string) => {
    chatHistory = [...chatHistory, { sender: 'user', message: msg }];
    // Simulate bot response
    setTimeout(() => {
      chatHistory = [...chatHistory, { sender: 'bot', message: `You said: ${msg}` }];
    }, 1000);
    userMessage = ''; // Clear the input field after sending
  };
</script>

<style>
  .container {
    display: flex;
    height: 95%;
    justify-content: space-between;
    border-radius: 20px;
  }

  .main-content {
    flex: 1;
    padding: 20px;
  }

  .side-box {
    width: 300px;
    height: 98%;
    background-color: rgba(185, 191, 240, 0.5);
    padding: 20px;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
  }

  .chatbox {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 20px;
    max-height: 80%;
  }

  .chat-message {
    padding: 8px;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .chat-message.user {
    background-color: #d1f7d1;
    align-self: flex-end;
  }

  .chat-message.bot {
    background-color: #e5e5e5;
    align-self: flex-start;
  }

  .input-area {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .input-area textarea {
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .input-area button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border-radius: 5px;
    border: none;
  }
</style>

<div class="container">
  <div class="main-content">
    <!-- Main content (as before) -->
  </div>

  <div class="side-box">
    <h2>Chatbot</h2>
    <div class="chatbox">
      {#each chatHistory as { sender, message }}
        <div class="chat-message {sender}">
          <strong>{sender === 'bot' ? 'Bot' : 'You'}:</strong> {message}
        </div>
      {/each}
    </div>
    <div class="input-area">
      <Textarea bind:value={userMessage} placeholder="Type your message..." rows="2"/>
      <Button on:click={() => sendReq(userMessage)}><Send /></Button>
    </div>
  </div>
</div>
