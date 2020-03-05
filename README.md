# rsound
Ironhack individual final project.

## Endpoints table

### Sever

| Action                | Endpoint              | Task                  |
| --------------------- | --------------------- | --------------------- |
| POST                  | api/auth/login        | Start session         |
| POST                  | api/auth/singup       | Create user           | 
| GET                   | api/auth/logout       | Logout                | 

### Client
| Action                | Endpoint              | Task                  |
| --------------------- | --------------------- | --------------------- |
| GET                   | /                     | Index/projects list   |
| GET                   | /profile              | Go to user's profile  |  
| POST                  | /upload               | Upload files          |
| GET                   | /details/:id          | Get project details   |
| POST                  | /new/:id              | Create new project    |

