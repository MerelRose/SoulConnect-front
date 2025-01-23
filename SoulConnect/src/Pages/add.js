import React, { useState, useEffect } from 'react';

const Author = () => {
    const [authors, setAuthors] = useState([]);
    const [errors, setErrors] = useState([]);

    const fetchAuthor = async () => {
        try {
            const response = await fetch('http://localhost:5000/fotos');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAuthors(data);
        } catch (error) {
            console.error('Error fetching author:', error);
            setErrors((prevErrors) => [...prevErrors, 'Failed to fetch authors. Please try again later.']);
        }
    };

    useEffect(() => {
        fetchAuthor();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Selected file:', file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const fileInput = e.target.querySelector('input[type="file"]');
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        } else {
            setErrors((prevErrors) => [...prevErrors, 'No file selected.']);
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/fotos', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('File uploaded:', data);
            fetchAuthor(); // Refresh the list of authors after upload
        } catch (error) {
            console.error('Error uploading file:', error);
            setErrors((prevErrors) => [...prevErrors, 'Failed to upload file. Please try again later.']);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
            <ul>
                {authors.map((author, index) => (
                    <li key={index}>{author.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Author;
