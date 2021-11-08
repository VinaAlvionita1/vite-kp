<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  isFirstPage: { type: Boolean, required: true },
  prevPage: { type: Function, required: true },
  pageList: { type: Array as PropType<Array<number>>, required: true },
  currentPage: { type: Number, required: true },
  gotoPage: { type: Function, required: true },
  isLastPage: { type: Boolean, required: true },
  nextPage: { type: Function, required: true },
})
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ disabled: isFirstPage }">
        <a class="page-link" href="#" @click="prevPage()">&lt;</a>
      </li>
      <li class="page-item" style="display:flex;" v-for="p in pageList" :key="p" :class="{ active: p == currentPage }">
        <a class="page-link" href="#" @click="gotoPage(p)">{{ p }}</a>
      </li>
      <li class="page-item" :class="{ disabled: isLastPage }">
        <a class="page-link" href="#" @click="nextPage()">&gt;</a>
      </li>
    </ul>
  </nav>
</template>