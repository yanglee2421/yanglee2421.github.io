<script lang="ts" setup>
import DashboardLayout from "@/components/DashboardLayout.vue";
import HelloWorld from "../components/HelloWorld.vue";
import { useForm } from "@tanstack/vue-form";
import { z } from "zod";

const form = useForm({
  defaultValues: {
    phone: "13733448741",
    password: "",
  },
  validators: {
    onChangeAsync: z.object({
      phone: z.string().min(1, "Phone is required"),
      password: z.string().min(1, "Password is required"),
    }),
  },
});
</script>

<template>
  <DashboardLayout>
    <HelloWorld msg="hello world" />
    <form.Field name="password">
      <template #default="{ field }">
        <input
          type="text"
          :value="field.state.value"
          @input="
            (e) => field.handleChange((e.target as HTMLInputElement).value)
          "
        />
      </template>
    </form.Field>
  </DashboardLayout>
</template>

<style scoped></style>
