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
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("socialMedia", formData.socialMedia);

    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/submit`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        // Reset form
        setFormData({
          name: "",
          socialMedia: "",
          images: [],
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Submission failed');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + (error.message || "Something went wrong"));
    } finally {
      setIsLoading(false);
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
