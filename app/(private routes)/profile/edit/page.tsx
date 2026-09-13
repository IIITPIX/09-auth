"use client";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { boolean } from "yup";
import { useState } from "react";
export default function EditProfile() {
  const [isError, setIsError] = useState<boolean>(false);
  const userData = useAuthStore((state) => state.user);
  const setUserData = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    try {
      const data = await updateMe({
        username: formData.get("username") as string,
      });
      setUserData(data);
      router.push("/profile");
    } catch {
      setIsError(true);
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {userData && (
          <Image
            src={userData.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              defaultValue={userData?.username}
              className={css.input}
            />
          </div>

          <p>Email:</p>
          <input
            id="email"
            type="text"
            name="email"
            defaultValue={userData?.email}
            className={css.input}
            readOnly
          />

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
          {isError && <p>something went wrong</p>}
        </form>
      </div>
    </main>
  );
}
