
const FormField = ({ label, formId, value, onChange, className }) => {
    const handleInputChange = (e) => {
      onChange(formId, e.target.value); // Notify parent of the change
    };
  
    const isTextarea = formId === "productDescription";

  return (
    <div className={`formField ${className || ""}`}>
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


