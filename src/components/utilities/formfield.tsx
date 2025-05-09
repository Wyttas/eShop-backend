import React from 'react';

// Define props interface
interface FormFieldProps {
  label: string;
  formId: string;
  value: string;
  onChange: (formId: string, value: string) => void;
  className?: string; // Optional prop
}

const FormField: React.FC<FormFieldProps> = ({ label, formId, value, onChange, className }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(formId, e.target.value); // Notify parent of the change
  };

  const isTextarea = formId === 'productDescription';

  return (
    <div className={`formField ${className || ''}`}>
      <label htmlFor={formId}>{label}</label>
      {isTextarea ? (
        <textarea
          id={formId}
          value={value}
          onChange={handleInputChange}
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          id={formId}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      )}
    </div>
  );
};

export default FormField;