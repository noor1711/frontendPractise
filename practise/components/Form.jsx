import submitForm from "./submitForm";
import React, { useState, useCallback, useEffect } from "react";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  message: "",
};

export default function App() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({}); // Stores field-specific messages
  const [touched, setTouched] = useState({});

  const validate = () => {
    let newErrors = {};
    if (formState.name.length < 3) newErrors.name = "Name must be 3+ chars";
    if (!formState.email.includes("@")) newErrors.email = "Invalid email";
    console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [formState, touched]);
  const handleChange = useCallback((ev) => {
    const { name, value } = ev.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleBlur = useCallback((ev) => {
    const { name } = ev.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleFormSubmit = useCallback((ev) => {
    if (validate()) {
      submitForm(ev);
    }
  }, []);

  return (
    <form
      // Ignore the onSubmit prop, it's used by GFE to
      // intercept the form submit event to check your solution.
      action="https://questions.greatfrontend.com/api/questions/contact-form"
      method="POST"
      onSubmit={handleFormSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      onBlur={handleBlur}
    >
      <label for="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={formState.name}
        aria-invalid={!!errors?.name}
        aria-describedBy={!!errors?.email && "Invalid Name"}
        onChange={handleChange}
      />
      {errors?.name && touched?.name && <span>Wrong name dude</span>}

      <label for="name">Email</label>
      <input
        type="text"
        name="email"
        value={formState.email}
        aria-invalid={!!errors?.email}
        aria-describedBy={!!errors?.email && "Invalid Email"}
        onChange={handleChange}
      />
      {errors?.name && touched?.email && <span>Wrong email dude</span>}

      <label for="name">Message</label>
      <textarea
        type="input"
        name="message"
        value={formState.message}
        onChange={handleChange}
      />
      <button type="submit"> Submit </button>
    </form>
  );
}
