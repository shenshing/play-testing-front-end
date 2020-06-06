// import React, { Fragment, useState } from "react";
// // import Message from "./Message";
// // import Progress from "./Progress";
// import axios from "axios";
// import useAxios from "axios-hooks";

// const FileUpload = () => {
// var accessTokenObj = localStorage.getItem("token");

//   const [file, setFile] = useState(null);
//   const [filename, setFilename] = useState("Choose File");
//   const [uploadedFile, setUploadedFile] = useState({});
//   const [message, setMessage] = useState("");
//   const [uploadPercentage, setUploadPercentage] = useState(0);

//   const onChange = (e) => {
//     setFile(e.target.files[0]);
//     setFilename(e.target.files[0].name);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/uploadProfile",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             token: accessTokenObj,
//           },
//           onUploadProgress: (progressEvent) => {
//             setUploadPercentage(
//               parseInt(
//                 Math.round((progressEvent.loaded * 100) / progressEvent.total)
//               )
//             );

//             // Clear percentage
//             setTimeout(() => setUploadPercentage(0), 10000);
//           },
//         }
//       );

//       const { fileName, filePath } = res.data;

//       setUploadedFile({ fileName, filePath });

//       setMessage("File Uploaded");
//     } catch (err) {
//       if (err.response.status === 500) {
//         setMessage("There was a problem with the server");
//       } else {
//         setMessage(err.response.data.msg);
//       }
//     }
//   };

//   const [
//     { data, loading, error },
//     //  refetch
//   ] = useAxios({
//     method: "get",
//     url: "http://localhost:8000/userData",
//     headers: {
//       "Content-Type": "application/json",
//       token: accessTokenObj,
//     },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return window.location.replace("/login");
//   if (data) {
//     // console.log(data);
//     if (file === null) {
//       setFile({ ...data });
//     }
//   }

//   return (
//     <Fragment>
//       {/* {message ? <Message msg={message} /> : null} */}
//       <form onSubmit={onSubmit}>
//         <div className="custom-file mb-4">
//           <input
//             type="file"
//             className="custom-file-input"
//             id="customFile"
//             onChange={onChange}
//           />
//           <label className="custom-file-label" htmlFor="customFile">
//             {filename}
//           </label>
//         </div>

//         {/* <Progress percentage={uploadPercentage} /> */}

//         <input
//           type="submit"
//           value="Upload"
//           className="btn btn-primary btn-block mt-4"
//         />
//       </form>
//       {uploadedFile ? (
//         <div className="col-md-6 m-auto">
//           <h3 className="text-center">{uploadedFile.fileName}</h3>
//           <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
//           <img
//             className=" md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
//             src={file ? file.user_profile : ""}
//           />
//         </div>
//       ) : null}
//     </Fragment>
//   );
// };

// export default FileUpload;

import React, { Fragment, useState } from "react";
// import Message from "./Message";
// import Progress from "./Progress";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  var accessTokenObj = localStorage.getItem("token");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("file", file);
    console.log(formData[0]);
    try {
      const res = await axios.post(
        "http://localhost:8000/uploadProfile",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: accessTokenObj,
          },
          // body: {
          //   image: formData,
          // },
        }
      );

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {/* {message ? <Message msg={message} /> : null} */}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        {/* <Progress percentage={uploadPercentage} /> */}

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
