import { defineStore } from "pinia";
import { ref } from "vue";

export interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  summary: string;
  note?: string;
}

export const useBookStore = defineStore("book", () => {
  const books = ref<Book[]>([]);
  const lastId = ref(0);

  const addBook = (bookData: Omit<Book, "id">) => {
    const newBook: Book = {
      id: ++lastId.value,
      ...bookData,
    };
    books.value.push(newBook);
    return newBook;
  };

  const updateBook = (id: number, bookData: Partial<Omit<Book, "id">>) => {
    const index = books.value.findIndex((book) => book.id === id);
    if (index !== -1) {
      books.value[index] = {
        ...books.value[index],
        ...bookData,
      };
      return books.value[index];
    }
    return null;
  };

  const deleteBook = (id: number) => {
    const index = books.value.findIndex((book) => book.id === id);
    if (index !== -1) {
      books.value.splice(index, 1);
      return true;
    }
    return false;
  };

  const getBook = (id: number) => {
    return books.value.find((book) => book.id === id) || null;
  };

  return {
    books,
    addBook,
    updateBook,
    deleteBook,
    getBook,
  };
});
