import { useState } from "react";
import './QueryForm.css'

function QueryForm({ setFormData }) {
    const [company, setCompany] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { company, duration };
        console.log("form submitted", data)
        try {
            const response = await fetch("http://localhost:8080/trade", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setFormData(data);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="comp">Company : </label>
            <input type="text" name='comp' placeholder="eg : IBM" value={company} 
                onChange={(e) => setCompany(e.target.value)} required />

            <label htmlFor="duration">Duration : </label>
            <input type="number" name='duration' placeholder="minutes" value={duration} 
                onChange={(e) => setDuration(e.target.value)} required />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

export default QueryForm;
