import { writable } from "svelte/store";
import { PUBLIC_URL } from "$env/static/public";

export const socket = writable<WebSocket | null>(null);
export const messages = writable<string[]>([]);

export function connectWebSocket(url: string) {
  const ws = new WebSocket(`${PUBLIC_URL}/`);

  ws.onmessage = (event) => {
    const data = event.data;
    messages.update((msgs) => [...msgs, `Server: ${data}`]);
  };

  ws.onopen = () => {
    console.log("WebSocket connected!");
  };

  ws.onclose = () => {
    console.log("WebSocket disconnected.");
  };

  socket.set(ws);
}

export function sendMessage(message: string) {
  socket.update((ws) => {
    if (ws) {
      ws.send(message);
      messages.update((msgs) => [...msgs, `You: ${message}`]);
    }
    return ws;
  });
}

