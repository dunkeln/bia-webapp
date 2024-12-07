<script lang="ts">
  import { Button } from "./ui/button";
  import { page } from "$app/stores";
  import { base } from "$app/paths";

  $: currentPath = "/" + $page.url.pathname.split("/").pop();

  const isActive = (path: string) =>
    currentPath === path
      ? "no-underline font-bold font-outfit p-[.5rem]"
      : "font-outfit p-[.5rem]";
</script>

<a href="https://dunkeln.github.io" target="_self" class={isActive("/")}>Home</a
>
<a
  href="https://dunkeln.github.io/posts"
  target="_self"
  class={isActive("/posts")}>Posts</a
>
