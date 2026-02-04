import { useState } from "react";

function GroupCard({ group }) {
    const [showMembers, setShowMembers] = useState(false);
    const [MemberEmails, setMemberEmails] = useState('');


    const handleShowMember = () => {
        setShowMembers(!showMembers);
    };

    const handleAddMember = async ()
    return (
        <div className="card h-100 border-0 shadow sm rounded-4 position-relative">
            <div className="card-body p-4">
                <div>
                    <h5 className="">{group.name}</h5>
                    <button className="btn btn-sm btn-link p-0" onClick={handleShowMember}>
                        {group.membersEmail.length} Members | Show Members
                    </button>
                </div>
                <p>{group.description}</p>

                {showMembers && (
                    <div className="rounded-3 p-3 mb-3 border">
                        <h6>Members in this Group</h6>
                        {group.membersEmail.map((member, index) => (
                            <div key={index}>{index + 1}. {member}</div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
// Save Backend/Database Call
// In Groups.jsx, we pass an onSuccess prop to CreateGroupModal. The onSuccess function should receive the
// newly added group's details from the modal and append them to the groups state. This allows us to display
// the new group immediately without making an additional API call.
export default GroupCard;