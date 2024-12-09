<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import { Video } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<div
  class="app p-[1rem] font-vazirmatn grid grid-cols-[6%_94%] h-[100%] border-2"
>
  <ModeWatcher />
  <header
    class="flex flex-col justify-between items-center gap-[1rem] border-* border-2 rounded-md h-full pt-[1.3rem] pb-[1.3rem] bg-secondary text-secondary-foreground"
  >
    <div class="grid grid-rows gap-[2rem]">
      <Button variant="ghost">
        <Video />
      </Button>
      <div>app2</div>
    </div>
    <div>
      <Button on:click={toggleMode} variant="ghost" size="icon">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
      </Button>
    </div>
  </header>
  <main class="p-[1.3rem] flex-grow justify-center">
    <slot></slot>
  </main>
</div>
