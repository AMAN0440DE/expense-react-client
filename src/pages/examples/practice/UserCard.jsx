function UserCard({ name, age, location, isPremium }) {
    return (
        <>
            <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '8px' }}>
                <h1>{name}</h1>
                <p>Age: {age}</p>
                <p>Location: {location}</p>
                <p>
                    {isPremium ? (
                        <span style={{ color: 'gold', fontWeight: 'bold' }}>🌟 VIP Member</span>
                    ) : (
                        <span style={{ color: 'gray' }}>Standard Member</span>
                    )}
                </p>
            </div>
        </>
    );
}

export default UserCard;
