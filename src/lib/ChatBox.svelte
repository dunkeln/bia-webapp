<<<<<<< HEAD
<script lang="ts">
  // INFO: refer here https://svelte.dev/playground/e546cc5338114301b3f196180ec0abbb?version=3.57.0
  import { Button } from "$lib/components/ui/button/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Send } from "lucide-svelte";

  const sendReq = (msg: string) => {
    return msg;
  };
</script>

<div class=""></div>
=======
<script>
  import { onMount } from 'svelte';
  import socketIOClient from 'socket.io-client';
=======
>>>>>>> 9029c97 (deleted flask)


<<<<<<< HEAD
  onMount(() => {
    const socket = socketIOClient('http://127.0.0.1:5000'); // Replace with your Flask app's URL

    socket.on('message', (msg) => {
      messages = [...messages, msg];
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });
  });

  function sendMessage() {
    socket.emit('message', newMessage);
    newMessage = '';
  }
</script>

<div>
  <ul>
    {#each messages as message}
      <li>{message}</li>
    {/each}
  </ul>
  <input type="text" bind:value={newMessage} />
  <button on:click={sendMessage}>Send</button>
</div>
>>>>>>> bfd529e (flask)
=======
>>>>>>> 9029c97 (deleted flask)
