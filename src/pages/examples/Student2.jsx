function Student2(props){      // without destructuring you need to manually take out values to render
    return (
        <>   
            <p>
                Student Name: {props.name}
                <br/>
                Roll Number: {props.rollNumber}
            </p>
        </>
    );
}

export default Student2; 