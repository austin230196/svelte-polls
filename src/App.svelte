<script lang="ts">
  import {Nav, Tab, Footer} from "./components";
  import {theme} from "./stores";
  import CreatePoll from "./views/CreatePoll.svelte";
  import Polls from "./views/Polls.svelte";
  import { db } from "./database";

  let tabItems = ["Current Polls", "Create Poll"];
  let activeItem = "Current Polls"


  function updateActiveItem(e: any){
    activeItem = e.detail;
  }

  async function createPollHandler(e: any){
    try{
      const newPoll = e.detail;
      console.log({newPoll});
      await db.polls.add({
        ...newPoll
      });
      activeItem = 'Current Polls';
      // alert("Poll created successfully");
    }catch(e: any){
      console.error(e.message);
    }
  }
</script>

<main id={$theme === 'dark' ? 'dark' : 'light'}>
  <Nav />
  <section>
    <Tab tabs={tabItems} on:updateActiveItem={updateActiveItem} activeTab={activeItem}  />
    <div>
      {#if activeItem === 'Current Polls'}
        <Polls />
      {:else if activeItem === 'Create Poll'}
        <CreatePoll on:createPoll={createPollHandler} />
      {/if}
    </div>
  </section>
  <Footer />
</main>

<style lang="scss">
  main {
    height: 100vh;
    background-color: var(--background);
  }
  section {
    max-width: 1200px;
    margin-inline: auto;
    padding-top: 80px;
  }
  div {
    padding-top: 100px;
    margin-inline: 20px;
  }
</style>
