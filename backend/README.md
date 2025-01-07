# Backend

## .env
 Read the file!

## Endpoints
  All endpoints are: http[s]://{url}/api/{endpoints}

  Example: http://localhost:3333/api/{endpoints}

 - /register
    - Creates new user entry.
    -   req.body: ```ts
            firstName: string, 
            lastName: string, 
            email: string, 
            password: string, 
            role: string, 
            balance: number
            ```
        
 - /get-user
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
 
 - /set-user
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

 - /ping
    - Tries connection to database
 