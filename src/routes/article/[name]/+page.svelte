<script lang="ts">
    import { parseMarkdown } from '$lib/components/markdown';
    import { onMount } from 'svelte';
    import type { PageProps } from './$types';
    let articleHTML: string = $state("");
    let { data }: PageProps = $props();
    onMount(async () => {
        const fetchArticle = await fetch(`/api/article/${data.name}`);
        const articleText = await fetchArticle.text();
        articleHTML = (await parseMarkdown(articleText)).html;

    });
</script>
<div class="p-8 text-gray-900 dark:text-white">
    {#if articleHTML !== ""}
        {@html articleHTML}
    {/if}
</div>