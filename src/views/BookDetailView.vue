<template>
  <div class="book-detail">
    <div class="book-detail__header">
      <button type="button" class="book-detail__back" @click="handleBack">
        ← 뒤로
      </button>
      <h1 class="book-detail__title">{{ book?.title }}</h1>
      <button
        class="book-detail__edit"
        @click="router.push(`/books/${bookId}/edit`)"
      >
        수정하기
      </button>
    </div>

    <div v-if="book" class="book-detail__content">
      <img
        class="book-detail__cover"
        src="../assets/default-bookcover.jpg"
        :alt="book.title"
      />
      <div class="book-detail__info">
        <p class="book-detail__author">by {{ book.author }}</p>
        <div class="book-detail__rating">
          <span class="rating-stars">{{ getRatingStars(book.rating) }}</span>
        </div>
        <p class="book-detail__summary" v-if="book.summary">
          "{{ book.summary }}"
        </p>
        <div class="book-detail__note" v-if="book.note">
          <h3 class="book-detail__note-title">기타 기록</h3>
          <p class="book-detail__note-content">{{ book.note }}</p>
        </div>
      </div>
    </div>
    <div v-else class="book-detail__not-found">
      <p>책을 찾을 수 없습니다.</p>
      <button class="book-detail__back-to-list" @click="router.push('/books')">
        목록으로 돌아가기
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useBookStore } from "@/stores/book";

const router = useRouter();
const route = useRoute();
const bookStore = useBookStore();

const bookId = Number(route.params.id);
const book = bookStore.getBook(bookId);

const getRatingStars = (rating: number) => {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
};

const handleBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.book-detail {
  padding: $spacing-md;
  max-width: 60rem;
  margin: 0 auto;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-lg;
    position: relative;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: bold;
    color: $text-color;
    text-align: center;
    flex: 1;
  }

  &__back {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    font-size: $font-size-lg;
    color: $primary-color;
    cursor: pointer;
    padding: $spacing-xs;
  }

  &__edit {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    @include button-base;
    background-color: transparent;
    color: $primary-color;
    border: 1px solid $primary-color;
    border-radius: $border-radius-sm;
    padding: $spacing-xs $spacing-sm;

    &:hover {
      background-color: rgba($primary-color, 0.1);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    margin-top: $spacing-lg;

    @include tablet {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__cover {
    width: 100%;
    max-width: 300px;
    height: auto;
    object-fit: cover;
    border-radius: $border-radius;
    margin: 0 auto;

    @include tablet {
      margin: 0;
    }
  }

  &__info {
    flex: 1;
  }

  &__author {
    color: $text-light-color;
    font-size: $font-size-md;
    margin-bottom: $spacing-sm;
  }

  &__rating {
    margin-bottom: $spacing-md;

    .rating-stars {
      color: #ffd700;
      font-size: $font-size-xl;
    }
  }

  &__summary {
    font-style: italic;
    color: $text-color;
    margin-bottom: $spacing-lg;
    line-height: 1.5;
    font-size: $font-size-lg;
  }

  &__note {
    margin-top: $spacing-lg;
    padding-top: $spacing-md;
    border-top: 1px solid #eee;

    &-title {
      font-size: $font-size-lg;
      font-weight: bold;
      margin-bottom: $spacing-sm;
      color: $text-color;
    }

    &-content {
      color: $text-color;
      font-size: $font-size-md;
      line-height: 1.6;
      white-space: pre-wrap;
    }
  }

  &__not-found {
    text-align: center;
    margin-top: $spacing-xl;
    color: $text-light-color;

    p {
      margin-bottom: $spacing-md;
      font-size: $font-size-lg;
    }
  }

  &__back-to-list {
    @include primary-button;
    padding: $spacing-sm $spacing-md;
  }
}
</style>
