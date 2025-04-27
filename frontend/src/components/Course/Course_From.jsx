// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../css/Course/Course_From.css";

// function Course_Form({ onCourseCreated }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [content, setContent] = useState([]);
//   const [errors, setErrors] = useState({});
//   const Token = localStorage.getItem("userToken");

//   // Check content array every time it changes
//   useEffect(() => {
//     console.log("Content updated:", content);
//   }, [content]);

//   // Validate the form
//   const validateForm = () => {
//     const newErrors = {};

//     if (!title.trim()) newErrors.title = "Title is required.";
//     if (!description.trim()) newErrors.description = "Description is required.";

//     const contentErrors = content.map((item, index) => {
//       if (item.text && item.text.trim() === "") {
//         return `Content ${index + 1} is required.`;
//       }
//       if (item.file && !item.file.name) {
//         return `Image ${index + 1} is required.`;
//       }
//       return null;
//     });

//     if (contentErrors.some(Boolean)) {
//       newErrors.content = contentErrors;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Submitted");
//     console.log("Content Before Submit:", content); // Debug: Log content before submission

//     if (!validateForm()) return;

//     if (!Token) {
//       alert("You must be logged in to create a course.");
//       return;
//     }

//     try {
//       // Prepare FormData
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("createdBy", "USER1");

//       // Add content to formData
//       content.forEach((item, index) => {
//         console.log("Appending content to formData", item); // Debug: Log each content item
//         if (item.text) {
//           formData.append(`content[${index}][text]`, item.text); // Correct the format
//         }
//         if (item.file) {
//           formData.append(`content[${index}][file]`, item.file); // Correct the format
//         }
//       });

//       // Log the form data before sending
//       for (let [key, value] of formData.entries()) {
//         console.log(`${key}: ${value}`);
//       }

//       // Send POST request with Axios
//       const response = await axios.post(
//         "http://localhost:8080/courses",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${Token}`,
//           },
//         }
//       );

//       console.log("Course created:", response.data);

//       // Reset form after success
//       setTitle("");
//       setDescription("");
//       setContent([]);
//       setErrors({});

//       // Notify parent component of course creation
//       if (onCourseCreated) {
//         onCourseCreated();
//       }
//     } catch (error) {
//       console.error("Course creation failed:", error);
//       if (error.response && error.response.data) {
//         setErrors({
//           ...errors,
//           general:
//             error.response.data.message ||
//             "An error occurred while creating the course.",
//         });
//       }
//     }
//   };

//   const addTextContent = () => {
//     setContent((prevContent) => [...prevContent, { text: "", file: null }]);
//   };

//   const addImageContent = () => {
//     setContent((prevContent) => [...prevContent, { text: "", file: null }]);
//   };

//   const handleContentChange = (index, value) => {
//     const updatedContent = [...content];
//     updatedContent[index].text = value;
//     setContent(updatedContent);
//   };

//   const handleFileChange = (index, file) => {
//     const updatedContent = [...content];
//     updatedContent[index].file = file;
//     setContent(updatedContent);
//   };

//   return (
//     <div id="container">
//       <form id="courseForm" onSubmit={handleSubmit}>
//         <div id="image-section">
//           <h3 id="heading">Create Your Course</h3>
//           <div id="imageRow">
//             <img
//               id="image1"
//               src="https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png"
//               alt="Course Example"
//             />
//             <img
//               id="image2"
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfz2XW-jS33OK4UkXXnB8LO2UegzmPl00Ew&s"
//               alt="Course Example"
//             />
//           </div>
//         </div>

//         <h3 id="heading">Course Topic</h3>
//         <input
//           id="courseTitle"
//           type="text"
//           placeholder="Enter Course Title Here"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         {errors.title && <p className="error">{errors.title}</p>}

//         <h3 id="heading">Course Description</h3>
//         <textarea
//           id="courseDescription"
//           placeholder="Enter Course Description Here"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         {errors.description && <p className="error">{errors.description}</p>}

//         <div id="contentRow">
//           <h3 id="heading">Course Content</h3>
//           <button type="button" className="add-c-btn" onClick={addTextContent}>
//             + Add Text
//           </button>
//           <button
//             className="add-i-btn"
//             type="button"
//             onClick={addImageContent}
//             style={{ marginLeft: "10px" }}
//           >
//             + Add Image
//           </button>
//         </div>

//         {content.map((item, index) => (
//           <div key={index} style={{ marginBottom: "20px" }}>
//             {item.text !== undefined && (
//               <input
//                 id="contentInput"
//                 type="text"
//                 placeholder={`Add Content Here ${index + 1}`}
//                 value={item.text}
//                 onChange={(e) => handleContentChange(index, e.target.value)}
//               />
//             )}

//             {item.file !== undefined && (
//               <>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(index, e.target.files[0])}
//                 />
//                 {item.file && (
//                   <img
//                     src={URL.createObjectURL(item.file)}
//                     alt={`preview-${index}`}
//                     style={{ width: "100px", marginTop: "10px" }}
//                   />
//                 )}
//               </>
//             )}

//             {errors.content && errors.content[index] && (
//               <p className="error">{errors.content[index]}</p>
//             )}
//           </div>
//         ))}

//         <button id="publishButton" type="submit">
//           Publish Course
//         </button>

//         {errors.general && <p className="error">{errors.general}</p>}
//       </form>
//     </div>
//   );
// }

// export default Course_Form;
// src/CreateCourseForm.jsx
import { useState } from 'react';
import axios from 'axios';

function CreateCourseForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [createdBy, setCreatedBy] = useState('Admin');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('createdBy', createdBy);
    formData.append('contentTexts', content);

    if (image) {
      formData.append('contentFiles', image); // Append the image file
    }

    try {
      const response = await axios.post('http://localhost:8080/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Axios handles this automatically
        },
      });

      setMessage(`Course created successfully: ${response.data.title}`);
      setTitle('');
      setDescription('');
      setContent('');
      setImage(null); // Reset image input
    } catch (error) {
      console.error('Error creating course:', error);
      setMessage('Failed to create course.');
    }
  };

  return (
    <div>
      <h1>Create a New Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content (Text)</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image Upload</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])} // Store the selected image
            accept="image/*"
          />
        </div>
        <div>
          <button type="submit">Create Course</button>
        </div>
      </form>
      {message && <p>{message}</p>} {/* Display success or failure message */}
    </div>
  );
}

export default CreateCourseForm;
