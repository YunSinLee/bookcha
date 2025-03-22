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
        @click="goToBookDetail(book.id)"
      >
        <img
          class="book-list__item-cover"
          src="../assets/default-bookcover.jpg"
          :alt="book.title"
        />
        <div class="book-list__item-content">
          <div class="book-list__item-header">
            <h2 class="book-list__item-title">{{ book.title }}</h2>
            <button
              class="book-list__item-edit"
              @click.stop="router.push(`/books/${book.id}/edit`)"
            >
              수정하기
            </button>
          </div>
          <p class="book-list__item-author">by {{ book.author }}</p>
          <div class="book-list__item-rating">
            <span class="rating-stars">{{ getRatingStars(book.rating) }}</span>
          </div>
          <p class="book-list__item-summary">"{{ book.summary }}"</p>
          <p class="book-list__item-note" v-if="book.note">
            {{ book.note }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useBookStore } from "@/stores/book";

const router = useRouter();
const bookStore = useBookStore();

const goToAddBook = () => {
  router.push("/books/new");
};

const goToBookDetail = (id: number) => {
  router.push(`/books/${id}`);
};

const getRatingStars = (rating: number) => {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
};

const formatNote = (note: string) => {
  const maxLength = 200;
  let formattedNote = note.replace(/\n/g, "<br>");

  if (formattedNote.length > maxLength) {
    formattedNote = formattedNote.substring(0, maxLength) + "...";
  }

  return formattedNote;
};
</script>

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
    gap: $spacing-xl;
    grid-template-columns: 1fr;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desktop {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    padding: $spacing-md;
    border-radius: $border-radius;
    background-color: $background-color;
    box-shadow: $shadow-sm;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &-cover {
      width: 100%;
      height: 240px;
      object-fit: cover;
      border-radius: $border-radius-sm;
    }

    @include mobile {
      flex-direction: row;

      &-cover {
        width: 120px;
        height: 160px;
      }
    }

    &-content {
      flex: 1;
    }

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: $spacing-xs;
    }

    &-title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: $spacing-xs;
    }

    &-author {
      color: $text-light-color;
      font-size: $font-size-md;
      margin-bottom: $spacing-sm;
    }

    &-rating {
      margin-bottom: $spacing-sm;

      .rating-stars {
        color: #ffd700;
        font-size: $font-size-lg;
      }
    }

    &-summary {
      font-style: italic;
      color: $text-color;
      margin-bottom: $spacing-md;
      line-height: 1.5;
    }

    &-note {
      color: $text-light-color;
      font-size: $font-size-sm;
      line-height: 1.5;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
    }

    &-edit {
      @include button-base;
      background-color: transparent;
      color: $primary-color;
      padding: $spacing-xs $spacing-sm;
      border: 1px solid $primary-color;
      border-radius: $border-radius-sm;
      white-space: nowrap;

      &:hover {
        background-color: rgba($primary-color, 0.1);
      }
    }
  }
}
</style>
