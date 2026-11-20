import { User } from "@/app/types";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) return null;

    const response = await fetch(`${API_URL}/users/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const user: User = await response.json();

    return user;

  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};