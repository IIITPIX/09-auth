"use client";

import { register } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";
import { useState } from "react";

export default function SignUpPage() {
  const { isError, setIsError} = useState(false)
  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try { await register({ email: email, password: password }); }
    catch
    
  }
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
}
