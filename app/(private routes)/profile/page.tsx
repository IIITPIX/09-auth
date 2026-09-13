import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "User Profile",
    description: "User Profile where there are avatar, user name and email",
    openGraph: {
      title: "User Profile",
      description: "User Profile where there are avatar, user name and email",
      url: `https://notehub.com/profile`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: "image for Notehub aplication link",
          width: 300,
          height: 300,
        },
      ],
    },
  };
}

export default async function Profile() {
  const data = await getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <img
            src={data.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
        </div>
      </div>
    </main>
  );
}
