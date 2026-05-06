react 4layers of architecture

UI
=> components
=> pages

hook => manage state and api calls
=> custom hooks

state => data store
=> auth.context.jsx
=> ai.context.jsx

api => for communication with backend
=> services
    =>auth.api.js


//features
ui will give us 3 features 
1. self description
2. Resume [pdf]
3. targeted job description


this 3 things will be provided to our ai (api) from server and ai will give us 
as a REPORT
1. technical question 
2. behavioral question
3. skill Gaps
4. preperation plan 

this report user can see later also for which we have to store it in database
so we have to create a schema also ....and then we have to create the endpoint also