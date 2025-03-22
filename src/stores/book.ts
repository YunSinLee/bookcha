import { defineStore } from "pinia";
import { ref, watch } from "vue";

export interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  summary: string;
  note?: string;
}

export const useBookStore = defineStore("book", () => {
  // localStorage에서 데이터 불러오기
  const loadBooksFromStorage = (): Book[] => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  };

  const books = ref<Book[]>(loadBooksFromStorage());

  // books가 변경될 때마다 localStorage에 저장
  watch(
    books,
    (newBooks) => {
      localStorage.setItem("books", JSON.stringify(newBooks));
    },
    { deep: true }
  );

  // 새 책 추가
  const addBook = (book: Omit<Book, "id">) => {
    const newId =
      books.value.length > 0
        ? Math.max(...books.value.map((b) => b.id)) + 1
        : 1;

    books.value.push({
      ...book,
      id: newId,
    });
  };

  // 책 업데이트
  const updateBook = (id: number, updatedBook: Omit<Book, "id">) => {
    const index = books.value.findIndex((book) => book.id === id);
    if (index !== -1) {
      books.value[index] = { ...updatedBook, id };
    }
  };

  // 책 삭제
  const deleteBook = (id: number) => {
    books.value = books.value.filter((book) => book.id !== id);
  };

  // ID로 책 찾기
  const getBook = (id: number) => {
    return books.value.find((book) => book.id === id);
  };

  return {
    books,
    addBook,
    updateBook,
    deleteBook,
    getBook,
  };
});
