function validateSkillsForm(data) {
  if (!data.name || !data.category_id) {
    return {
      success: false,
      error: "Fields are required",
    };
  }
  return {
    success: true,
    data: data,
  };
}

function validateCategoriesForm(data) {
  if (!data.name) {
    return {
      success: false,
      error: "Fields are required",
    };
  }
  return {
    success: true,
    data: data,
  };
}

function validateResourcesForm(data) {
  if (
    !data.skill_id ||
    !data.title ||
    !data.url ||
    !data.format ||
    !data.difficulty
  ) {
    return {
      success: false,
      error: "Fields are required",
    };
  }
  return {
    success: true,
    data: data,
  };
}

function validateGoalsForm(data) {
  if (!data.skill_id || !data.target_date || !data.note) {
    return {
      success: false,
      error: "Fields are required",
    };
  }
  return {
    success: true,
    data: data,
  };
}

function validateUsersRegisterForm(data) {
  if (!data.name || !data.email || !data.password || !data.confirmPassword) {
    return {
      success: false,
      error: "Fields are required",
    };
  }
  return {
    success: true,
    data: data,
  };
}

function validateUsersLoginForm(data) {
  if (!data.email || !data.password) {
    return {
      success: false,
      error: "Fields are required",
    };
  }
  return {
    success: true,
    data: data,
  };
}

export {
  validateSkillsForm,
  validateCategoriesForm,
  validateResourcesForm,
  validateGoalsForm,
  validateUsersRegisterForm,
  validateUsersLoginForm,
};
