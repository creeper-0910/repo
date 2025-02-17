<script lang="ts">
    import { onMount } from 'svelte';
    let articleList: string[] = [];
    onMount(async () => {
        const fetchArticle = await fetch("/api/article");
        const parsedArticle = await fetchArticle.json();
        articleList = parsedArticle.objects.map((data) => {
        const articleDate = new Date(data.uploaded)
        return {
            src: `/api/article/${data.key}`,
            date: `${articleDate.getFullYear}/${articleDate.getMonth}/${articleDate.getDay} ${articleDate.getHours}:${articleDate.getMinutes}`
        };
        });
    });
</script>
<div class="p-8 text-gray-900 dark:text-white">
    {@html article}
</div>