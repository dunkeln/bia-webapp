<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import { ChartLine } from "lucide-svelte";
  import { Video } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import Button from "$lib/components/ui/button/button.svelte";
  import { base } from "$app/paths";

  import { Toaster } from "$lib/components/ui/sonner";
  /* INFO:zoom stuff 
   * credentials = f"{client_id}:{client_secret}"

  encoded_credentials = base64.b64encode(credentials.encode()).decode()
  ZOOM_BASE_URL = "https://api.zoom.us/v2"
  def get_access_token(account_id, encoded_creds):
    data = {"grant_type": "account_credentials", 
            "account_id": account_id}
    header = {"Content-Type": "application/x-www-form-urlencoded",
                "Authorization": f"Basic {encoded_creds}"}

    response = requests.post(token_url, data=data, headers=header)
    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        raise Exception(
            f"Failed to get access token: {resp
*/
</script>

<ModeWatcher />
<Toaster />
<div class="app font-vazirmatn grid grid-cols-[5%_95%] h-full">
  <header
    class="flex flex-col justify-between items-center rounded-lg pt-[1.3rem] pb-[1.3rem] m-[.4rem] bg-secondary text-secondary-foreground"
  >
    <div class="grid grid-rows gap-[.5rem]">
      <Button variant="ghost" href={`${base}/uploads`}>
        <Video />
      </Button>
      <Button variant="ghost">
        <ChartLine />
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
  <main>
    <slot></slot>
  </main>
</div>
