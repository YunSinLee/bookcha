<script setup lang="ts">
import { useRouter } from "vue-router";
import { useBookStore } from "@/stores/book";

const router = useRouter();
const bookStore = useBookStore();

const goToAddBook = () => {
  router.push("/books/new");
};

const getRatingStars = (rating: number) => {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
};
</script>

<template>
  <div class="book-list">
    <div class="book-list__header">
      <h1 class="book-list__title">나의 독서 기록</h1>
      <button class="book-list__add-button" @click="goToAddBook">
        책 평가 추가하기
      </button>
    </div>

    <div v-if="bookStore.books.length === 0" class="book-list__empty">
      <p>아직 기록된 책이 없습니다.</p>
      <p>첫 번째 독서 기록을 남겨보세요!</p>
      <button
        class="book-list__add-button book-list__add-button--large"
        @click="goToAddBook"
      >
        책 평가 추가하기
      </button>
    </div>

    <ul v-else class="book-list__items">
      <li
        v-for="book in bookStore.books"
        :key="book.id"
        class="book-list__item"
      >
        <div class="book-list__item-header">
          <h2 class="book-list__item-title">{{ book.title }}</h2>
          <span class="book-form__item-rating">{{
            getRatingStars(book.rating)
          }}</span>
        </div>
        <p class="book-list__item-author">{{ book.author }}</p>
        <p class="book-list__item-summary">{{ book.summary }}</p>
        <p v-if="book.note" class="book-list__item-note">
          {{ book.note }}
        </p>
        <button
          class="book-list__item-edit"
          @click="router.push(`/books/${book.id}/edit`)"
        >
          수정하기
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.book-list {
  padding: $spacing-md;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-lg;
  }

  &__title {
    font-size: $font-size-xl;
    color: $text-color;
  }

  &__add-button {
    @include primary-button;

    &--large {
      padding: $spacing-md $spacing-lg;
      font-size: $font-size-lg;
      margin-top: $spacing-md;
    }
  }

  &__empty {
    @include flex-center;
    flex-direction: column;
    min-height: 60vh;
    text-align: center;
    color: $text-light-color;

    p {
      margin-bottom: $spacing-sm;
    }
  }

  &__items {
    list-style: none;
    display: grid;
    gap: $spacing-md;
    grid-template-columns: 1fr;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desktop {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__item {
    padding: $spacing-md;
    border-radius: $border-radius;
    background-color: $background-color;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: $spacing-xs;
    }

    &-title {
      font-size: $font-size-lg;
      margin-right: $spacing-sm;
    }

    &-rating {
      color: #ffd700;
      white-space: nowrap;
    }

    &-author {
      color: $text-light-color;
      font-size: $font-size-sm;
      margin-bottom: $spacing-sm;
    }

    &-summary {
      margin-bottom: $spacing-sm;
    }

    &-note {
      font-style: italic;
      color: $text-light-color;
      margin-bottom: $spacing-sm;
    }

    &-edit {
      @include button-base;
      background-color: transparent;
      color: $primary-color;
      padding: $spacing-xs;

      &:hover {
        background-color: rgba($primary-color, 0.1);
      }
    }
  }
}
</style>
