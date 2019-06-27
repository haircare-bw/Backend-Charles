## Server is live on:

https://hair-care.herokuapp.com/

# AUTH ROUTE

## **REGISTER - USER**

_Method Url:_ `/api/auth/register`

_HTTP method:_ **[POST]**

#### The Registration Body

| name           | type    | required | description          |
| -------------- | ------- | -------- | -------------------- |
| `email`        | String  | Yes      | Must be unique       |
| `password`     | String  | Yes      |                      |
| `stylist`      | Boolean | No       | Pass in true for yes |
|                |         |          | and false for no     |

_example:_

```
{
    email: email@email.com,
    password: "password",
    stylist: 
}
```

#### Response

##### 201 (Created)

> If you successfully register a User the endpoint will return an HTTP response with a status code `201` and a body as below.

```
{
    "message": "You have Successfully registered"
}
```

----

## **LOGIN**

_Users Method Url:_ `/api/users/login`

_HTTP method:_ **[POST]**

#### Body

| name             | type   | required | description                                                        |
| ---------------- | ------ | -------- | ------------------------------------------------------------------ |
| `email`          | String | Yes      | Must match email in the database                                   |
| `password`       | String | Yes      | Must match a password in the database corresponding to above email |

_example:_

```
{
  email: "email@email.com",
  password: "password"
}
```

----

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "message": "Welcome!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo4LCJ1c2VybmFtZSI6ImVtYUB5YWhvby5jb20iLCJpYXQiOjE1NjE2NjQ0MTcsImV4cCI6MTU2MTc1MDgxN30.kbWfime8IHY0PtQJhVpkqjCjlmjvSJpV7nfQMEhaLjo",
    "ID": 2,
    "type": 1
}
```

----

# USERS ROUTES

## **GET STYLIST USERS**

_Method Url:_ `/api/users`

_HTTP method:_ **[GET]**

#### Response

##### 200 (OK)

```
[
    {
        "id": 1,
        "user_id": 2,
        "username": "Charles",
        "about": "I am a stylist that has in eye for detail making my cuts and color stand out more than my peers",
        "skills": "cut color",
        "profile_img": "https://source.unsplash.com/200x200/?hair"
    },
    {
        "id": 2,
        "user_id": 3,
        "username": "Ashley",
        "about": "I am a stylist that has in eye for detail making my styles stand out more than my peers",
        "skills": "up-dos down-dos",
        "profile_img": "https://source.unsplash.com/200x200/?hair"
    },
    {
        "id": 3,
        "user_id": 4,
        "username": "Jessica",
        "about": "I am an all around hair stylist great at every part of the process",
        "skills": "cut color styles nails",
        "profile_img": "https://source.unsplash.com/200x200/?hair"
    }
]
```

----

## **GET ALL USERS**

_Method Url:_ `/api/users/all`

_HTTP method:_ **[GET]**

#### Response

##### 200 (OK)

```
[
    {
        "email": "kedasha@yahoo.com",
        "stylist": 0
    },
    {
        "email": "charles@yahoo.com",
        "stylist": 1
    },
    {
        "email": "ashley@yahoo.com",
        "stylist": 1
    },
    {
        "email": "jessica@yahoo.com",
        "stylist": 1
    },
    {
        "email": "charlie@yahoo.com",
        "stylist": 0
    },
    {
        "email": "miss@yahoo.com",
        "stylist": null
    },
    {
        "email": "email@yahoo.com",
        "stylist": null
    },
    {
        "email": "ema@yahoo.com",
        "stylist": null
    }
]
```

----

## **GET USER BY ID**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[GET]**

#### Response

##### 200 (OK)

```
{
    "stylist": {
        "id": 1,
        "user_id": 2,
        "username": "Charles",
        "about": "I am a stylist that has in eye for detail making my cuts and color stand out more than my peers",
        "skills": "cut color",
        "profile_img": "https://source.unsplash.com/200x200/?hair",
        "portfolio": [
            {
                "id": 1,
                "stylists_id": 1,
                "portfolio_image": "https://source.unsplash.com/400x400/?hair"
            },
            {
                "id": 2,
                "stylists_id": 1,
                "portfolio_image": "https://source.unsplash.com/400x400/?hair"
            },
            {
                "id": 3,
                "stylists_id": 1,
                "portfolio_image": "https://source.unsplash.com/400x400/?hair"
            },
            {
                "id": 4,
                "stylists_id": 1,
                "portfolio_image": "https://source.unsplash.com/400x400/?hair"
            }
        ],
        "posts": [
            {
                "id": 1,
                "stylists_id": 1,
                "title": "My first",
                "posts_image": "https://source.unsplash.com/400x400/?hair",
                "description": "this is my first post and I feel really good about it"
            },
            {
                "id": 2,
                "stylists_id": 1,
                "title": "My second",
                "posts_image": "https://source.unsplash.com/400x400/?hair",
                "description": "this is my second post and I feel really good about it"
            }
        ]
    }
}
```

----

## **UPDATE USER**

_Method Url:_ `/api/users/:id`

_Protected Route_ | User with the stylist role Only

_HTTP method:_ **[PUT]**

#### Response

##### 202 (Accepted)

```
{
    "message": "Update was Successful"
}
```

----

## **DELETE USER**

_Method Url:_ `/api/users/:id`

_Protected Route_ | User with the stylist role Only

_HTTP method:_ **[DELETE]**

#### Response

##### 202 (Accepted)

```
{
    "message": "User account removed successfully"
}
```

----

## **CREATE A NEW POST**

_Method Url:_ `/api/users/posts`

_HTTP method:_ **[POST]**

#### Response

##### 200 (OK)

```
{
    "message": "Post created, congratulations!!!"
}
```

----

## **UPDATE POST**

_Method Url:_ `/api/users/:id/posts`

_HTTP method:_ **[PUT]**

#### Response

##### 200 (OK)

```
{
    "message": "Post Successfully Updated, congratulations!!!"
}
```

----

## **DELETE POST**

_Method Url:_ `/api/users/:id/posts`

_Protected Route_ | User with the stylist role Only

_HTTP method:_ **[DELETE]**

#### Response

##### 202 (Accepted)

```
{
    "message": "User post removed successfully"
}
```

----
