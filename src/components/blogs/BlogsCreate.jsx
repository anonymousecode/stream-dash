// "use client"

// import { useEffect, useState } from "react"
// import "trix"
// import "trix/dist/trix.css"
// import { insertDoc, uploadFile, get_data } from '@/api/methods'

// const BlogsCreate = () => {

//   const [blogImage, setBlogImage] = useState(null)
//   const [form, setForm] = useState({
//     title: "",
//     date: "",
//     author: "",
//     attach_image: null,
//     content: "",
    
//   })

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const editor = document.querySelector("trix-editor")
//       if (editor) {
//         editor.addEventListener("trix-change", (e) => {
//           setForm((prev) => ({
//             ...prev,
//             content: e.target.innerHTML,
//           }))
//         })
//       }
//     }
//   }, [])

//   const handleChange = (e) => {
//     const { name, value } = e.target

//     setForm((prev) => ({ ...prev, [name]: value }))

//   }

//   const handleSubmit = async (e) => {
//     console.log("Form data:", form);
//     console.log("Image:", blogImage);

//     e.preventDefault()

//     const imageUrl = await uploadFile(blogImage, 0)
//     console.log("Image URL:", imageUrl);
//     const updatedForm = {
//       ...form,
//       attach_image: imageUrl,
//     };

//     console.log("Form data:", updatedForm);



//     const result = await insertDoc("Blog", updatedForm);
//   }

//   return (
//     <div className="container mt-3">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input name="title" className="form-control" onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Date</label>
//           <input type="date" name="date" className="form-control" onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Author</label>
//           <input name="author" className="form-control" onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Attach Image</label>
//           <input type="file" name="attach_image" className="form-control" onChange={(e) => { setBlogImage(e.target.files[0]) }} />
//           <div className="mt-3 d-flex gap-2 flex-wrap">
//             {blogImage &&
//               <img

//                 src={URL.createObjectURL(blogImage)}
//                 alt="event"
//                 className="rounded"
//                 style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//               />
//             }
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Content</label>
//           <input type="hidden" id="content" />
//           <trix-editor input="content"></trix-editor>
//         </div>


 

//         <button type="submit" className="btn btn-primary">save</button>
//       </form>
//     </div>
//   )
// }

// export default BlogsCreate 


// "use client"

// import { useEffect, useState } from "react"
// import "trix"
// import "trix/dist/trix.css"
// import { insertDoc, uploadFile, get_data } from '@/api/methods'

// const BlogsCreate = () => {
//   const [blogImage, setBlogImage] = useState(null)
//   const [authors, setAuthors] = useState([])
//   const [form, setForm] = useState({
//     title: "",
//     date: "",
//     author: "",
//     attach_image: null,
//     content: "",
//   })

//   // Fetch STREAM User options for author field
//   useEffect(() => {
//     const fetchAuthors = async () => {
//     try {
//       const fields = ["name", "fname"] // specify fields to fetch
//       const res = await get_data("STREAM User", fields, {}) // pass empty filters for all users
//       setAuthors(res || [])
//     } catch (error) {
//       console.error("Error fetching authors:", error)
//     }
//   }

//     fetchAuthors()
//   }, [])

//   // Trix editor content handler
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const editor = document.querySelector("trix-editor")
//       if (editor) {
//         editor.addEventListener("trix-change", (e) => {
//           setForm((prev) => ({
//             ...prev,
//             content: e.target.innerHTML,
//           }))
//         })
//       }
//     }
//   }, [])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const imageUrl = blogImage ? await uploadFile(blogImage, 0) : null;

//     const updatedForm = {
//       ...form,
//       attach_image: imageUrl,
//     };

//     const result = await insertDoc("Blog", updatedForm);

//     if (result) {
//       // Show success message
//       alert("Blog submitted successfully!");

//       // Reset form
//       setForm({
//         title: "",
//         date: "",
//         author: "",
//         attach_image: null,
//         content: "",
//       });

//       // Reset file input
//       setBlogImage(null);

//       // Clear Trix editor manually
//       const trixEditor = document.querySelector("trix-editor");
//       if (trixEditor) {
//         trixEditor.editor.loadHTML("");
//       }
//     }
//   } catch (error) {
//     console.error("Submit error:", error);
//     alert("Failed to submit blog.");
//   }
// };

//   return (
//     <div className="container mt-3">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input
//             name="title"
//             className="form-control"
//             value={form.title}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Date</label>
//           <input
//             type="date"
//             name="date"
//             className="form-control"
//             value={form.date}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Author</label>
//           <select
//             name="author"
//             className="form-control"
//             value={form.author}
//             onChange={handleChange}
//           >
//             <option value="">Select Author</option>
//             {authors.map((author) => (
//               <option key={author.name} value={author.name}>
//                 {author.full_name || author.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Attach Image</label>
//           <input
//             type="file"
//             name="attach_image"
//             className="form-control"
//             onChange={(e) => setBlogImage(e.target.files[0])}
//           />
//           <div className="mt-3 d-flex gap-2 flex-wrap">
//             {blogImage && (
//               <img
//                 src={URL.createObjectURL(blogImage)}
//                 alt="event"
//                 className="rounded"
//                 style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//               />
//             )}
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Content</label>
//           <input type="hidden" id="content" />
//           <trix-editor input="content"></trix-editor>
//         </div>

//         <button type="submit" className="btn btn-primary">Save</button>
//       </form>
//     </div>
//   )
// }

// export default BlogsCreate


"use client"

import { useEffect, useRef, useState } from "react"
import "trix"
import "trix/dist/trix.css"
import { insertDoc, uploadFile, get_data } from '@/api/methods'

const BlogsCreate = () => {
  const [blogImage, setBlogImage] = useState(null)
  const [authors, setAuthors] = useState([])
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    title: "",
    date: "",
    author: "",
    attach_image: null,
    content: "",
  })

  // Fetch STREAM User list
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const fields = ["name", "fname"]
        const res = await get_data("STREAM User", fields, {})
        setAuthors(res || [])
      } catch (error) {
        console.error("Error fetching authors:", error)
      }
    }

    fetchAuthors()
  }, [])

  // Trix editor handler
  useEffect(() => {
    if (typeof window !== "undefined") {
      const editor = document.querySelector("trix-editor")
      if (editor) {
        editor.addEventListener("trix-change", (e) => {
          setForm((prev) => ({
            ...prev,
            content: e.target.innerHTML,
          }))
        })
      }
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const imageUrl = blogImage ? await uploadFile(blogImage, 0) : null

      const updatedForm = {
        ...form,
        attach_image: imageUrl,
      }

      console.log("Submitting:", updatedForm)
      const result = await insertDoc("Blog", updatedForm)

      if (result) {
        alert("Blog submitted successfully!")

        // Reset form state
        setForm({
          title: "",
          date: "",
          author: "",
          attach_image: null,
          content: "",
        })

        setBlogImage(null)

        // Clear file input manually
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

        // Clear Trix content
        const trixEditor = document.querySelector("trix-editor")
        if (trixEditor) {
          trixEditor.editor.loadHTML("")
        }
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Failed to submit blog.")
    }
  }

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3" style={{ marginBottom: "5rem" }}>
          <label className="form-label">Author</label>
          <select
            name="author"
            className="form-control"
            value={form.author}
            onChange={handleChange}
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.fname +" - "+ author.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Attach Image</label>
          <input
            ref={fileInputRef}
            type="file"
            name="attach_image"
            className="form-control"
            onChange={(e) => setBlogImage(e.target.files[0])}
          />
          <div className="mt-3 d-flex gap-2 flex-wrap">
            {blogImage && (
              <img
                src={URL.createObjectURL(blogImage)}
                alt="preview"
                className="rounded"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            )}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <input type="hidden" id="content" />
          <trix-editor input="content"></trix-editor>
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  )
}

export default BlogsCreate

