/**
 * push everything except node modules and packagelock.json on github
 * 
 * clean the files
 * delete publuic files, App.jsx- all components except stated, main.jsx - alll css
 * 
 * //////////////////////////
 * 
 * REACT has hooks
 * like useState
 * anything that start with use is a hook
 * hook is used to compare withDOM
 * 
 * useStat
 * ----------
 * - variable
 * - return array with two value- array itself, function to change the value
 * - const[variable, function] = useState(default_value)
 * 
 * ////////////////////
 * RESPONSIVE web design
 * usually divides the screen into 12 columns- because 12 is mostly divisible by many no. below it
 * eg. bootstrap provides col class  - <div class "col" col-sm -12 col-md - 6 col-xl -2">
 * 
 * 
 * CDN content delivery network - collection of servers delivers the web contevnt and whichever server is nearest to client will be delivered and by this way 
 * it will be faster, CDN lives in different parts of the world when one loads the jS files it also downloads CDN files
 * 
 * integrate bootstrap using CDN
 * 
 * and components in bootstrap are in html and react uses jsx so need to converted to jsx from converter
 * // use the link to cdn in index.html
 * 
 * 
 * 
 * 
 * 
 * 
 * 







/////////////////////////////////REACT REDUX

                                                        Action           Payload
                                                        1    \            /   2
                                PROVIDER                         DISPATCH
                                ^                             / 
                                |                          /
                                |                        /
                                |                     /
                                |                   /
                                |     /           /
                                |               /
                                |             /
                                |           /
                                |         /
                                |       /
                                STORE <------------------------- REDUCER

                            Initialization Lo















In react redux
there are 4 maoin components -

1. Provider: Responsible for making all the values available to the entire aplication
2. Store: A place where all the ojects /values are stored
3. Reducers: Function which takes in action, payload(new data) , old data as input , and returns the new value
4. Dispatch: this is used when you want to signal change in the value of the object in the store. you passin action(type) and new value(payload)


Changing value in React Redux store
1. Call dispatch with action (type) and the new value(payload)
2. Dispatch informs Store in turn calls all tke reducers tkat are registered tke Store.
3. All reducers process the event returns updated value.
4. Store updates value and inform Provider.
5. Provider all useSeIeetors about value each useSeleetor take action Of re—render needed).

Reading the value from Store
l. You useSeIeetor hook and subscribe to value change events
2. useSeIeetor invoked every time there is change in corresponding value.
 */