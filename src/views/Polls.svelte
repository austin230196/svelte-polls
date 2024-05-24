<script lang="ts">
    import {slide, scale, fade} from "svelte/transition";
    import {flip} from "svelte/animate";
    import { liveQuery } from "dexie";


    import { db } from "../database";
    import {Poll, SkeletonLoader} from "../components";

    let polls = liveQuery(() => db.polls.toArray());

    async function voteOptionHandler(e: any){
        try{
            console.log({dets: e.detail});
            const {poll, option} = e.detail;
            const hasUpdated = await db.polls.update(poll.id, option === 'a' ? {voteA: poll.voteA + 1} : {voteB: poll.voteB + 1});
            console.log({hasUpdated});
        }catch(e: any){
            console.error(e.message);
        }
    }


    async function deletePollHandler(e: any){
        try{
            const id = e.detail;
            console.log({id});
            const hasDeleted = await db.polls.delete(id);
            console.log({hasDeleted});
        }catch(e: any){
            console.error(e.message);
        }
    }
</script>



<div class="polls" in:fade={{duration:500}}>
    {#if $polls}
        {#each $polls as poll (poll.id)}
            <div  out:scale={{duration:500}} animate:flip={{duration: 500}}>
                <Poll {poll} on:vote={voteOptionHandler} on:delete={deletePollHandler} />
            </div>
        {:else}
            <h2>No polls yet!</h2>
        {/each}
    {:else}
        <div class="loaders">
            {#each {length: 5} as _, i (i)}
                <SkeletonLoader />
            {/each}
        </div>
    {/if}
</div>


<style lang="scss">
    .polls {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 30px;
        gap: 30px;
        > h2 {
            text-align: center;
            color: var(--color);
            margin-top: 20px;
        }
    }
    .loaders {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    @media screen and (max-width: 785px){
        .polls {
            padding-inline: 0px;
            gap: 30px 10px;
        }
    }

    @media screen and (max-width: 660px){
        .polls {
            grid-template-columns: 1fr;
        }
    }
</style>