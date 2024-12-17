<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { videoIds } from "$lib/stores/videoStore";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import { Send } from "lucide-svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  let usermsg = "";
  let chathistory: Array<{ sender: string; message: string }> = [];
  let ws: WebSocket;

  onMount(() => {
    const payload = {
      video_ids: $videoIds.map(({ id }) => id),
    };

    ws = new WebSocket(
      `ws://54.226.79.143:8445/api/v1/chat?payload=${encodeURIComponent(JSON.stringify(payload))}`,
    );

    ws.onopen = () => {
      console.log("WebSocket connection established");
      toast.success("Connected to chat server!");
    };

    // Event: Message received
    ws.onmessage = (event) => {
      if (event.data === "<EOM>") {
        return;
      }
      const message = event.data.startsWith("GPT: ")
        ? event.data.slice(5)
        : event.data;
      chathistory = [...chathistory, { sender: "bot", message }];
    };

    // Event: Error occurred
    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      toast.error("WebSocket connection error!");
    };

    // Event: Connection closed
    ws.onclose = () => {
      console.log("WebSocket connection closed");
      toast.info("Disconnected from chat server");
    };
  });

  const sendReq = (message: string) => {
    ws.send(message);

    chathistory = [...chathistory, { sender: "user", message }];
    usermsg = "";
  };
</script>

<div class="w-full h-full grid grid-rows-[5%_88%_7%]">
  <div class="flex justify-end space-x-2 p-2 overflow-x-auto mr-[.5rem]">
    {#each $videoIds as videoId}
      <Badge>{videoId.file_name}</Badge>
    {/each}
  </div>

  <!-- Chat History -->
  <div class="flex-grow overflow-auto p-4 space-y-2">
    {#each chathistory as { sender, message }}
      <div class="flex w-full">
        <div
          class="p-2 rounded-lg max-w-[50%] text-white"
          class:bg-primary={sender === "user"}
          class:bg-secondary={sender === "bot"}
          class:text-black={sender === "bot"}
          class:ml-auto={sender === "user"}
          class:mr-auto={sender === "bot"}
        >
          {message}
        </div>
      </div>
    {/each}
  </div>

  <div class="relative w-full pr-[.3rem]">
    <textarea
      class="w-full resize-none border border-gray-300 rounded-lg focus:outline-none"
      bind:value={usermsg}
    ></textarea>
    <div>
      <Button
        variant="ghost"
        class="absolute right-3 bottom-5 p-2 rounded-lg shadow-md hover:bg-*-600"
        disabled={$videoIds.length === 0 || usermsg.length === 0}
        on:click={() => sendReq(usermsg)}><Send /></Button
      >
    </div>
  </div>
</div>
