<template>
  <div class="book-form">
    <div class="book-form__header">
      <button type="button" class="book-form__back" @click="handleBack">
        ← 뒤로
      </button>
      <h1 class="book-form__title">기록 추가</h1>
    </div>

    <form @submit.prevent="handleSubmit">
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
          placeholder="책 제목을 입력해주세요"
        />
        <span v-if="errors.title" class="book-form__error">{{
          errors.title
        }}</span>
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
          placeholder="저자명을 입력해주세요"
        />
        <span v-if="errors.author" class="book-form__error">{{
          errors.author
        }}</span>
      </div>

      <div class="book-form__field">
        <label class="book-form__label">
          평점
          <span class="book-form__required">*</span>
        </label>
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
        <span v-if="errors.rating" class="book-form__error">{{
          errors.rating
        }}</span>
      </div>

      <div class="book-form__field">
        <label class="book-form__label">한줄평</label>
        <input v-model="form.summary" type="text" class="book-form__input" />
      </div>

      <div class="book-form__field">
        <label class="book-form__label">기타 기록</label>
        <textarea v-model="form.note" class="book-form__textarea" />
      </div>

      <div class="book-form__actions">
        <button type="submit" class="book-form__button">등록</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
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

const initialForm = {
  title: "",
  author: "",
  rating: 0,
  summary: "",
  note: "",
};

const form = ref<BookForm>({ ...initialForm });
const isFormDirty = ref(false);

// form 값이 변경될 때마다 isFormDirty 업데이트
watch(
  form,
  () => {
    isFormDirty.value = hasFormChanged();
  },
  { deep: true }
);

// 폼 데이터가 변경되었는지 확인하는 함수
const hasFormChanged = () => {
  if (isEditMode.value) {
    const book = bookStore.getBook(Number(route.params.id));
    if (!book) return false;
    return JSON.stringify(book) !== JSON.stringify(form.value);
  }

  return (
    form.value.title !== "" ||
    form.value.author !== "" ||
    form.value.rating !== 0 ||
    form.value.summary !== "" ||
    form.value.note !== ""
  );
};

onMounted(() => {
  if (isEditMode.value) {
    const bookId = Number(route.params.id);
    const book = bookStore.getBook(bookId);
    if (book) {
      form.value = {
        ...book,
        note: book.note || "",
      };
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

  if (form.value.rating === 0) {
    errors.value.rating = "평점을 선택해주세요";
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

const handleBack = () => {
  if (isFormDirty.value) {
    if (confirm("작성 중인 내용이 있습니다. 정말 나가시겠습니까?")) {
      router.back();
    }
  } else {
    router.back();
  }
};
</script>

<style lang="scss" scoped>
.book-form {
  padding: $spacing-md;
  max-width: 60rem;
  margin: 0 auto;

  &__header {
    margin-bottom: $spacing-lg;
    text-align: center;
    position: relative;
  }

  &__back {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: unset;
    font-size: 1.4rem;
    color: #4285f4;
    cursor: pointer;
    padding: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border: 1px solid #4285f4;
    border-radius: 0.4rem;

    &:hover {
      color: #000;
    }
  }

  &__title {
    font-size: 2rem;
    font-weight: 500;
    color: #000;
    margin-bottom: 1.2rem;
  }

  &__field {
    margin-bottom: $spacing-lg;
  }

  &__label {
    display: block;
    margin-bottom: $spacing-sm;
    font-size: 1.6rem;
    color: #000;
  }

  &__input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    line-height: 2.4rem;

    &:focus {
      outline: none;
      border-color: #4285f4;
    }

    &--error {
      border-color: #ff4444;
      background-color: #fff8f8;
    }

    &::placeholder {
      color: #999;
    }
  }

  &__rating {
    display: flex;
    gap: $spacing-xs;
  }

  &__star {
    background: none;
    border: none;
    font-size: 2.8rem;
    color: #ddd;
    cursor: pointer;
    padding: $spacing-xs;

    &--active {
      color: #ffd700;
    }
  }

  &__textarea {
    width: 100%;
    min-height: 10rem;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 0.4rem;
    resize: vertical;
    font-family: inherit;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }

  &__button {
    width: 100%;
    padding: 1.2rem;
    font-size: 1.6rem;
    border: none;
    border-radius: 0.4rem;
    background-color: #4285f4;
    color: white;
    cursor: pointer;
    margin-top: 1.6rem;

    &:hover {
      background-color: darken(#4285f4, 5%);
    }
  }

  &__required {
    color: #ff4444;
    margin-left: 0.4rem;
    font-size: 1.6rem;
  }

  &__error {
    display: block;
    color: #ff4444;
    font-size: 1.2rem;
    margin-top: 0.4rem;
  }

  &__actions {
    margin-top: $spacing-lg;
  }
}
</style>
