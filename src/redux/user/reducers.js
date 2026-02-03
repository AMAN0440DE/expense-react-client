
import { CLEAR_USER, SET_USER} from './action';


// gets called everytime dispatch function called
// irrespective of the action and payload

export const userReducer = (state = null, action) => {
    switch (action.type) {

        // this action helps in login fuctionality
        case SET_USER:
            return action.payload;

        // this case helps in logout functionality
        case CLEAR_USER:
            return null;

        // tis case helps in handling case where userReucer
        // is inoked due to change in some other state variables
        default:
            return state;
    }
};