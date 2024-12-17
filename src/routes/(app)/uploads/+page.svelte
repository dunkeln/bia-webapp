<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import ChatBox from "$lib/components/ChatBox.svelte";
  import { toast } from "svelte-sonner";
  import { uploadFiles } from "$lib/components/uploadService";
  import { onMount } from "svelte";

  import * as Table from "$lib/components/ui/table";
  export let data;
  let { videos } = data;
  let columns = Object.keys(videos[0]);

  let files: FileList | null = null;
  let inputFile: HTMLInputElement;
  let statusUploading = false;

  const filesUploadHandler = async () => {
    if (!files || files.length === 0) {
      toast.error("Please upload files");
      return;
    }

    try {
      const formData = new FormData();
      Array.from(files).forEach((file, _) => {
        formData.append(`videos`, file);
      });

      const response = await uploadFiles(formData);

      if (response.success) {
        toast.success(`${files.length} file(s) uploaded successfully`);

        // Reset file input
        if (inputFile) {
          inputFile.value = "";
          files = null;
        }
      } else {
        toast.error(response.error || "Upload failed");
      }
    } catch (error) {
      toast.error("An error occurred during upload");
      console.error(error);
    } finally {
      statusUploading = false;
    }
  };

  console.log(videos);
  console.log(columns);
</script>

<div class="grid w-full items-center gap-3 p-[1.4rem] grid-cols-[60%_40%]">
  <div class="border-2 rounded-lg shadow-lg">
    <Table.Root>
      <Table.Caption>Uploaded Sessions</Table.Caption>
      <Table.Header>
        <Table.Row>
          {#each columns as column}
            <Table.Head>{column}</Table.Head>
          {/each}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each videos as video}
          <Table.Row>
            {#each columns as column}
              <Table.Cell>{video[column]}</Table.Cell>
            {/each}
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>

  <div class="shadow-lg p-[.8rem] border-2 rounded-lg">
    <Label for="video" class="font-light">Upload Interview Session</Label>
    <Input
      id="video"
      type="file"
      multiple
      accept="video/*"
      bind:this={inputFile}
      on:change={(e) => (files = e.currentTarget.files)}
    />
    <Button
      variant="default"
      on:click={filesUploadHandler}
      disabled={statusUploading}
      class="mt-[.8rem] w-full">Upload</Button
    >
  </div>
</div>
<!-- <ChatBox /> -->
