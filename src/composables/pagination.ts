import { computed, Ref, ref } from 'vue'
import Api from '../services/api';
import { range } from '../services/helpers';

export default function usePagination(path: string, query: Ref) {
  const page = ref(1);
  const start = ref(0);
  const end = ref(0);
  const count = ref(0);
  const pages = ref<number[]>([]);
  const api: Api = new Api();
  const result = ref<any[]>([]);
  const error = ref<any>();

  function generate(totalItems: number, currentPage?: number) {
    page.value = currentPage || 1;
    count.value = totalItems;
    if (count.value <= 10) {
      start.value = 1;
      end.value = count.value;
    } else {
      if (page.value <= 6) {
        start.value = 1;
        end.value = 10;
      } else if (page.value + 4 >= count.value) {
        start.value = count.value - 9;
        end.value = count.value;
      } else {
        start.value = page.value - 5;
        end.value = page.value + 4;
      }
    }
    pages.value = range(`${start.value},${end.value + 1}`);
  }

  async function loadData() {
    const d = await api.getResource(path + `?page=${page.value}&query=${query.value}`);
    result.value = d.data;
    generate(Math.ceil(d.total / d.per_page), d.current_page);
  }

  const isFirstPage = computed(() => page.value == 1);
  const isLastPage = computed(() => page.value == count.value);

  function firstPage() {
    page.value = 1;
    loadData();
  }
  function prevPage() {
    if (page.value > 1) {
      page.value = page.value - 1;
    }
    loadData();
  }
  function gotoPage(p: number) {
    if (p == page.value) {
      return;
    }
    if (p >= 1 && p <= count.value) {
      page.value = p;
    }
    loadData();
  }
  function nextPage() {
    if (page.value < count.value) {
      page.value = page.value + 1;
    }
    loadData();
  }
  function lastPage() {
    page.value = count.value;
    loadData();
  }

  return {
    page, start, end, count, pages, isFirstPage, isLastPage, result,
    loadData, prevPage, gotoPage, nextPage, firstPage, lastPage
  }

}