import React, { useState } from 'react';
import './CSS/ReactiveForm.css';

interface ReactiveFormProps {
    onClose: () => void;
}

const ReactiveForm: React.FC<ReactiveFormProps> = ({ onClose }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [inputFields, setInputFields] = useState<string[]>([]);

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedOption(value);

        // Define input fields based on the selected option
        if (value === 'option1') {
            setInputFields([
                'Public Question 1',
                'Public Question 2',
                'Public Question 3',
                'Public Question 4',
                'Public Question 5',
                'Public Question 6',
                'Public Question 7'
            ]);
        } else if (value === 'option2') {
            setInputFields([
                'Group Question 1',
                'Group Question 2',
                'Group Question 3',
                'Group Question 4',
                'Group Question 5',
                'Group Question 6',
                'Group Question 7'
            ]);
        } else if (value === 'option3') {
            setInputFields([
                'Private Question 1',
                'Private Question 2',
                'Private Question 3',
                'Private Question 4',
                'Private Question 5',
                'Private Question 6',
                'Private Question 7'
            ]);
        } else {
            setInputFields([]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
    };

    return (
        <div className="overlay">
            <div className="popup">
                <button className="close-icon" onClick={onClose}>X</button>
                <h2>Fill the Form</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Select an option:
                        <select value={selectedOption} onChange={handleDropdownChange}>
                            <option value="">--Choose an option--</option>
                            <option value="option1">Public</option>
                            <option value="option2">Group</option>
                            <option value="option3">Private</option>
                        </select>
                    </label>

                    {/* Render seven input fields based on the selected option */}
                    {inputFields.map((field, index) => (
                        <div key={index} className="input-container">
                            <label>{field}:</label>
                            <input type="text" placeholder={`Enter ${field.toLowerCase()}`} />
                        </div>
                    ))}

                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ReactiveForm;