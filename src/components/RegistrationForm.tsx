"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type ChildData = {
    studentName: string;
    age: string;
    classLevel: string;
    program: string;
    session: string;
    duration: string;
    notes: string;
};

type ParentData = {
    parentName: string;
    phone: string;
    email: string;
    consent: boolean;
};

export default function RegistrationForm() {
    const [parentData, setParentData] = useState<ParentData>({
        parentName: "",
        phone: "",
        email: "",
        consent: false,
    });

    const [children, setChildren] = useState<ChildData[]>([
        {
            studentName: "",
            age: "",
            classLevel: "",
            program: "",
            session: "",
            duration: "",
            notes: "",
        },
    ]);

    // Handle parent data change
    const handleParentChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setParentData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle child data change
    const handleChildChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const updatedChildren = [...children];
        updatedChildren[index] = { ...updatedChildren[index], [name]: value };
        setChildren(updatedChildren);
    };

    // Add a new child
    const addChild = () => {
        setChildren([
            ...children,
            {
                studentName: "",
                age: "",
                classLevel: "",
                program: "",
                session: "",
                duration: "",
                notes: "",
            },
        ]);
    };

    // Remove a child
    const removeChild = (index: number) => {
        setChildren(children.filter((_, i) => i !== index));
    };

    // Handle submit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Flatten payload for Formspree
        const payload: Record<string, string> = {
            parentName: parentData.parentName,
            phone: parentData.phone,
            email: parentData.email,
            consent: parentData.consent ? "Yes" : "No",
        };

        children.forEach((child, index) => {
            const i = index + 1;
            payload[`Child ${i} - Name`] = child.studentName;
            payload[`Child ${i} - Age`] = child.age;
            payload[`Child ${i} - Class Level`] = child.classLevel;
            payload[`Child ${i} - Program`] = child.program;
            payload[`Child ${i} - Session`] = child.session;
            payload[`Child ${i} - Duration`] = child.duration;
            payload[`Child ${i} - Notes`] = child.notes || "-";
        });

        await fetch("https://formspree.io/f/mpwjrqjq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        alert("✅ Registration submitted successfully!");

        // Reset
        setParentData({ parentName: "", phone: "", email: "", consent: false });
        setChildren([
            {
                studentName: "",
                age: "",
                classLevel: "",
                program: "",
                session: "",
                duration: "",
                notes: "",
            },
        ]);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
                    Holiday Tech Talent Incubator Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 🔹 Parent Info */}
                    <div className="space-y-4 border-b pb-4">
                        <h3 className="font-semibold text-lg text-gray-800">
                            Parent / Guardian Info
                        </h3>
                        <input
                            type="text"
                            name="parentName"
                            placeholder="Parent Full Name"
                            value={parentData.parentName}
                            onChange={handleParentChange}
                            required
                            className="w-full p-3 border rounded-lg"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number (WhatsApp)"
                            value={parentData.phone}
                            onChange={handleParentChange}
                            required
                            className="w-full p-3 border rounded-lg"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email (optional)"
                            value={parentData.email}
                            onChange={handleParentChange}
                            className="w-full p-3 border rounded-lg"
                        />
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="consent"
                                checked={parentData.consent}
                                onChange={handleParentChange}
                                required
                            />
                            <span>I agree to be contacted via WhatsApp/Phone</span>
                        </label>
                    </div>

                    {/* 🔹 Children Info */}
                    {children.map((child, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-3">
                            <h3 className="font-semibold text-gray-700">
                                Child {index + 1}
                            </h3>
                            <input
                                type="text"
                                name="studentName"
                                placeholder="Student Full Name"
                                value={child.studentName}
                                onChange={(e) => handleChildChange(index, e)}
                                required
                                className="w-full p-3 border rounded-lg"
                            />
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={child.age}
                                onChange={(e) => handleChildChange(index, e)}
                                required
                                className="w-full p-3 border rounded-lg"
                            />
                            <select
                                name="classLevel"
                                value={child.classLevel}
                                onChange={(e) => handleChildChange(index, e)}
                                className="w-full p-3 border rounded-lg"
                                required
                            >
                                <option value="">-- Class Level --</option>
                                <option>Pre-primary</option>
                                <option>Primary</option>
                                <option>Secondary</option>
                                <option>Post-Form 4</option>
                            </select>
                            <select
                                name="program"
                                value={child.program}
                                onChange={(e) => handleChildChange(index, e)}
                                className="w-full p-3 border rounded-lg"
                                required
                            >
                                <option value="">-- Program Group --</option>
                                <option>3–8 yrs</option>
                                <option>9–12 yrs</option>
                                <option>13–18 yrs</option>
                                <option>18+ yrs</option>
                            </select>
                            <select
                                name="session"
                                value={child.session}
                                onChange={(e) => handleChildChange(index, e)}
                                className="w-full p-3 border rounded-lg"
                            >
                                <option value="">-- Session --</option>
                                <option>Morning</option>
                                <option>Afternoon</option>
                                <option>Full Day</option>
                            </select>
                            <select
                                name="duration"
                                value={child.duration}
                                onChange={(e) => handleChildChange(index, e)}
                                className="w-full p-3 border rounded-lg"
                            >
                                <option value="">-- Duration --</option>
                                <option>2–3 hrs</option>
                                <option>4–5 hrs</option>
                            </select>
                            <textarea
                                name="notes"
                                placeholder="Special Needs / Notes"
                                value={child.notes}
                                onChange={(e) => handleChildChange(index, e)}
                                className="w-full p-3 border rounded-lg"
                            />
                            {children.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeChild(index)}
                                    className="text-red-600 text-sm"
                                >
                                    Remove Child
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Add Another Child */}
                    <button
                        type="button"
                        onClick={addChild}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
                    >
                        ➕ Add Another Child
                    </button>

                    {/* Submit */}
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
