<script lang="ts">
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher();

    export let activeTab: string;
    export let tabs: any[];

    function updateActiveItem(item: string){
        dispatch("updateActiveItem", item)
    }
</script>


<div class="tabs">
    {#each tabs as tab (tab)}
        <aside on:click={() => updateActiveItem(tab)} class:active={activeTab === tab}>{tab.toLocaleUpperCase()}</aside>
    {/each}
</div>


<style lang="scss">
    .tabs {
        width: min(100% - 0.25rem, 600px);
        margin-inline: auto;
        display: flex;
        align-items: center;
        gap: 50px;
        position: fixed;
        left:0;
        right:0;
        justify-content: center;
        padding-top: 20px;
        z-index: 100;
        background-color: var(--background);

        > aside {
            // width: 100%;
            text-align: center;
            padding: 10px 20px;
            cursor: pointer;
            color: var(--color);
            transition: all 0.5s ease-out;
            &.active {
                border-bottom: 3px solid var(--primary);
                font-weight: 600;
                color: var(--primary);
            }
        }
    }
</style>