// conditional rendering - we use short circuiting using AND OR condition
function Student3({name, rollNumber, percentage}){
    return (
        <>
            {percentage > 33.0 &&(           // AND is used , we start and end with parenthesis() for jsx and inside we take in curly {} 
                <p>
                    Student Name: {name}
                    <br/>
                    Roll Number: {rollNumber}
                    <br/>
                    Percentage: {percentage}
                    <br/>
                    Result: Pass
                </p>

            )}
            {percentage <= 33.0 &&(           
                <p>
                    Student Name: {name}
                    <br/>
                    Roll Number: {rollNumber}
                    <br/>
                    Percentage: {percentage}
                    <br/>
                    Result: Fail
                </p>

            )}

        </>
    )
}