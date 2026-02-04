import axios from "axios";
import { serverEndpoint } from "../config/appConfig";
import { useEffect, useState } from "react";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";

function Groups() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchGroups = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/groups/my-groups`, { withCredentials: true });
            setGroups(response.data.groups);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleGroupCreated = () => {
        fetchGroups();
    };

    if (loading) {
        return (
            <div className="container p-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container p-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Groups</h2>
                <button
                    className="btn btn-primary rounded-pill px-4"
                    onClick={() => setShowModal(true)}
                >
                    + Create Group
                </button>
            </div>

            {groups.length === 0 && (
                <div className="text-center mt-5">
                    <p className="text-muted fs-5">No groups found, Start by creating one!</p>
                </div>
            )}
            {groups.length > 0 && (
                <div className="row g-4">
                    {groups.map((group) => (
                        <div className="col-md-6 col-lg-4" key={group._id}>
                            <GroupCard group={group} />
                        </div>
                    ))}
                </div>
            )}

            <CreateGroupModal
                show={showModal}
                onHide={handleModalClose}
                onSuccess={handleGroupCreated}
            />
        </div>
    );
}

export default Groups;