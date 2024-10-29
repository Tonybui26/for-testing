"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FoodImageUploader from "@/components/FoodImageUploader";
import FormInput, { FormAreaInput } from "@/components/FormInput";
import uploadToS3BySignedUrl from "@/libs/uploadToS3BySignedUrl";
import { deleteFileFromS3 } from "@/libs/deleteFileFromS3";
import SendingRing from "../SendingRing";

export default function EditItem({ menuId, itemData }) {
  const [photoUploadSignedUrl, setPhotoUploadSignedUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: itemData.title || "",
    price: itemData.price || "",
    description: itemData.description || "",
  });
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const assignSignedUrl = (signedUrl, file) => {
    setPhotoUploadSignedUrl(signedUrl);
    setFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteItem = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(
        `${baseUrl}/api/menu-item/delete/${itemData._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            menuId,
          }),
        },
      );
      if (!res.ok) {
        throw new Error("Failed to delete item");
      }
      // Redirect after successful item delete
      // Navigate back to the Menu page
      router.push(`/${menuId}`);
      //   // After navigating, trigger a refresh to ensure the data is up-to-date
      router.refresh(); // This will re-fetch data on the target page
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const handleSubmitUpdateItem = async (e) => {
    e.preventDefault();
    console.log("formData", formData);

    if (!formData.title || !formData.price) {
      console.log("Title and price are required");
      return;
    }
    setIsSending(true);
    try {
      // First set the updatedPhoto to the current photo
      let updatePhotoUrl = itemData.photo;
      if (photoUploadSignedUrl && file) {
        if (itemData.photo) {
          // Delete the previous photo
          const deletePhotoUrl = itemData.photo;
          console.log("deletePhotoUrl", deletePhotoUrl);

          const res = await deleteFileFromS3(deletePhotoUrl);
          console.log("delete response", res);
        }
        // // Upload the new photo
        const newPhotoUrl = await uploadToS3BySignedUrl({
          signedUrl: photoUploadSignedUrl,
          file,
        });
        // Set the new photo to the updatedPhoto
        updatePhotoUrl = newPhotoUrl;
        console.log("newPhotoUrl", newPhotoUrl);
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      console.log("newPhotoUrl", updatePhotoUrl);
      const res = await fetch(
        `${baseUrl}/api/menu-item/update-data/${itemData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            ...formData, // title, price, description
            photo: updatePhotoUrl,
          }),
        },
      );
      console.log("res", res);

      if (!res.ok) {
        throw new Error("Failed to update item");
      }

      // Redirect after successful item update
      // Navigate back to the Menu page
      router.push(`/${menuId}`);

      // After navigating, trigger a refresh to ensure the data is up-to-date
      router.refresh(); // This will re-fetch data on the target page
    } catch (error) {
      setIsSending(false);
      console.error("Something went wrong:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmitUpdateItem}
      className="flex flex-col gap-4"
      method="post"
    >
      <FoodImageUploader
        getSignedUrl={assignSignedUrl}
        currentImage={itemData.photo}
      />
      <FormInput
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <FormInput
        name="price"
        pattern="^\d*(\.\d{0,2})?$"
        onInput={(e) =>
          (e.target.value = e.target.value.replace(/[^0-9.]/g, ""))
        }
        placeholder="$ Selling Price"
        value={formData.price}
        onChange={handleInputChange}
      />
      <FormAreaInput
        name="description"
        placeholder="Description (Optional)"
        value={formData.description}
        onChange={handleInputChange}
      />
      <Button
        value="Save"
        loadingState={isSending}
        loadingMessage={<SendingRing message="Saving..." />}
      />
      <span
        onClick={handleDeleteItem}
        className="cursor-pointer text-center font-semibold text-gray-400"
      >
        Delete Item
      </span>
    </form>
  );
}
