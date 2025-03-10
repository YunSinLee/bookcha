<style lang="scss" scoped>
.book-form {
  padding: $spacing-md;
  max-width: 600px;
  margin: 0 auto;

  &__header {
    margin-bottom: $spacing-lg;
  }

  &__title {
    font-size: $font-size-xl;
    color: $text-color;
  }

  &__field {
    margin-bottom: $spacing-md;
  }

  &__label {
    display: block;
    margin-bottom: $spacing-xs;
    font-weight: bold;
    color: $text-color;
  }

  &__required {
    color: #ff4444;
    margin-left: $spacing-xs;
  }

  &__input {
    width: 100%;
    padding: $spacing-sm;
    border: 1px solid #ddd;
    border-radius: $border-radius;
    font-size: $font-size-base;

    &--error {
      border-color: #ff4444;
    }

    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }

  &__error {
    display: block;
    color: #ff4444;
    font-size: $font-size-sm;
    margin-top: $spacing-xs;
  }

  &__textarea {
    width: 100%;
    min-height: 100px;
    padding: $spacing-sm;
    border: 1px solid #ddd;
    border-radius: $border-radius;
    resize: vertical;
    font-family: inherit;
    font-size: $font-size-base;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }

  &__rating {
    display: flex;
    gap: $spacing-xs;
  }

  &__star {
    background: none;
    border: none;
    font-size: $font-size-xl;
    color: #ddd;
    cursor: pointer;
    padding: $spacing-xs;
    transition: color 0.2s ease;

    &--active {
      color: #ffd700;
    }

    &:hover {
      color: #ffd700;
    }
  }

  &__actions {
    display: flex;
    gap: $spacing-sm;
    margin-top: $spacing-lg;
  }

  &__button {
    @include button-base;
    flex: 1;

    &--submit {
      @include primary-button;
    }

    &--cancel {
      background-color: #f5f5f5;
      color: $text-color;

      &:hover {
        background-color: #eaeaea;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useBookStore } from "@/stores/book";

interface BookForm {
  title: string;
  author: string;
  rating: number;
  summary: string;
  note: string;
}

const router = useRouter();
const route = useRoute();
const bookStore = useBookStore();

const isEditMode = computed(() => route.params.id !== undefined);

const form = ref<BookForm>({
  title: "",
  author: "",
  rating: 0,
  summary: "",
  note: "",
});

// 수정 모드일 때 기존 데이터 불러오기
onMounted(() => {
  if (isEditMode.value) {
    const bookId = Number(route.params.id);
    const book = bookStore.getBook(bookId);
    if (book) {
      form.value = { ...book };
    } else {
      router.push("/books");
    }
  }
});

const errors = ref<Partial<Record<keyof BookForm, string>>>({});

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!form.value.title.trim()) {
    errors.value.title = "책 제목을 입력해주세요";
    isValid = false;
  }

  if (!form.value.author.trim()) {
    errors.value.author = "저자명을 입력해주세요";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  if (!validateForm()) return;

  if (isEditMode.value) {
    bookStore.updateBook(Number(route.params.id), form.value);
  } else {
    bookStore.addBook(form.value);
  }

  router.push("/books");
};

const handleCancel = () => {
  router.back();
};
</script>

<template>
  <div class="book-form">
    <div class="book-form__header">
      <h1 class="book-form__title">
        {{ isEditMode ? "독서 기록 수정하기" : "새로운 독서 기록" }}
      </h1>
    </div>

    <form @submit.prevent="handleSubmit" class="book-form__form">
      <div class="book-form__field">
        <label class="book-form__label">
          책 제목
          <span class="book-form__required">*</span>
        </label>
        <input
          v-model="form.title"
          type="text"
          class="book-form__input"
          :class="{ 'book-form__input--error': errors.title }"
          placeholder="책 제목을 입력하세요"
        />
        <span v-if="errors.title" class="book-form__error">
          {{ errors.title }}
        </span>
      </div>

      <div class="book-form__field">
        <label class="book-form__label">
          저자
          <span class="book-form__required">*</span>
        </label>
        <input
          v-model="form.author"
          type="text"
          class="book-form__input"
          :class="{ 'book-form__input--error': errors.author }"
          placeholder="저자명을 입력하세요"
        />
        <span v-if="errors.author" class="book-form__error">
          {{ errors.author }}
        </span>
      </div>

      <div class="book-form__field">
        <label class="book-form__label">평점</label>
        <div class="book-form__rating">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            class="book-form__star"
            :class="{ 'book-form__star--active': star <= form.rating }"
            @click="form.rating = star"
          >
            ★
          </button>
        </div>
      </div>

      <div class="book-form__field">
        <label class="book-form__label">한줄평</label>
        <input
          v-model="form.summary"
          type="text"
          class="book-form__input"
          placeholder="한줄평을 입력하세요"
        />
      </div>

      <div class="book-form__field">
        <label class="book-form__label">기타 기록</label>
        <textarea
          v-model="form.note"
          class="book-form__textarea"
          placeholder="추가로 기록하고 싶은 내용을 입력하세요"
        />
      </div>

      <div class="book-form__actions">
        <button
          type="button"
          class="book-form__button book-form__button--cancel"
          @click="handleCancel"
        >
          취소
        </button>
        <button
          type="submit"
          class="book-form__button book-form__button--submit"
        >
          {{ isEditMode ? "수정하기" : "등록하기" }}
        </button>
      </div>
    </form>
  </div>
</template>
