// src/lib/stores/videoStore.ts
import { writable } from 'svelte/store';

// Create a writable store for video IDs
export const videoIds = writable<string[]>([]);

// Function to add a new video ID
export const addVideoId = (id: string) => {
  videoIds.update((ids) => [...ids, id]);
};

// Function to remove a video ID
export const removeVideoId = (id: string) => {
  videoIds.update((ids) => ids.filter((videoId) => videoId !== id));
};

// Function to clear all video IDs
export const clearVideoIds = () => {
  videoIds.set([]);
};
