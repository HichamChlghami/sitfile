
// "use client"


// import React, { useState, useEffect  } from 'react';
// import axios from 'axios';
// import { AiOutlineClose } from 'react-icons/ai';
// import { FaFolder  } from 'react-icons/fa';

// import { BsFillLockFill } from 'react-icons/bs';
// import { FaPlus } from 'react-icons/fa';
// import { BiDownload } from 'react-icons/bi';

// import Footer from '../footer/footer';
// import Navbar from '../navbar/Navbar';
// import {  Downloadall } from '../components';
// import './remove.css'

// function App() {

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const colors = [
//     '#FFFFFF', '#000000',
//     '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD',
//     '#E74C3C', '#3498DB', '#2ECC71', '#9B59B6', '#34495E',
//     '#F39C12', '#D35400', '#1ABC9C', '#16A085', '#2C3E50',
//     '#E67E22', '#95A5A6', '#7F8C8D', '#BDC3C7', '#FF5733','#008000'
//   ];
//   const [selectedColor, setSelectedColor] = useState();
//   const [selectedImage, setSelectedImage] = useState();

//   const handleColorClick = (color) => {
//     setSelectedColor(color);
//     setSelectedImage()
//   };
//   const handleColorClick_colors = (event) => {
//     const color = event.target.value; // Get the color from the event
//     setSelectedColor(color); // Update the state with the selected color
//     setSelectedImage()

//   };
//   const handleFileChange_design_file = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileURL = URL.createObjectURL(file);
//       setSelectedImage(fileURL); // Set the selected color to the image URL
//       setSelectedColor()

//     }
//   };

//   const handleFileChange_design_image = (image) => {
//     const value = `http://localhost:5000/images/${image}`;
//     setSelectedImage(value);
//     setSelectedColor()

//   };



//   const [files, setSelectedFiles] = useState([]);
//   const [newfiles, setNewFiles] = useState([]);

//   const [convert, setConvert] = useState([]);
//   const [type, setType] = useState([]);
//   const [chooseCategory, setChooseCategory] = useState(false);

//   const [images, setImages] = useState([]);
//   const [designSection , setDesignSection] = useState(false);

//   useEffect(() => {
//     // Fetch the list of image file names from the back-end using Axios
//     axios.get('http://localhost:5000/image-list')
//       .then(response => {
//         setImages(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching images:', error);
//       });
//   }, []);


//   const [totalConversionProgress, setTotalConversionProgress] = useState({});




// const [downloadAll, setDownloadAll] = useState();
// const [downloadValidation , setDownloadValidation]=useState(true)
 
// const [downloadOne , setDownloadOne] = useState(false)
// const [checkHandleFile , setCheckHandleFile] = useState(false)

 

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };






//   const handleFileChange1 = (event, newFiles) => {
//     const updatedFiles = [...files];
    
//   setNewFiles(newFiles)
  
//   newFiles.forEach((newFile) => {
//     updatedFiles.push(newFile); // Add the new file
   
//   });
  
  
//     event.target.value = '';
//     setSelectedFiles(updatedFiles);
//   };
  
//   const handleFileChange = (event) => {
//     const newFiles = Array.from(event.target.files);
//     handleFileChange1(event, newFiles);
//   };
  
//   const handleDrop = (e) => {
//     e.preventDefault();
//     const newFiles = Array.from(e.dataTransfer.files);
//     handleFileChange1(e, newFiles);
//   };
  
  
// // this for reload time 
// useEffect(() => {
//   const deleteFilesOnUnload = () => {
//     if (convert.length > 0) {
//       convert.filter((c) => type.includes(c.fileOutput)).forEach((c) => {
//         axios
//           .delete(`${apiUrl}/delete/${c._id}`)
//           .then(() => {
//           })
//           .catch((error) => {
//             console.log('An error occurred while deleting the file:', error);
//           });
//       });
//     }
//   };

//   window.addEventListener('beforeunload', deleteFilesOnUnload);

//   return () => {
//     window.removeEventListener('beforeunload', deleteFilesOnUnload);
//   };
// }, [convert, type]);





//   // this upload files useEffect related to files 

// useEffect(()=>{
// if(files.length > 0){
//   try {
//     setCheckHandleFile(true);

//     const sanitizeFileName = (fileName) => {
//       return fileName.replace(/[ %&?#<>/\\+:;=]/g, '_');
//     };

//     const typeArray = files.map((file) => {
//       const sanitizedFileName = sanitizeFileName(file.name);
//       const fileType = sanitizedFileName + Date.now() + "output." + file.name.split('.').pop();
//       return fileType;
//     });

//     setType((perv)=>[...perv ,  ...typeArray]);






//     let newIndex = files.length - newfiles.length -1

//     Promise.all(newfiles.map(async (file , index) => {
//       newIndex += 1

//       const format = file.name.split('.').pop();
//       const chunkSize = 2 * 64 * 1024; // 1MB
//       const totalChunks = Math.ceil(file.size / chunkSize);
//       const fileName_read = Date.now() + file.name;

//       for (let i = 0; i < totalChunks; i++) {
//         const start = i * chunkSize;
//         const end = Math.min(file.size, start + chunkSize);
//         const chunk = file.slice(start, end);

//         const formData = new FormData();
//         formData.append('chunk', chunk);
//         formData.append('chunkNumber', i);
//         formData.append('totalChunks', totalChunks);
//         formData.append('fileName', fileName_read);
//         formData.append('convertType', format);
//         formData.append('fileOutput', typeArray[newIndex]);
//         formData.append('filename', `${file.name}_${newIndex}`);

//         const uploadUrl = `${apiUrl}/Remove`;


//         await axios.post(uploadUrl, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }).catch(error => {
//           console.error('Error during file upload:', error.response ? error.response.data : error.message);
//         });
        
//       }

//       const res = await axios.get(`${apiUrl}/get`);
//       setConvert(res.data);

//       setTimeout(() => {
//         window.location.reload();
//         return;
//       }, 2 * 60 * 60 * 1000);


      
//     }))


//   } catch (error) {
//     console.log('An error occurred during the conversion:', error);
//   }
// }
// },[files])

// let checkConversionProgress ;
// useEffect(() => {
//   if (checkHandleFile) {
//     if (downloadAll) {
//       clearInterval(checkConversionProgress);
//     } else {

//       checkConversionProgress = setInterval( async () => {
//         const responseCompressAudio = await axios.get(`${apiUrl}/progressRemove`);
//         const progress0 = responseCompressAudio.data.progress;



//         setTotalConversionProgress({ ...progress0});      }, 1000)
//     }
//   }

//   // Cleanup interval on component unmount or if downloadAll changes
//   return () => {
//     clearInterval(checkConversionProgress);
//   };
// }, [checkHandleFile, downloadAll]);





// const handleDownload = async (c) =>{
//   try {

//     setDownloadOne(true);

//     const response = await axios.get(`${apiUrl}/api/download?fileName=${c.fileOutput}`, {
//       responseType: 'blob'
//     });

//     const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement('a');
//     link.href = downloadUrl;
  
//     link.setAttribute('download', `${c.filename.split('.')[0]}.${c.convertType}`); // Adjust filename if needed
//     document.body.appendChild(link);
//     link.click();
//     link.remove();

//     // Delay the execution of these calls to wait for the download to complete
//     setTimeout(() => {
//       setDownloadOne(false);
//     }, 1000); // Assuming the download takes less than 5 seconds, adjust if needed

//     // Delete the file after 2 hours
//     setTimeout(() => {
//       axios
//         .delete(`${apiUrl}/delete/${c._id}`)
//         .then(() => {
//           console.log('File deleted successfully');
//         })
//         .catch((error) => {
//           console.log('An error occurred while deleting the file:', error);
//         });
//     }, 2 * 60 * 60 * 1000);
//   } catch (error) {
//     console.error('Error downloading file:', error);


//   }
// }










  
//   // function for download all files in folder zip
//     const DownloadAll = () => {
//       Downloadall (type ,  setDownloadValidation , apiUrl , convert) 
//     };





// useEffect(() => {
//   if (convert.length > 0) {
//     const completedFiles = convert.filter(item =>
//       type.includes(item.fileOutput) && totalConversionProgress[item.fileOutput] === 100    );
//     const allCompleted = completedFiles.length === files.length;
//     setDownloadAll(allCompleted);
//   }
// }, [convert, totalConversionProgress , type]);




// // this for give default value for data for download
// const [convertedData  ,  setConvertedData] = useState()

// useEffect(() => {
//   if (convert.length > 0 && files.length > 0) {
//     const filterType = convert.filter(
//       (item) => type.includes(item.fileOutput) && item.filename === `${files[0].name}_${0}`
//     );

//     // Only update if there's a change
//     if (filterType.length > 0) {
//       setConvertedData(filterType[0]); // Assuming you want the first item

//     } else {
//       setConvertedData(null); // Reset if no matches found
//     }

//   }
// }, [convert]);

// const handleDataClick = (converted) =>{
//   setConvertedData(converted)
// }


// // this use it for change index
// const [convertedIndex  ,  setConvertedIndex] = useState(0)

// const handleIndexClick  =  (index) =>{
//   setConvertedIndex(index)
// }
// // this for choose category photo or color
// const handleChooseCategory = (value)=>{
// setChooseCategory(value)
// }

// const handleLogicMergeDesign = async () => {
//   if (selectedImage) {
//     setDesignSection(false);
//   } else if (selectedColor) {
//     const formData = new FormData();
//     formData.append('fileOutput', convertedData.fileOutput);
//     formData.append('color', selectedColor);
    
//     console.log('Form Data:', formData.get('fileOutput'), formData.get('color')); // Debug log
    
//     const uploadUrl = `${apiUrl}/color`;
    
//     try {
//         setDesignSection(false);
       
//         await axios.post(uploadUrl, formData);
//     } catch (error) {
//         console.error("Error uploading data:", error);
//     }
//   } else {
//     setSelectedColor(); // Set to initial value
//     setSelectedImage(); // Set to initial value
//   }
// };



//   return (
//     <>
//      <div className="convert" onDrop={handleDrop}onDragOver={handleDragOver}>
//       <Navbar/>
//       {/* <h1>Iam:{totalConversionProgress}</h1> */}


//       {
//         files.length === 0 && (
//             <>
//              <h1 className='title'>Background Remover</h1>
//              <p className='description'> Remove backgrounds in HD quality. Fast, secure, and completely free to use</p>
//             </>
//         )
//       }
     



//      <div className={`convert_files ${files.length > 0 ? 'convert_files_remove' : ''}`}>

// {
//   files.length === 0 ? (
// <div className='chose_files_container'
//  onDrop={handleDrop}
//  onDragOver={handleDragOver}
// >

//   <div className='chose_device_container '>
//   <label htmlFor="fileInput" className="custom-button_device">
// <FaFolder className='chose_files_device_icon'/>

//   Choose Images
//   <input 
//   type="file"
//   id="fileInput"
  
//   accept="image/*"
//   onChange={handleFileChange} 
//   className='chose_device_input'
// />



// </label>
  


// </div>
// <p className='update'>"      <BsFillLockFill style={{color:"#2ecc71"}} /> Drop your images here"</p>


// </div>

//   ):(

// <>

// <div className='container_remove'>
//   <div className='section1_remove'>
   
//     <div className='items_image_remove'>
//     <label htmlFor="fileInput_remove" className="label_remove">
//         <FaPlus className='icon_plus_remove'/>
//         <input 
//           type="file"
//           id="fileInput_remove"
          
//           accept="image/*"
//           onChange={handleFileChange} 
//           className='choose_files_remove'
//         />
//       </label>


//       {
//  files.map((file, index) => {
//   const fileName = file.name;

//   const filteredConvertedFiles = convert.filter(
//     (item) => type.includes(item.fileOutput) && item.filename === `${fileName}_${index}`
//   );


//   return (
//     <div key={index} className='uploading_remove_bg'>
//       {filteredConvertedFiles.length > 0 ? (
//       filteredConvertedFiles.map((converted, i) => (
//         <div className="loading-page_removed"  onClick={() => handleDataClick(converted)}>
//         <img src={`${apiUrl}/files/${converted.fileOutput}`} alt='image' className="item_image_removed" />
//       </div>
//       ))      ) : (
//         <div className="loading-page"  onClick={() => handleIndexClick(index)}>
//           <img src={URL.createObjectURL(file)} alt={`Preview of ${fileName}`} className="item_image" />
//           <div className="loading-circle"onClick={() => handleIndexClick(index)} ></div>
//         </div>

//       )}
//     </div>
//   )
// })
// }



//     </div>
//   </div>




//   <div className='section2_remove'>
// {
//   convertedData ? (
//     <div className='section2_remove_container_image'
// style={{
//   backgroundColor: selectedColor ? selectedColor : "transparent", 
//   backgroundImage: selectedColor ? "none" : (selectedImage ? `url('${selectedImage}')` : "url('/bg.png')"),
// }}
//     >
// <img src={`${apiUrl}/files/${convertedData.fileOutput}`} alt='image' className="section2_remove_image" />
// </div>
//   ) : (
//     <div className='section2_remove_container_image_overlay'>
//     <img src={URL.createObjectURL(files[convertedIndex])} alt='image' className="section2_remove_image" />
//     <div className='overlay'>
//     <div className='loader'>
//       {[...Array(3)].map((_, index) => (
//         <span key={index} className='dot' style={{ animationDelay: `${index * 0.1}s` }}></span>
//       ))}
//     </div>
//     </div>
//   </div>
 

    
//   )
// }


// <div className='section2_remove_container_buttons'>

// <div className='background_design_button' onClick={()=>{setDesignSection(true)}}>
//   <FaPlus className='choose_background_plus'/>
// Background
// </div>


// <>
// {
//   files.length > 1 &&(
//     (
//     downloadAll  &&  downloadValidation ? (
//       <div className='converted_convert_downloadAll_remove  ' onClick={DownloadAll}>
//       Download All    <BiDownload className='  converted_convert_downloadAll_remove_icon '/> 
      
//     </div>):(
//       <div className=' converted_convert_downloadAll_remove  downloadAll_opacity_remove '>
//       Download All    <BiDownload className=' converted_convert_downloadAll_remove_icon'/> 
      
//     </div>
//     )
//     )
//     )
//   }

// </>
// <>

// {
//   convertedData ? (

//     downloadOne ? (
// <button className='uploading_download  uploading_download_second'>Download HD</button>

//     ):(
//     <button onClick={() => handleDownload(convertedData)} className='uploading_download download_success'>Download HD</button>

//     )


//   ):(
// <button className='uploading_download  uploading_download_second'>Download HD</button>


//   )
// }
// </>
// </div>


//   </div>


// {
//   designSection && (
//     <div className='section3_remove_design'>
// <AiOutlineClose className='section2_icon_x'/>


// <div className='section3_choose_category'>
//   {
//    chooseCategory ? (
//     <>
//       <div className='section3_category_photo_true' onClick={()=>{setChooseCategory(true)}}>Photo</div>
//       <div className='section3_category_color' onClick={()=>{setChooseCategory(false)}} >Color</div>
//     </>
//    ):(
//     <>
//       <div className='section3_category_photo' onClick={()=>{setChooseCategory(true)}}>Photo</div>
//       <div className='section3_category_color_true' onClick={()=>{setChooseCategory(false)}}>Color</div>
//     </>
//    ) 
//   }


// </div>

// <>
// {
//   chooseCategory ? (
//     <div className='section3_content'>



// <label htmlFor="fileInput_remove_design" className="label_remove_section3">
//         <FaPlus className='icon_plus_remove_section3'/>
//         <input 
//           type="file"
//           id="fileInput_remove_design"
          
//           accept="image/*"
//           onChange={handleFileChange_design_file} 
//           className='choose_files_remove'
//         />
//       </label>
//       {images.map((image, index) => (
//   <img
//     onClick={() => handleFileChange_design_image(image)}
//     className='content_image'
//     key={index}
//     src={`http://localhost:5000/images/${image}`}
//     alt={`Image ${index}`}
//   />
// ))}
// </div>
//   ):(
//     <div className='section3_content'>



//     <label htmlFor="fileInput_remove_1" className="label_remove_section3_color">
//             {/* <FaPlus className='icon_plus_remove_section3'/> */}
//             <img src='/image1.jfif'  className='section3_choose_color'/>
//             <input 
//     type="color"
//     id="fileInput_remove_1"
//    className='color'
//    value={selectedColor}
//    onChange={handleColorClick_colors} 

// />
//           </label>
//           {colors.map((color, index) => (
//           <div
//             className='choose_item_color'
//             key={index}
//             onClick={() => handleColorClick(color)}
//             style={{backgroundColor: color , marginTop:"5px", 
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//             cursor: 'pointer',


//             }}
          
//           />
//         ))}
//     </div>
//   )
// }

// </>



// <div className='section3_buttons'>
//   <button className='section3_button_restart'>Restart</button>
//   <button className='section3_button_done' onClick={handleLogicMergeDesign}>Done</button>

// </div>
// </div>

//   )
// }



  
// </div>

 




// </>
// )
// }


// {/* here we have description design */}
// <div className='full_section_describe'>
// <div className='describe_how_convert'>
//   <div className='full_how_convert'>
//     <img  className='Arrows' src='/Arrows.png' alt='arrows'/>
//     <h2 className='how_convert'>How to Remove bg from an Image?</h2>
//     </div>
//   <p className='description_p'>1.Start by selecting your images using the 'Choose Images' button</p>
//   <p className='description_p'>2.Once you upload the files, the background will be removed automatically</p>
// </div>

// <div className='how_work_cards'>
// <div className='how_work_card'>
//   <div className='how_work_title'>
//     <img className='image_how_work_title'src='/Simplicity.svg' alt='Simplicity'/>
//     <h3 className='title_how_work_title'>Simplicity at its Core</h3>
//   </div>
//   <p className='how_work_description'>
//   Just upload your images, and the background will be removed automatically. Our tool guarantees the highest quality results.  </p>
// </div>

// <div className='how_work_card'>
//   <div className='how_work_title'>
//     <img className='image_how_work_title'src='/programming.svg' alt='programming'/>
//     <h3 className='title_how_work_title'>Unbeatable Features</h3>
//   </div>
//   <p className='how_work_description'>
//   Effortlessly remove backgrounds from batches of images with our tool

// </p>
// </div>


// <div className='how_work_card'>
//   <div className='how_work_title'>
//     <img className='image_how_work_title'src='/secure.svg' alt='secure'/>
//     <h3 className='title_how_work_title'> Free and Secure</h3>
//   </div>
//   <p className='how_work_description'>
//   Enjoy a free, secure, and universally compatible tool accessible from any web browser. Your images are automatically deleted after a few hours for added privacy  </p>
// </div>


// </div>




// </div>













// </div>





// <Footer/>






// </div>

    
// <title>Remove background from image</title>
// <meta name="description" content="Explore our professional background removal service to enhance your images. Learn advanced techniques to remove backgrounds seamlessly while preserving image quality. Discover methods for creating transparent backgrounds, isolating subjects, and improving visual appeal. Optimize your images with expert background removal for a polished, professional look." />
// <meta name="keywords" content="background removal, image quality, image isolation, transparent background, visual appeal, background removal service, image enhancement, subject isolation, polished images, professional image editing" />

//   <link rel="canonical" href="https://sitfile.com/remove-background" />

//     </>
   

   
//   );

// }
// export default App

