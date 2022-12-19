<script setup>
  import { ref } from "vue";
  import { Icon } from "@iconify/vue";
  import { onClickOutside } from "@vueuse/core";
  import { useToast } from "vue-toastification";
  import axios from "@/helpers/axios.js";

  import BaseInput from "@/components/ui/forms/BaseInput.vue";
  import Button from "@/components/ui/buttons/Button.vue";

  const toast = useToast();

  const formData = ref({ name: "" });
  const modalContent = ref(null);
  const show = ref(false);

  // attach event listener to modalContent and close modal on click outside of it.
  onClickOutside(modalContent, () => closeModal());

  // closes the modal and clears the input
  const closeModal = () => {
    show.value = false;
    clearForm();
  };

  // This function resets the formData object
  const clearForm = () => {
    formData.value = { name: "" };
  };

  // Submit the form for validation on the backend to create a new category
  const submit = async () => {
    try {
      await axios.post("/ingredient/category/create/", { ...formData.value });
    } catch (error) {
      console.log(error);
      return;
    }

    toast.success(`Added ${formData.value.name} to list of categories`);
    closeModal();
  };
</script>

<template>
  <button
    class="bg-primary h-10 px-2 rounded text-white"
    @click.prevent="show = !show"
  >
    Add a category
  </button>
  <Teleport to="body">
    <Transition name="modal" :duration="750">
      <div v-if="show">
        <div class="modal-bg">
          <div ref="modalContent" @keyup.esc="closeModal" class="modal-content">
            <div class="modal-header">
              <p class="text-3xl font-bold tracking-wide">
                Create New Category
              </p>

              <tippy content="close" placement="left">
                <Icon
                  icon="clarity:times-circle-line"
                  class="modal-close-icon"
                  @click="closeModal"
                />
              </tippy>
            </div>

            <form @submit.prevent="submit">
              <BaseInput
                label="Name"
                placeholder="eg. Dairy, Fruit & Vegetables"
                v-model="formData.name"
                required
              />
              <Button type="submit" text="Create" />
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .modal-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    background: white;
    position: absolute;
    right: 20px;
    top: 20px;
    bottom: 20px;
    padding: 20px;
    border-radius: 4px;
    z-index: 110;
    @apply md:(min-w-xl);
  }

  .modal-close-icon {
    cursor: pointer;
    width: 25px;
    height: 25px;

    @apply text-error;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .modal-enter-active .modal-bg,
  .modal-leave-active .modal-bg {
    transition: opacity 500ms ease;
  }

  .modal-enter-from .modal-bg,
  .modal-leave-to .modal-bg {
    opacity: 0;
  }

  .modal-enter-active .modal-content,
  .modal-leave-active .modal-content {
    transition-delay: 250ms;
    transition: all 500ms ease-in-out;
  }

  .modal-enter-from .modal-content,
  .modal-leave-to .modal-content {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
