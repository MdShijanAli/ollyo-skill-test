import img1 from "./assets/images/image-1.webp";
import img2 from "./assets/images/image-2.webp";
import img3 from "./assets/images/image-3.webp";
import img4 from "./assets/images/image-4.webp";
import img5 from "./assets/images/image-5.webp";
import img6 from "./assets/images/image-6.webp";
import img7 from "./assets/images/image-7.webp";
import img8 from "./assets/images/image-8.webp";
import img9 from "./assets/images/image-9.webp";
import img10 from "./assets/images/image-10.jpeg";
import img11 from "./assets/images/image-11.jpeg";
import { BsCardImage } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useState } from "react";


const App = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [checkedImages, setCheckedImages] = useState(new Array(11).fill(false)); // Use the total number of images

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

  const handleImageClick = (index) => {
    const updatedCheckedImages = [...checkedImages];
    updatedCheckedImages[index] = !updatedCheckedImages[index];
    setCheckedImages(updatedCheckedImages);
  };

  // console.log(hoveredIndex)
  const checked = checkedImages.filter(value => value === true).length;
  console.log(checked)

  return (
    <div>
      <div className="max-w-7xl mx-auto py-20">
      <div className="flex item justify-between mb-10">
        <div className="flex items-center">
          <input type="checkbox" name="selectFile" id="selectFile" className="mr-3 w-4 h-4" checked/>
          <p htmlFor="selectFile" className="text-lg font-semibold">{checked} File Selected</p>
        </div>
        <div>
          <button><RiDeleteBin5Fill className="w-10 bg-red-300 p-2 rounded-full h-10 text-red-600"/></button>
        </div>
      </div>


      <div>
        <div className="grid grid-cols-5 gap-5">
        <div className="col-span-2">
  <div
    className="relative group"
    onMouseEnter={() => setHoveredIndex(0)}
    onMouseLeave={() => setHoveredIndex(null)}
    onClick={() => handleImageClick(0)}
  >
    <img
      className={`border rounded-md transition-opacity ${
        (hoveredIndex === 0 || checkedImages[0]) ? 'opacity-25' : 'opacity-100'
      }`}
      src={images[0]}
      alt=""
    />
    {(hoveredIndex === 0 || checkedImages[0]) && (
      <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-25">
        <input
          type="checkbox"
          className="text-green-500 w-6 h-6 mt-10 ml-10"
          checked={checkedImages[0]}
          onChange={() => handleImageClick(0)}
        />
      </div>
    )}
  </div>
</div>

          <div className="col-span-3 grid grid-cols-3 gap-5">
            {images.slice(1, 7).map((src, index) => (
              <div key={index}>
                <div
                  className="relative group"
                  onMouseEnter={() => setHoveredIndex(index + 1)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleImageClick(index + 1)}
                >
                  <img
          className={`border rounded-md transition-opacity ${
            (index + 1 === hoveredIndex || checkedImages[index + 1]) ? 'opacity-25' : 'opacity-100'
          }`}
          src={src}
          alt=""
        />
                  {(index + 1 === hoveredIndex || checkedImages[index + 1]) && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-25">
            <input
              type="checkbox"
              className="text-green-500 w-6 h-6 mt-10 ml-10"
              checked={checkedImages[index + 1]}
              onChange={() => handleImageClick(index + 1)}
            />
          </div>
        )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5 mt-5">
        {images.slice(7, 11).map((src, index) => (
              <div key={index}>
                <div
                  className="relative group"
                  onMouseEnter={() => setHoveredIndex(index + 7)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleImageClick(index + 7)}
                >
                  <img
          className={`border rounded-md transition-opacity ${
            (index + 7 === hoveredIndex || checkedImages[index + 7]) ? 'opacity-25' : 'opacity-100'
          }`}
          src={src}
          alt=""
        />
                 {(index + 7 === hoveredIndex || checkedImages[index + 7]) && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-25">
            <input
              type="checkbox"
              className="text-green-500 w-6 h-6 mt-10 ml-10"
              checked={checkedImages[index + 7]}
              onChange={() => handleImageClick(index + 7)}
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
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <BsCardImage className="w-6 h-6" />
                <p className="mt-5 font-semibold text-gray-500 dark:text-gray-400">
                  Add Images
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
        </div>
        </div>
    </div>
  );
};

export default App;