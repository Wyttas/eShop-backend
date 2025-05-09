import React, { useState } from 'react';

const DraggableList = ({ setDownloadURLs, downloadURLs, deleteImage, onChange, formId}) => {

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);


  const handleDragStart = (e, index) => {
    setDraggedIndex(index); // Store the index of the dragged item
    e.dataTransfer.effectAllowed = 'move'; // Indicate drag action
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); // Allow dropping
    setOverIndex(index); // Update the index of the item being hovered
  };

  const handleDragLeave = () => {
    setOverIndex(null); // Clear hover state when leaving an item
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const newItems = [...downloadURLs];

    // Reorder items based on drag-and-drop
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    setDownloadURLs(newItems); // Update state with reordered items
    onChange(formId, newItems);
    setDraggedIndex(null); // Clear dragged state
    setOverIndex(null); // Clear hover state
  };



  return (
    <>
        <div className='pictures'>
        
          <ul className="images">
            {downloadURLs.map((url, index) => (
              <li
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className={
                  draggedIndex === index
                    ? 'dragged'
                    : overIndex === index
                    ? 'over'
                    : ''
                } // Apply dynamic classes for styling
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={url}
                    alt="Uploaded image"
                    className="uploaded-image"
                  />
                </a>
                <span className='deleteButton' onClick={() => deleteImage(index)}>x</span>
              </li>
            ))}
          </ul>
        </div>
    </>
  );
};

export default DraggableList;
