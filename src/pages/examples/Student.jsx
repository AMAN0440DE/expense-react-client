function Student(){
    let name = "Tommy";
    let rollNumber = 10;

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

export default Student;  // now student become publically availabe to everyone
// jsx = js+ css+ html java Script Extended created by REACT
// <> </> emty node created and we can add html codes there in jsx format
// outside return all are js and inside return all are jsx codes
// evevry coponent must return single parent node which will be rendered