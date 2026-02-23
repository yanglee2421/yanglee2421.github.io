<script lang="ts" setup></script>

<template>
  <div
    class="TeamsDark min-h-screen bg-(--colorNeutralBackground1) text-(--colorNeutralForeground1)"
  >
    <header
      class="fixed inset-x-0 inset-bs-0 z-20 box-border flex h-12 items-center justify-start border-0 border-b border-solid border-(--colorNeutralStroke1) p-3"
    >
      <h1 class="title3">header</h1>
    </header>
    <aside
      class="fixed inset-s-0 inset-bs-0 z-10 h-dvh w-full bg-(--colorNeutralBackground1) pbs-12 md:block md:w-64"
    >
      <nav
        class="box-border h-full overflow-auto border-0 border-e border-solid border-(--colorNeutralStroke1)"
      >
        <ul class="aside-nav__list h-200">
          <li
            class="border-0 border-b border-solid border-(--colorNeutralStroke1) p-3"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-indigo-500 hover:text-indigo-600 hover:underline [&.router-link-active]:text-indigo-700"
            >
              <span class="body2">Home</span>
            </RouterLink>
          </li>
          <li
            class="border-0 border-b border-solid border-(--colorNeutralStroke1) p-3"
          >
            <RouterLink
              :to="{ name: 'about' }"
              class="text-indigo-500 hover:text-indigo-600 hover:underline [&.router-link-active]:text-indigo-700"
            >
              <span class="body2">About</span>
            </RouterLink>
          </li>
          <li
            v-for="value in 20"
            :key="value"
            class="border-0 border-b border-solid border-(--colorNeutralStroke1) p-3"
          >
            <span class="body2">{{ value }}</span>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="box-border flex min-h-dvh flex-col pbs-12 md:ps-64">
      <div class="grow p-(--spacingHorizontalL)">
        <slot></slot>
      </div>
      <footer class="p-3 text-center">
        &copy; 2024 by yanglee2421.github.io. All rights reserved.
      </footer>
    </main>
  </div>
</template>

<style scoped>
.aside-nav__list {
  padding: 0;
  margin: 0;

  list-style: none;
}
</style>
