<script lang="ts">
  import {
    createRender,
    createTable,
    Render,
    Subscribe,
  } from "svelte-headless-table";
  import {
    addPagination,
    addHiddenColumns,
    addSelectedRows,
  } from "svelte-headless-table/plugins";
  import {
    videoIds,
    addVideoId,
    removeVideoId,
    clearVideoIds,
  } from "$lib/stores/videoStore";

  import { readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import { ChevronDown } from "lucide-svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { EyeOff } from "lucide-svelte";
  import { Badge } from "$lib/components/ui/badge";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  //  import { Checkbox } from "$lib/components/ui/checkbox";
  //  import type { Writable } from "svelte/store";
  import DatatableActions from "./datatable-actions.svelte";
  import { toast } from "svelte-sonner";
  import DatatableCheckbox from "./datatable-checkbox.svelte";
  import { goto } from "$app/navigation";

  type InterviewData = {
    id: string;
    body_language: number;
    eye_contact_with_interviewers: number;
    confidence: number;
    vocabulary_and_grammar: number;
    engagement_with_interviewers: number;
    leadership_traits: number;
    candidate_gender: string;
    candidate_attire: string;
    native_english_speaker: boolean;
    interview_summary: string;
    overall_score: number;
    five_key_attributes: string;
  };

  export let values: Array<InterviewData>;

  const table = createTable(readable(values), {
    page: addPagination({
      initialPageSize: 2,
    }),
    hide: addHiddenColumns(),
    select: addSelectedRows(),
  });

  // INFO: building table columns
  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: (_, { pluginStates }) => {
        const { allPageRowsSelected } = pluginStates.select;
        return createRender(DatatableCheckbox, {
          checked: allPageRowsSelected,
        });
      },
      cell: ({ row }, { pluginStates }) => {
        const { getRowState } = pluginStates.select;
        const { isSelected } = getRowState(row);

        return createRender(DatatableCheckbox, {
          checked: isSelected,
        });
      },
      plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
    }),
    // table.column({
    //   accessor: ({ candidate_gender }) => candidate_gender,
    //   header: "Gender",
    // }),
    // table.column({
    //   accessor: ({ CandidateInformation }) => CandidateInformation.Attire,
    //   header: "Attire",
    // }),
    // table.column({
    //   accessor: ({ CandidateInformation }) =>
    //     CandidateInformation.NativeEnglishSpeaker ? "Yes" : "No",
    //   header: "Native English Speaker",
    // }),
    // table.column({
    //   accessor: ({ body_language }) => body_language,
    //   header: "Body Language",
    // }),
    // table.column({
    //   accessor: ({ eye_contact_with_interviewers }) =>
    //     eye_contact_with_interviewers,
    //   header: "Eye Contact",
    // }),
    // table.column({
    //   accessor: ({ confidence }) => confidence,
    //   header: "Confidence",
    // }),
    // table.column({
    //   accessor: ({ vocabulary_and_grammar }) => vocabulary_and_grammar,
    //   header: "Proficiency",
    // }),
    // table.column({
    //   accessor: ({ engagement_with_interviewers }) =>
    //     engagement_with_interviewers,
    //   header: "Engagement",
    // }),
    // table.column({
    //   accessor: ({ leadership_traits }) => leadership_traits,
    //   header: "Leadership",
    // }),
    table.column({
      accessor: ({ interview_summary }) => interview_summary,
      header: "Summary",
    }),
    table.column({
      accessor: ({ overall_score }) => overall_score,
      header: "Score",
    }),
    table.column({
      accessor: ({ five_key_attributes }) => five_key_attributes,
      header: "Key Attributes",
    }),
    // INFO: uncomment this once the IDs are incorported to the dataset
    // table.column({
    //   accessor: ({ }) => ,
    //   header: "",
    //   cell: ({ value }) => {
    //     return createRender(DatatableActions, { id: value });
    //   },
    // }),
  ]);

  const {
    headerRows,
    tableAttrs,
    tableBodyAttrs,
    pageRows,
    pluginStates,
    flatColumns,
    rows,
  } = table.createViewModel(columns);

  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  const { hiddenColumnIds } = pluginStates.hide;
  const { selectedDataIds } = pluginStates.select;

  const ids = flatColumns.map((col) => col.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);

  const hidableCols = [
    "Gender",
    "Attire",
    "Key Attributes",
    "Interview Summary",
    "Leadership Traits",
  ];
</script>

<div class="m-[1.4rem]">
  <div class="w-full mb-[.5rem] flex justify-end gap-4">
    <!-- all table control componetns go here -->
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="outline" class="ml-auto" builders={[builder]}>
          <EyeOff />
          <ChevronDown class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {#each flatColumns as col}
          {#if hidableCols.includes(col.id)}
            <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
              {col.header}
            </DropdownMenu.CheckboxItem>
          {/if}
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    <Button
      disabled={Object.keys($selectedDataIds).length === 0}
      on:click={() => {
        let idcs = Object.keys($selectedDataIds);
        let data = idcs.map((idx) => values.at(Number(idx)).id);
        console.info(data);
        $videoIds = data;
        toast.success(`ids selected: ${idcs}`);
        goto("/chat");
      }}>Initiate Chat</Button
    >
  </div>
  <div class="border-2 border-* rounded-xl shadow-* shadow-lg">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row class="p-[.5rem]">
              {#each headerRow.cells as cell}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
                    <Render of={cell.render()} />
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>

      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Table.Row
            {...row.attrs()}
            data-state={$selectedDataIds[row.id] && "selected"}
          >
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs}>
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end pt-[.8rem] pr-[.2rem] gap-4">
    <div class="text-muted-foreground flex-1 text-sm">
      {Object.keys($selectedDataIds).length} of{" "}
      {$rows.length} row(s) selected.
    </div>
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>
