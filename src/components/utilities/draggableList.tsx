import React, { useState } from 'react';


type DraggableListProps = {
  setDownloadURLs: (urls: string[]) => void;
  downloadURLs: string[];
  deleteImage: (index: number) => void;
  onChange: (formId: string, urls: string[]) => void;
  formId: string;
};


  const DraggableList: React.FC<DraggableListProps> = ({ setDownloadURLs, downloadURLs, deleteImage, onChange, formId }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    setOverIndex(index);
  };

  const handleDragLeave = () => {
    setOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, dropIndex: number) => {
    e.preventDefault();
    const newItems = [...downloadURLs];

    const [draggedItem] = newItems.splice(draggedIndex!, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    setDownloadURLs(newItems);
    onChange(formId, newItems);
    setDraggedIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="pictures">
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
            }
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img
                src={url}
                alt="Uploaded image"
                className="uploaded-image"
              />
            </a>
            <span
              className="deleteButton"
              onClick={() => deleteImage(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DraggableList;
