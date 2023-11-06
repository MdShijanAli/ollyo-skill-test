import { BsCardImage } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useEffect, useState, useRef } from "react"; // Import useRef

const App = () => {
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [checkedImages, setCheckedImages] = useState(new Array(11).fill(false));
  const [isDragging, setIsDragging] = useState(false); // State variable to track dragging

  const fileInputRef = useRef(null); // Create a ref for the file input

  useEffect(() => {
    fetch('images.json')
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  const handleImageClick = (index) => {
    const updatedCheckedImages = [...checkedImages];
    updatedCheckedImages[index] = !updatedCheckedImages[index];
    setCheckedImages(updatedCheckedImages);
  };

  const handleDeleteSelectedImages = () => {
    const selectedImageIds = checkedImages
      .map((checked, index) => (checked ? images[index].id : null))
      .filter((id) => id !== null);

    if (selectedImageIds.length === 0) {
      return;
    }

    const updatedImages = images.filter((image) => !selectedImageIds.includes(image.id));
    setImages(updatedImages);
    setCheckedImages(new Array(updatedImages.length).fill(false));
  };

  const onDragStart = (index, e) => {
    e.dataTransfer.setData("imageIndex", index);
    setIsDragging(true); // Set dragging state to true
  };

  const onDragEnd = () => {
    setIsDragging(false); // Set dragging state to false when dragging ends
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (index, e) => {
    const draggedImageIndex = e.dataTransfer.getData("imageIndex");
    if (draggedImageIndex === "") return;

    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(draggedImageIndex, 1);
    updatedImages.splice(index, 0, draggedImage);

    setImages(updatedImages);
    setIsDragging(false); // Set dragging state to false when dropping
  };

  const checked = checkedImages.filter(value => value === true).length;

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const src = URL.createObjectURL(file);
        newImages.push({ img: src, id: new Date().getTime() + i });
      }
    }

    if (newImages.length > 0) {
      const updatedImages = [...images];
      updatedImages.push(...newImages);
      setImages(updatedImages);
    }

    fileInputRef.current.value = null; // Clear the file input
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-20">
        {checked ? (
          <div className="flex item justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="selectFile" id="selectFile" className="mr-3 w-4 h-4" checked />
              <p htmlFor="selectFile" className="text-lg font-semibold">{checked} File Selected</p>
            </div>
            <div>
              <button onClick={handleDeleteSelectedImages}><RiDeleteBin5Fill className="w-10 bg-red-300 p-2 rounded-full h-10 text-red-600" /></button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className='text-2xl font-semibold mb-2'>Gallery</h1>
          </div>
        )}
        <div className='border-b-2 mb-10'></div>
        <div>
          <div className="grid lg:grid-cols-5 grid-cols-3 sm:grid-cols-4 md:gap-5 sm:gap-3 gap-2">
            {images.map((src, index) => (
              <div
                key={index}
                className={`w-full ${index === 0 ? "row-span-2 col-span-2" : "col-span-1"}`}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(index, e)}
              >
                <div
                  className="relative group w-full h-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleImageClick(index)}
                  draggable
                  onDragStart={(e) => onDragStart(index, e)}
                  onDragEnd={onDragEnd} // Handle drag end
                >
                  <img
                    className={`w-full h-full border rounded-md transition-opacity ${
                      (!isDragging && (index === hoveredIndex || checkedImages[index])) ? 'opacity-25' : 'opacity-100'
                    }`}
                    src={src.img}
                    alt=""
                  />
                  {(index === hoveredIndex || checkedImages[index]) && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-25">
                      <input
                        type="checkbox"
                        className="text-green-500 w-6 h-6 mt-10 ml-10"
                        checked={checkedImages[index]}
                        onChange={() => handleImageClick(index)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center w-full h-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center xl:py-20 p-1">
                  <BsCardImage className="sm:w-6 sm:h-6 w04 h-4" />
                  <p className="sm:mt-5 mt-2 text-sm sm:text-base text-center font-semibold text-gray-500">
                    Add Images
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  ref={fileInputRef} // Connect the file input to the ref
                  onChange={handleFileUpload} // Handle file upload
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
