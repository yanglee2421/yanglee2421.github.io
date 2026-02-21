<script lang="ts" setup></script>

<template>
  <div class="TeamsLight">
    <header
      class="h-12 border-b p-3 flex justify-start items-center fixed inset-x-0 inset-bs-0"
    >
      <h1 class="title3">header</h1>
    </header>
    <aside class="fixed inset-s-0 inset-bs-0 pbs-12 w-64 h-dvh">
      <nav class="overflow-auto h-full border-e">
        <ul class="h-200">
          <li class="p-3 border-b">
            <RouterLink
              :to="{ name: 'home' }"
              class="text-indigo-500 hover:text-indigo-600 [&.router-link-active]:text-indigo-700 hover:underline"
            >
              <span class="body2">Home</span>
            </RouterLink>
          </li>
          <li class="p-3 border-b">
            <RouterLink
              :to="{ name: 'about' }"
              class="text-indigo-500 hover:text-indigo-600 [&.router-link-active]:text-indigo-700 hover:underline"
            >
              <span class="body2">About</span>
            </RouterLink>
          </li>
          <li v-for="value in 20" :key="value" class="p-3 border-b">
            <span class="body2">{{ value }}</span>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="ps-64 pbs-12 min-h-dvh flex flex-col">
      <div class="p-[var(--spacingHorizontalL)] flex-grow">
        <slot></slot>
      </div>
      <footer class="p-3">
        &copy; 2024 by yanglee2421.github.io. All rights reserved.
      </footer>
    </main>
  </div>
</template>

<style scoped></style>
