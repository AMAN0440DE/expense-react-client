function EngineeringTeam({ employees }) {
    return (
        <>
            <div style={{ padding: '20px' }}>
                <h2>Engineering Team</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {employees
                        .filter((employee) => employee.department === "Engineering")
                        .map((employee) => (
                            employee.active && (
                                <li
                                    key={employee.id}
                                    style={{
                                        border: '1px solid #4CAF50',
                                        padding: '15px',
                                        margin: '10px 0',
                                        borderRadius: '5px',
                                        backgroundColor: '#e8f5e9'
                                    }}
                                >
                                    <h3 style={{ margin: '0', color: '#2e7d32' }}>
                                        {employee.name}
                                    </h3>
                                    <p style={{ margin: '5px 0', color: '#666' }}>
                                        <strong>Department:</strong> {employee.department}
                                    </p>
                                    <p style={{ margin: '5px 0', color: '#4CAF50' }}>
                                        <strong>Status:</strong> Active
                                    </p>
                                </li>
                            )
                        ))}
                </ul>
            </div>
        </>
    );
}

export default EngineeringTeam;
