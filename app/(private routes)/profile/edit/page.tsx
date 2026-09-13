"use client";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
export default function EditProfile() {
  const userData = useAuthStore((state) => state.user);
  const setUserData = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [userName, setUserName] = useState<string>(userData?.username || "");
  const handleSubmit = async () => {
    try {
      const data = await updateMe({ username: userName });
      setUserData(data);
      router.push("/profile");
    } catch {
      console.log("something went wrong");
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={userData?.avatar as string}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:{userName}</label>
            <input
              id="username"
              type="text"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={css.input}
            />
          </div>

          <p>Email: {userData?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
