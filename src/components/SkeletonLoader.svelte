<script lang="ts">
    import {Skeleton} from "svelte-loading-skeleton";

    export let width: number = 100;
    export let height: number = 300;
</script>


<Skeleton
    width={`${width}%`}
    height={`${height}px`}
    borderRadius="8px"
    baseColor="var(--bg-header)" 
    highlightColor="var(--shadow)" 
    animationLength="1.2s"
/>