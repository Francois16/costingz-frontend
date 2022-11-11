// Helper function to reset the values of an error ref object for forms
export function resetErrors(formErrors) {
  for (const [key, item] of Object.entries(formErrors.value)) {
    formErrors.value[key] = [];
  }
}

export function buildVeeValidateErrorObjectFromResp() {
  const resp = {
    data: {
      errors: [
        {
          attr: "email",
          message: "Invalid email address",
        },
        {
          attr: "email",
          message: "Another email error",
        },
        {
          attr: "password",
          message: "incorrect password",
        },
      ],
    },
  };

  let errors = {};

  resp.data.errors.forEach((error) => {
    if (errors[error.attr] === undefined) {
      errors[error.attr] = [];
    }

    errors[error.attr].push(error.message);
  });

  console.log(errors);
}
