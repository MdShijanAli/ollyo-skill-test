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

  return (
    <div>
      <div className="max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-2">
            <img className="border rounded-md" src={images[0]} alt="" />
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
                      index + 1 === hoveredIndex ? 'opacity-50' : 'opacity-100'
                    }`}
                    src={src}
                    alt=""
                  />
                  {index + 1 === hoveredIndex && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-90">
                      <input
                        type="checkbox"
                        className="text-green-500 w-6 h-6"
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
                      index + 7 === hoveredIndex ? 'opacity-50' : 'opacity-100'
                    }`}
                    src={src}
                    alt=""
                  />
                  {index + 7 === hoveredIndex && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-90">
                      <input
                        type="checkbox"
                        className="text-green-500 w-6 h-6"
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
  );
};

export default App;