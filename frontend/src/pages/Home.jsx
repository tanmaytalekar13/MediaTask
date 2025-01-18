import React, { useState } from "react";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    socialMedia: "",
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("socialMedia", formData.socialMedia);

    // Append each file to the FormData
    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:3000/api/user/submit", {
        method: "POST",
        body: formDataToSend, // Content-Type is automatically set to multipart/form-data
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);

        if (data.isAdmin) {
          // Redirect to admin login if the user is an admin
          window.location.href = "http://localhost:3000/api/admin/login";
        } else {
          alert("Form submitted successfully!");
          console.log("Uploaded image URLs:", data.submission.images);
        }
      } else {
        const error = await response.json();
        console.error("Error submitting form:", error);
        alert("Error submitting form: " + error.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: " + error.message);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-8">
          User Submission Form
        </h2>

        <div className="mb-6">
          <label className="block text-black font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-black font-medium mb-2">
            Social Media Handle:
          </label>
          <input
            type="text"
            name="socialMedia"
            value={formData.socialMedia}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-black font-medium mb-2">
            Upload Images:
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            required
            className="w-full text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="loader border-t-4 border-blue-600 rounded-full w-8 h-8 animate-spin"></div>
          </div>
        )}
        <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        Are you admin?{" "}
        <a
          href="/admin-login"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Login
        </a>
      </p>
    </div>
      </form>
      
    </div>
  );
};

export default Home;
