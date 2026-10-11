<script lang="ts">
    import Button from "./Button.svelte";

    interface Option {
        value: string;
        label: string;
    }

    interface Props {
        value?: string[];
        options?: Option[];
        [key: string]: unknown;
    }

    let {
        value = $bindable([]),
        options = [],
        ...restProps
    }: Props = $props();
</script>

{#each options as o}
    <Button
        class='mr-1 mb-1'
        variant={value.includes(o.value) ? "default" : "outline"}
        {...restProps}
        onclick={() => {
            if(value.includes(o.value)) value = value.filter(v => v !== o.value)
            else value = [...value, o.value]
        }}
    >
        {o.label}
    </Button>
{/each}
