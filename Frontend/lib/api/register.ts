const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
  team_code?: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/register/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  return data;
};