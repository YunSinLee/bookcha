<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentSlide = ref(0);

const slides = [
  {
    title: "당신만의 독서 여정을 기록하세요",
    description:
      "읽은 책들을 기록하고 평가하며 나만의 독서 일지를 만들어보세요.",
  },
  {
    title: "책에 대한 생각을 남기세요",
    description: "인상 깊은 구절과 감상을 기록하고 나만의 서재를 만들어보세요.",
  },
  // 추가 슬라이드...
];

const goToSignup = () => {
  // TODO: 회원가입 페이지로 이동
  router.push("/books");
};
</script>

<template>
  <div class="onboarding">
    <div class="onboarding__slider">
      <div
        class="onboarding__slides"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="onboarding__slide"
        >
          <h2 class="onboarding__title">{{ slide.title }}</h2>
          <p class="onboarding__description">{{ slide.description }}</p>
        </div>
      </div>
    </div>

    <div class="onboarding__controls">
      <div class="onboarding__dots">
        <button
          v-for="(_, index) in slides"
          :key="index"
          class="onboarding__dot"
          :class="{ 'onboarding__dot--active': currentSlide === index }"
          @click="currentSlide = index"
        />
      </div>

      <button class="onboarding__button" @click="goToSignup">
        가입 후 무료 체험하기
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.onboarding {
  &__slider {
    overflow: hidden;
    width: 100%;
  }

  &__slides {
    display: flex;
    transition: transform 0.3s ease;
  }

  &__slide {
    min-width: 100%;
    padding: 2rem;
    text-align: center;
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  &__description {
    color: #666;
  }

  &__controls {
    padding: 2rem;
  }

  &__dots {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ddd;
    margin: 0 0.5rem;
    border: none;
    padding: 0;
    cursor: pointer;

    &--active {
      background: #333;
    }
  }

  &__button {
    width: 100%;
    padding: 1rem;
    background: #42b883;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background: #3aa876;
    }
  }
}
</style>
