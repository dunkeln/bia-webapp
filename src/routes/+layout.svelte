<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import { toggleMode } from "mode-watcher";
  import Button from "$lib/components/ui/button/button.svelte";
  import Menu from "$lib/components/Menu.svelte";

  const asciiArt = `
⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣤⣤⣤⣤⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⣶⠟⠛⠉⠁⠀⠀⠀⠈⠉⠛⢷⣦⡀⠀⠀⠀⠀⠀
⠀⠀⠀⣠⡾⠋⢁⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠉⢻⣦⡀⠀⠀⠀
⠀⢀⣼⠟⠀⠀⠈⠙⠶⡄⠀⠀⠀⠚⢋⣀⣀⣀⣤⣄⠙⣿⡄⠀⠀
⢀⣾⠋⣠⡶⢶⣶⣿⡟⢻⣦⠀⣾⣟⣻⣿⣿⡯⠿⠟⠀⠘⣿⡄⠀
⣼⡏⠀⠙⠛⠛⠛⠛⠛⠛⠋⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠘⣿⡀
⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣇
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿
⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡟
⢸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠒⠛⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠃
⠀⢻⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠃⠀
⠀⠀⠙⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⡿⠋⠀⠀⠀
⠀⠀⠀⠀⠙⠻⢦⣤⣤⣄⣀⣀⣤⣤⣤⣴⣶⠿⠛⠉⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠉���⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
         WHAT YOU WANT?
  `;
  const style = `
    color: #AB4459; /* Bright red */
    font-family: monospace;
    font-size: 16px;
    font-weight: bold;
    background: none;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    padding: 10px;
  `;

  console.log(`%c${asciiArt}`, style);
</script>

<!-- TODO: resolve keyboard events -->

<div class="app p-[1rem] font-vazirmatn">
  <ModeWatcher />
  <header class="flex justify-between items-center gap-[1rem] pr-[1.3rem]">
    <Button
      target="_blank"
      href="https://github.com/dunkeln/"
      class="font-semibold p-[1.3rem]"
      variant="link"
    >
      dunkeln.github.io
    </Button>

    <span class="inline">
      <Menu />
    </span>
  </header>
  <main class="p-[1.3rem] flex-grow justify-center">
    <slot></slot>
  </main>
  <span class="pr-[1.3rem]">
    <Button
      on:click={toggleMode}
      variant="outline"
      size="icon"
      class="fixed bottom-[1.3rem] right-[1.4rem]"
    >
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  </span>
</div>
