<script lang="ts" setup></script>

<template>
  <div
    class="TeamsDark bg-[var(--colorNeutralBackground1)] text-[var(--colorNeutralForeground1)] min-h-screen"
  >
    <header
      class="box-border h-12 z-20 border-0 border-b border-solid border-[var(--colorNeutralStroke1)] p-3 flex justify-start items-center fixed inset-x-0 inset-bs-0"
    >
      <h1 class="title3">header</h1>
    </header>
    <aside
      class="fixed z-10 inset-s-0 inset-bs-0 pbs-12 md:w-64 w-full h-dvh md:block bg-[var(--colorNeutralBackground1)]"
    >
      <nav
        class="overflow-auto h-full box-border border-solid border-[var(--colorNeutralStroke1)] border-0 border-e"
      >
        <ul class="h-200 aside-nav__list">
          <li
            class="p-3 border-b border-0 border-solid border-[var(--colorNeutralStroke1)]"
          >
            <RouterLink
              :to="{ name: 'home' }"
              class="text-indigo-500 hover:text-indigo-600 [&.router-link-active]:text-indigo-700 hover:underline"
            >
              <span class="body2">Home</span>
            </RouterLink>
          </li>
          <li
            class="p-3 border-0 border-b border-solid border-[var(--colorNeutralStroke1)]"
          >
            <RouterLink
              :to="{ name: 'about' }"
              class="text-indigo-500 hover:text-indigo-600 [&.router-link-active]:text-indigo-700 hover:underline"
            >
              <span class="body2">About</span>
            </RouterLink>
          </li>
          <li
            v-for="value in 20"
            :key="value"
            class="p-3 border-0 border-b border-solid border-[var(--colorNeutralStroke1)]"
          >
            <span class="body2">{{ value }}</span>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="md:ps-64 pbs-12 min-h-dvh flex flex-col box-border">
      <div class="p-[var(--spacingHorizontalL)] flex-grow">
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
