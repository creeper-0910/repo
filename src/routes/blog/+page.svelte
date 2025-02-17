<script lang="ts">
    import { parseMarkdown } from '$lib/components/markdown';
    import { Card, Spinner} from 'flowbite-svelte';
    import { onMount } from 'svelte';
    type BlogType = {
    href: string;
    title: string;
    date?: string;
    }
    let blogList: BlogType[] = [];
    onMount(async () => {
        const fetchBlog = await fetch("/api/article");
        const parsedBlog = await fetchBlog.json();
        console.log(JSON.stringify(parsedBlog));
        blogList = await Promise.all(parsedBlog.objects.map(async (data) => {
        const articleDate = new Date(data.uploaded);
        console.log(JSON.stringify(articleDate));
        const fetchArticle = await fetch(`/api/article/${data.key}`);
        const fetchText = await fetchArticle.text();
        console.log(JSON.stringify(fetchText));
        const articleTitle = await parseMarkdown(fetchText).title;
        return {
            href: `/article/${data.key}`,
            title: articleTitle,
            date: `${articleDate.getFullYear()}/${articleDate.getMonth()+1}/${articleDate.getDate()} ${articleDate.getHours()}:${articleDate.getMinutes()}`
        };
        }));
        console.log(JSON.stringify(blogList))
    });
</script>

<main>
    <div class="p-8">
        {#if !blogList[0]?.hasOwnProperty("title")}
        <div class = "flex justify-center items-center">
            <Spinner color="gray"/>
        </div>
        {/if}
        <div class="grid gap-2 md:gap-4 grid-cols-1 w-full max-w-full">
            {#each blogList as articleItem}
                <Card href={articleItem.href} class="p-2 sm:p-3 w-full max-w-full">
                    <h5 class="text-2xl font-bold tracking-wider text-gray-900 dark:text-white flex items-center">
                        {articleItem.title}
                    </h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight whitespace-pre-line">{articleItem.date}</p>
                </Card>
            {/each}
    </div>
</main>