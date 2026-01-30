function Student1({name = 'Tommy', rollNumber = 10}){      // we are using destructuring, Student2.jsx is without destructuring
    return (
        <>   
            <p>
                Student Name: {name}
                <br/>
                Roll Number: {rollNumber}
            </p>
        </>
    );
}

export default Student1; 