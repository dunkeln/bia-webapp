<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import { toast } from "svelte-sonner";
  import { uploadFiles } from "$lib/components/uploadService";

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
</script>

<div class="grid w-full max-w-sm items-center gap-1.5 p-[1.4rem]">
  <Label for="video">Upload Call</Label>
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
    disabled={statusUploading}>Upload</Button
  >
</div>
