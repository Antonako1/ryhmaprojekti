# Backend

## .env
 Read the file!

## Endpoints
  All endpoints are: http[s]://{url}/api/{endpoints}

  Example: http://localhost:3333/api/{endpoints}

 - POST: /register
    - Creates new user entry.
    -   req.body: ```ts
            firstName: string, 
            lastName: string, 
            email: string, 
            password: string, 
            role: string, 
            balance: number
            ```
        
 - POST: /get-user
    - Gets user details and returns JWT token
    - req.body: ```
                email: string,
                password: string
                ```
    - returns on success:  ```
                message: string,
                user: user_details,
                token: JWT_TOKEN
                ```
 
 - POST: /set-user
    - Updates user information
    - req.body: ```
            token:number, 
            email:number, 
            passwor:numberd, 
            role:number, 
            balance: number, 
            firstName:string, 
            lastName:string 
            ```

 - POST: /all-cars
   - Fetches all cars
   - query: ?limit={limit}&offset={offset}

 - POST: /all-alcohol 
   - Fetches all alcohol
   - query: ?limit={limit}&offset={offset}
   
 - POST: /alcohol/{id}
   - Fetches specific alcohol
   - req.body: ```
               id:number
               ```

 - POST: /cars/{id}
   - Fetches specific car
   - req.body: ```
               id:number
               ```

 - GET /get-amount/car
   - Get amount of reviews and data entries for cars
   - response: ```
                AmountOfCars,
                AmountOfReviews
                ```

 - GET /get-amount/alcohol
   - Get amount of reviews and data entries for alcohols
   - response: ```
                AmountOfCars,
                AmountOfReviews
                ```


 - GET /ping
    - Tries connection to database
 