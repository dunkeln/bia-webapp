<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Linkedin, Github, Twitter, Mail } from "lucide-svelte";
</script>

<Button variant="ghost" href="https://www.github.com/dunkeln" target="_blank">
  <Github />
</Button>

<Button
  variant="ghost"
  href="https://www.linkedin.com/in/prateek-pravanjan"
  target="_blank"
>
  <Linkedin />
</Button>

<Button variant="ghost" href="https://www.x.com/_dunkeln" target="_blank">
  <Twitter />
</Button>

<Tooltip.Root openDelay={1}>
  <Tooltip.Trigger asChild let:builder>
    <Button variant="ghost" builders={[builder]}>
      <Mail />
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content side="right">
    <a href="mailto:example@example.com" target="_blank" class="block p-[.7rem]"
      >Native App</a
    >
    <a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=prateekpravanjan@gmail.com&su="
      target="_blank"
      class="block p-[.7rem]">Gmail</a
    >
    <a
      href="https://outlook.office.com/mail/deeplink/compose?to=example@example.com&subject="
      target="_blank"
      class="block p-[.7rem]">Outlook</a
    >
  </Tooltip.Content>
</Tooltip.Root>
