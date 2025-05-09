"use client";

import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../components/utilities/firebase'; // Import your firebase.js file
import { v4 as uuidv4 } from 'uuid'; // Install this package: npm install uuid
import DraggableList from '../components/utilities/draggableList';

const AddPictures = ({ label, formId, value, onChange, className }) => {
    const [files, setFiles] = useState([]); // Files selected for upload
    const [uploadProgress, setUploadProgress] = useState([]); // Progress for each file
    const [downloadURLs, setDownloadURLs] = useState([]); // URLs for uploaded files
    const [pictureLink, setPictureLink] = useState(''); // Store the picture link

    useEffect(() => {
        if (value) setDownloadURLs(value);
    }, [value]);

    

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
        setFiles((prev) => [...prev, ...selectedFiles]); // Add new files to the existing array
    };

    // Upload files and update progress
    const handleUpload = () => {
        if (!files.length) {
            alert('Please select files first.');
            return;
        }

        const uploadedURLs = [];
        const progressArray = Array.from(files).map(() => 0); // Initialize progress array
        setUploadProgress(progressArray);

        const uploadPromises = Array.from(files).map((file, index) => {
            const uniqueFileName = `${uuidv4()}_${file.name}`; // Generate unique file name using UUID
            const fileRef = ref(storage, `uploads/${uniqueFileName}`);
            const uploadTask = uploadBytesResumable(fileRef, file);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Update progress
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );

                        // Update the progress array without modifying the state directly
                        progressArray[index] = progress;
                        setUploadProgress([...progressArray]); // Update progress for all files
                    },
                    (error) => {
                        console.error('Error uploading file:', error);
                        alert(`File upload failed for ${file.name}!`);
                        reject(error);
                    },
                    async () => {
                        try {
                            const url = await getDownloadURL(uploadTask.snapshot.ref);
                            uploadedURLs.push(url); // Collect the URLs
                            resolve(); // Mark this file as successfully uploaded
                        } catch (err) {
                            reject(err);
                        }
                    }
                );
            });
        });

        // Wait for all uploads to complete
        Promise.all(uploadPromises)
            .then(() => {
                const updatedURLs = [...downloadURLs, ...uploadedURLs];
                setDownloadURLs(updatedURLs);
                onChange(formId, updatedURLs); // Call onChange with the updated URLs
                alert('All files uploaded successfully!');
            })
            .catch((err) => {
                console.error('Error during upload:', err);
            })
            .finally(() => {
                // Reset files and progress after all uploads are complete
                setFiles([]);
                setUploadProgress([]);
            });
    };


    // Handle the submission of the URL (add to the downloadURLs array)
    const handleLinkSubmit = (event) => {
        event.preventDefault();
        if (pictureLink.trim()) {
            const updatedURLs = [...downloadURLs, pictureLink];
            setDownloadURLs(updatedURLs);
            onChange(formId, updatedURLs); // Call onChange with the updated URLs
            setPictureLink('');
        }
    };

    // Handle input change (update the pictureLink state)
    const handleInputChange = (event) => {
        setPictureLink(event.target.value); // Update the pictureLink with the value typed by the user
    };

    const deleteImage = (indexToDelete) => {
        setDownloadURLs((prevURLs) => {
          const updatedURLs = prevURLs.filter((_, index) => index !== indexToDelete);
          setTimeout(() => {
            onChange(formId, updatedURLs);  // Delayed update to avoid setState during render
          }, 0);
          return updatedURLs;
        });
      };
      
    

    return (
        <div className={`formField ${className || ""}`}>
            <label htmlFor={formId}>{label}</label>
            <div id='imagesSection'>
            {/* File Upload Section */}
            <div id='upload'>

            <div>
            <form onSubmit={handleLinkSubmit}>
                <label htmlFor="add-link">Add Link:</label>
                <input
                    type="text"
                    id="add-link"
                    value={pictureLink}
                    onChange={handleInputChange}
                />
                <br></br>
                <br></br>
                <button type="submit">Add Picture</button>
            </form>
            </div>

            <div>
            <label htmlFor="file-upload">Upload Pictures:</label>
            <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                multiple
            />
            <br></br>
            <br></br>
            <button onClick={handleUpload}>Upload</button>

            {/* Upload Progress Section */}
            {files.length > 0 && (
                <div>
                    <h3>Upload Progress:</h3>
                    <ol>
                        {Array.from(files).map((file, index) => (
                            <li key={file.name}>
                                {file.name}: {uploadProgress[index] || 0}%
                            </li>
                        ))}
                    </ol>
                </div>
            )}
          </div>
            {/* Picture Link Input Section */}
            </div>

            {/* Draggable List of Images or Links */}

            <DraggableList downloadURLs={downloadURLs} setDownloadURLs={setDownloadURLs} deleteImage={deleteImage} onChange={onChange} formId={formId}/>
            </div>

        </div>
    );
};

export default AddPictures;
