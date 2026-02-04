import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

function CreateGroupModal({ show, onHide, onSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const [memberEmails, setMemberEmails] = useState([]);
    const [currentEmail, setCurrentEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAddMember = () => {
        if (!currentEmail.trim()) {
            return;
        }

        if (!validateEmail(currentEmail)) {
            setErrors({ ...errors, email: "Please enter a valid email address" });
            return;
        }

        if (memberEmails.includes(currentEmail)) {
            setErrors({ ...errors, email: "This email is already added" });
            return;
        }

        setMemberEmails([...memberEmails, currentEmail]);
        setCurrentEmail("");
        setErrors({ ...errors, email: "" });
    };

    const handleRemoveMember = (emailToRemove) => {
        setMemberEmails(memberEmails.filter(email => email !== emailToRemove));
    };

    const handleEmailKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddMember();
        }
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;

        if (formData.name.length < 3) {
            newErrors.name = "Group name must be at least 3 characters long";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setErrors({});
        if (validate()) {
            setLoading(true);
            try {
                const body = {
                    name: formData.name,
                    description: formData.description,
                    membersEmail: memberEmails.length > 0 ? memberEmails : undefined
                };
                const config = { withCredentials: true };
                const response = await axios.post(`${serverEndpoint}/groups/create`, body, config);
                setMessage("Group created successfully");
                setFormData({ name: "", description: "" });
                setMemberEmails([]);
                setCurrentEmail("");
                if (onSuccess) onSuccess();
                setTimeout(() => {
                    onHide();
                }, 1500);
            } catch (error) {
                console.error(error);
                setErrors({
                    message: error.response?.data?.message || "Failed to create group"
                });
            } finally {
                setLoading(false);
            }
        }
    };

    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop show"></div>
            <div className="modal show d-block">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content border-0 rounded-4 shadow">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header border-0">
                                <h5 className="modal-title">Create Group</h5>
                                <button type="button" className="btn-close" onClick={onHide}></button>
                            </div>
                            <div className="modal-body">
                                {message && <div className="alert alert-success">{message}</div>}
                                {errors.message && <div className="alert alert-danger">{errors.message}</div>}

                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Group Name *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g., Weekend Trip to Goa"
                                        required
                                    />
                                    {errors.name && <small className="text-danger">{errors.name}</small>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Description</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="What's this group for?"
                                        rows="2"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Add Members</label>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={currentEmail}
                                            onChange={(e) => setCurrentEmail(e.target.value)}
                                            onKeyPress={handleEmailKeyPress}
                                            placeholder="Enter member email and press Add"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={handleAddMember}
                                        >
                                            + Add
                                        </button>
                                    </div>
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                    <small className="text-muted d-block mt-1">
                                        Press Enter or click Add to add members. You'll be added automatically as admin.
                                    </small>
                                </div>

                                {memberEmails.length > 0 && (
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">
                                            Members ({memberEmails.length})
                                        </label>
                                        <div className="border rounded p-3 bg-light" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                            {memberEmails.map((email, index) => (
                                                <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-white rounded">
                                                    <span className="text-truncate">{email}</span>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger ms-2"
                                                        onClick={() => handleRemoveMember(email)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer border-0">
                                <button
                                    type="button"
                                    className="btn btn-light rounded-pill"
                                    onClick={onHide}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-pill"
                                    disabled={loading}
                                >
                                    {loading ? "Creating..." : "Create Group"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateGroupModal;