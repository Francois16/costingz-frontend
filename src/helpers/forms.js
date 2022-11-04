// Helper function to reset the values of an error ref object for forms
export function resetErrors(formErrors) {
  for (const [key, item] of Object.entries(formErrors.value)) {
    formErrors.value[key] = [];
  }
}
