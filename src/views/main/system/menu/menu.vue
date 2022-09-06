<template>
  <div class="menu">
    <PageContent :contentTableConfig="contentTableConfig" pageName="menu">

    </PageContent>
  </div>
</template>

<script lang="ts">
import PageContent from '@/components/page-content/src/page-content.vue';
import { defineComponent } from 'vue';
import { contentTableConfig } from './config/content.config';

export default defineComponent({
    name: "myMenu",
    setup() {
        return {
          contentTableConfig
        };
    },
    components: { PageContent }
})
</script>

<style scoped></style>
