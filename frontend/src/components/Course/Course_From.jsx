import React, { useState } from "react";
import { createCourse } from "./CourseServices";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [tempContent, setTempContent] = useState("");
  // const [tempImage, setTempImage] = useState(null);

  const handleAddText = () => {
    setContent([...content, { type: "text", value: tempContent }]);
    setTempContent("");
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setContent([...content, { type: "image", value: url }]);
    }
  };

  const handleSubmit = async () => {
    const newCourse = {
      title,
      description,
      content,
      createdBy: "userId123", // replace with real user id from auth
    };
    await createCourse(newCourse);
    alert("Course Created Successfully!");
    setTitle("");
    setDescription("");
    setContent([]);
  };

  return (
    <div>
      <h1>Create Course</h1>
      <input
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <br />

      <h3>Content:</h3>
      {content.map((c, i) => (
        <div key={i}>
          {c.type === "text" ? (
            <p>{c.value}</p>
          ) : (
            <img src={c.value} alt="content" width="100" />
          )}
        </div>
      ))}
      <input
        placeholder="Add Text Content"
        value={tempContent}
        onChange={(e) => setTempContent(e.target.value)}
      />
      <button onClick={handleAddText}>Add Text</button>
      <br />
      <br />

      <input type="file" accept="image/*" onChange={handleAddImage} />
      <br />
      <br />

      <button onClick={handleSubmit}>Create Course</button>
    </div>
  );
}

export default CreateCourse;
