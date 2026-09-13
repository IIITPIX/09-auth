"use client";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
export default function EditProfile() {
  const userData = useAuthStore((state) => state.user);
  const setUserData = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const newUserName = formData.get("username") as string;
    try {
      const data = await updateMe({ username: newUserName });
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

        <img
          src={userData?.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:{userData?.username}</label>
            <input
              id="username"
              type="text"
              name="username"
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
