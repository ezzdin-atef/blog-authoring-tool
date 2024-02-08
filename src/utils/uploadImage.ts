export const uploadImage = async (file: File) => {
  const { apiKey } = JSON.parse(
    localStorage.getItem("imgbbSettings") ?? "{}"
  ) as { apiKey: string };
  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", apiKey);
  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data.data.display_url;
};
