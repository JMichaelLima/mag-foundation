// 'app/contact/page.tsx'
"use client";

import React, { useState, useContext } from "react";
import { quicksand } from "@/app/fonts";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import { ToastContext } from "@/contexts/ToastContext";
import { useUIContext } from "@/contexts/UIContext";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  details: string;
  status?: string;
}

async function submitForm(formData: FormData) {
  // Generate a client instance
  const client = generateClient<Schema>({
    authMode: "iam",
  });

  // Create a new entry in the ContactFormEntry table
  try {
    const { errors, data: newEntry } =
      await client.models.ContactFormEntry.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        telephone: formData.telephone,
        details: formData.details,
        status: "new",
      });

    if (errors) {
      console.error("Submission error:", errors);
      throw new Error("Error submitting form");
    }

    return newEntry;
  } catch (error) {
    console.error("Error in submitForm:", error);
    throw error;
  }
}

export default function ContactPage() {
  const { formSubmitted, setFormSubmitted } = useUIContext();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    details: "",
  });

  const { addToast } = useContext(ToastContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await submitForm(formData);
      addToast({
        messageType: "success",
        message: `Thanks, ${formData.firstName}. The form was submitted successfully and we look forward to speaking with you.`,
      });
      setFormSubmitted(true);
    } catch (error) {
      addToast({
        messageType: "error",
        message: "Form submission failed..",
      });
    }
  };
  return (
    <main className="text-blue-200 pb-28">
      {!formSubmitted && (
        <div className="mt-20 max-w-sm m-auto shadow-sm shadow-sky-300 bg-sky-950 rounded-2xl bg-opacity-50 p-5 pb-8 md:p-10">
          <div
            className={`${quicksand.className} mt-4 text-3xl font-bold text-center text-blue-50 mb-6`}
          >
            Contact Us
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-300"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-blue-950 bg-opacity-80 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-300"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-blue-950 bg-opacity-80 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-blue-950 bg-opacity-80 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-gray-300"
              >
                Telephone Number
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-blue-950 bg-opacity-80 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-300"
              >
                Additional Details
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                value={formData.details}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-blue-950 bg-opacity-80 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Submit
            </button>
          </form>
          
        </div>
      )}
    </main>
  );
}
