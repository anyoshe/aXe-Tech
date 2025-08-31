"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type FormData = {
    parentName: string;
    phone: string;
    email: string;
    studentName: string;
    age: string;
    classLevel: string;
    program: string;
    session: string;
    duration: string;
    notes: string;
    consent: boolean;
};

export default function RegistrationForm() {
    const [formData, setFormData] = useState<FormData>({
        parentName: "",
        phone: "",
        email: "",
        studentName: "",
        age: "",
        classLevel: "",
        program: "",
        session: "",
        duration: "",
        notes: "",
        consent: false,
    });

    // 🔹 For inputs, textareas, and selects
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement; // 👈 safe cast
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    // 🔹 For form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch("https://formspree.io/f/mpwjrqjq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        alert("✅ Registration submitted successfully!");
        setFormData({
            parentName: "",
            phone: "",
            email: "",
            studentName: "",
            age: "",
            classLevel: "",
            program: "",
            session: "",
            duration: "",
            notes: "",
            consent: false,
        });

    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
                    Holiday Tech Talent Incubator Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 🔹 Parent Name */}
                    <div>
                        <label className="block font-semibold text-gray-700">
                            Parent/Guardian Full Name
                        </label>
                        <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* 🔹 Phone */}
                    <div>
                        <label className="block font-semibold text-gray-700">
                            Phone Number (WhatsApp)
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {         /* Email */}
                    <div>
                        <label className="block font-semibold text-gray-700">
                            Email Address (optional)
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Student Name */}
                    <div>
                        <label className="block font-semibold text-gray-700">
                            Student Full Name
                        </label>
                        <input
                            type="text"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block font-semibold text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Class Level */}
                    <div>
                        <label className="block font-semibold text-gray-700">
                            Class/Level
                        </label>
                        <select
                            name="classLevel"
                            value={formData.classLevel}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">-- Select --</option>
                            <option>Pre-primary</option>
                            <option>Primary</option>
                            <option>Secondary</option>
                            <option>Post-Form 4</option>
                        </select>
                    </div>

                    {/* Program */}
                    <div>
                        <label className="block font-semibold text-gray-700">
                            Program Group
                        </label>
                        <select
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">-- Select --</option>
                            <option>3–8 yrs</option>
                            <option>9–12 yrs</option>
                            <option>13–18 yrs</option>
                            <option>18+ yrs</option>
                        </select>
                    </div>

                    {/* Session */}
                    <div>
                        <label className="block font-semibold text-gray-700">
                            Preferred Session
                        </label>
                        <select
                            name="session"
                            value={formData.session}
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">-- Select --</option>
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Full Day</option>
                        </select>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block font-semibold text-gray-700">Duration</label>
                        <select
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">-- Select --</option>
                            <option>2–3 hrs</option>
                            <option>4–5 hrs</option>
                        </select>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block font-semibold text-gray-700">
                            Special Needs / Notes
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Consent */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            required
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="text-gray-700">
                            I agree to be contacted via WhatsApp/Phone.
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Register Now
                    </button>
                </form>
            </div>
        </div>
    );
}
