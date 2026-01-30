import {useState} from "react";
function Student5(){      
    const [button, setButtonText] = useState('Hide Students');

    const studentList = [
        {name: 'Tommy', rollNumber: 1},
        {name: 'Pluto', rollNumber: 2},
        {name: 'Sudane', rollNumber: 3},

    ];
    const handleClick = () => {
        setVisible(() => {
            setButtonText(!visible ? 'Hide Students' : 'Display Students');
            return !visible;
        });
    };

    return(
        <div>
        <button onClick={handleClick}>{buttonText}</button>

        {visible && (
            <>
                {studentList.map((s) => (
                    <p>
                        Roll Number: {s.rollNumber}
                        <br/>
                        Name: {s.name}
                    </p>
                ))}
            </>
        )}

        </div>
    );
}


// as soon as refresh then state variable will go away
export default Student4;