# nodeJs



1. Register User: Post call
    eg: http://localhost:3000/user/insert

    body: {
    "userName" : "Verma",
    "email" : "geeta@gmail.com",
    "password": "geeta"
    }

2. Login User: Post call
    eg: http://localhost:3000/user/login

    body: {
    "email" : "geeta@gmail.com",
    "password" : "geeta"
    }

3. Add task by user : Post call
    eg: http://localhost:3000/tasks

    body: {
    "title" : "task by geeta",
    "attachment": "geeta.jpeg",
    "due_date": "2022-11-23"
    }

    header: {
    "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiZ2VldGFAZ21haWwuY29tIiwiaWF0IjoxNjU5NjQ5MjkwLCJleHAiOjE2NTk2NTI4OTB9.LxYjih8cNPV_mmQ2v3LF7TeC3scKQjGFI4ChT4Q3EFo"
    }

4. Update task by user : Put call
    eg: http://localhost:3000/tasks/9

    body: {
    "title" : "task updated by geeta",
    "attachment": "geeta.jpeg",
    "due_date": "2022-11-23"
    }

    header: {
    "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiZ2VldGFAZ21haWwuY29tIiwiaWF0IjoxNjU5NjQ5MjkwLCJleHAiOjE2NTk2NTI4OTB9.LxYjih8cNPV_mmQ2v3LF7TeC3scKQjGFI4ChT4Q3EFo"
    }

5. Get task by user : Get call
    eg: http://localhost:3000/tasks

    header: {
    "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiZ2VldGFAZ21haWwuY29tIiwiaWF0IjoxNjU5NjQ5MjkwLCJleHAiOjE2NTk2NTI4OTB9.LxYjih8cNPV_mmQ2v3LF7TeC3scKQjGFI4ChT4Q3EFo"
    }

6. Delete task by user : delete call
    eg: http://localhost:3000/tasks/9
    
    header: {
    "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiZ2VldGFAZ21haWwuY29tIiwiaWF0IjoxNjU5NjQ5MjkwLCJleHAiOjE2NTk2NTI4OTB9.LxYjih8cNPV_mmQ2v3LF7TeC3scKQjGFI4ChT4Q3EFo"
    }
