<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import {
    Sun,
    Moon,
    NotebookPenIcon,
    HouseIcon,
    BotMessageSquareIcon,
  } from "lucide-svelte";
  import { Video } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import Button from "$lib/components/ui/button/button.svelte";
  import { base } from "$app/paths";

  import { Toaster } from "$lib/components/ui/sonner";
</script>

<ModeWatcher />
<Toaster />
<div class="app font-vazirmatn grid grid-cols-[5%_95%] h-screen">
  <header
    class="sticky top-0 flex flex-col justify-between items-center rounded-lg pt-[1.3rem] pb-[1.3rem] m-[.4rem] bg-secondary text-secondary-foreground"
  >
    <div class="grid grid-rows gap-[.5rem]">
      <Button variant="ghost" href={`${base}/uploads`}>
        <HouseIcon />
      </Button>
      <Button variant="ghost" href={`${base}/peruse`}>
        <NotebookPenIcon />
      </Button>
      <Button variant="ghost" href={`${base}/chat`}>
        <BotMessageSquareIcon />
      </Button>
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
  <main class="overflow-y-auto">
    <slot></slot>
  </main>
</div>
