<script lang="ts">
  import values from "./sample.json";
  import DataTable from "./data-table.svelte";
  import ChatBox from "$lib/components/ChatBox.svelte";
  export let data;
  console.log(data);
</script>

<div>
  <DataTable values={data.videos} />
</div>
