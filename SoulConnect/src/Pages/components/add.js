import React, { useState } from "react";
import axios from "axios";

const UploadAndDisplayImage = () => {
    const user_id = localStorage.getItem("user_id");
    const [API_KEY] = useState("*anker");
    const [selectedImage, setSelectedImage] = useState(null);
    const [allowedTypes] = useState([
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/raw",
    ]);
    const [errors, setErrors] = useState([]);

    const handleImgSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);

        const formData = new FormData();
        formData.append("id", selectedImage ? selectedImage.name : "");
        formData.append("user_id", user_id);
        formData.append("foto", selectedImage);

        try {
            const response = await axios.post("http://localhost:4200/fotos", formData, {
                headers: {
                    "api-key": API_KEY,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("File uploaded successfully:", response.data);
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response.data);
            } else if (error.request) {
                console.error("Error request:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
        }
        localStorage.setItem("foto", URL.createObjectURL(selectedImage));
    };
    const handleImageClick = () => {
        document.getElementById("file").click();
    };

    return (
        <div className="bg-gray-800 flex justify-center items-center p-48">
            <div className="w-full max-w-md bg-grey-500 p-4 flex flex-col items-center justify-center">
                <div
                className="flex justify-center items-center flex-col cursor-pointer"
                    onClick={handleImageClick}
                >
                    {selectedImage ? (
                        <div className="flex justify-center items-center" style={{ width: "250px", height: "150px" }}>
                            <img
                                alt="profile"
                                className="rounded-full border border-white object-cover m-2 hover:bg-gray-700 "
                                src={URL.createObjectURL(selectedImage)}
                                style={{ width: "150px", height: "150px" }}
                            />
                        </div>
                    ) : (
                        <div className="w-40 h-40 rounded-full flex justify-center items-center bg-gray-500 text-white hover:bg-gray-700 "                       >
                            Click to upload
                        </div>
                    )}
                </div>
                <br />
                <form
                    onSubmit={handleImgSubmit}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                    <input
                        id="file"
                        type="file"
                        name="file"
                        className="hidden"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            if (file && allowedTypes.includes(file.type.toLowerCase())) {
                                setSelectedImage(file);
                            } else {
                                setErrors(["File type not allowed"]);
                            }
                        }}
                    />
                    <br />
                    <button
                        type="submit"
                        className="text-black bg-gray-500 rounded-lg bottom-0 w-96 h-10 hover:bg-gray-700"
                    >
                        Submit
                    </button>
                </form>
                {errors.length > 0 && (
                    <div>
                        {errors.map((error, index) => (
                            <p key={index} style={{ color: "red" }}>
                                {error}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadAndDisplayImage;