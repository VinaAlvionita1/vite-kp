import { computed, ref } from 'vue'
import { range } from '../services/helpers';
import Api from '../services/api';

export default function usePagination(path: string, limit: number, param?: any) {
  const api = new Api();
  const result = ref<any[]>([]);
  const page = ref(1);
  const start = ref(0);
  const end = ref(0);
  const count = ref(0);
  const pages = ref<number[]>([]);
  const number = ref(0);

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
    number.value = (page.value - 1) * limit;
  }

  async function loadData() {
    const respon = await api.getResource(path, { limit: limit, page: page.value });
    result.value = respon.data;
    generate(respon.last_page, page.value);
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
    page, start, end, count, pages, isFirstPage, isLastPage, result, number,
    loadData, prevPage, gotoPage, nextPage, firstPage, lastPage
  }

}
