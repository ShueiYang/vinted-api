# Vinted - Rest API project

A project learning from [Le Reacteur](https://github.com/lereacteur) to rebuid the backend using REST API for Vinted, a website where we can buy, sell, or trade clothes, shoes and accessories !

The [frontend](https://github.com/ShueiYang/vinted-project) connecting to this project.

![Alt text](https://github.com/ShueiYang/vinted-project/blob/main/public/images/Screenshot.png)


To keep "learning by doing" I also build some new route for User in order for them to update profile, delete the account, update the password and the possibility to Reset the password.

#
## New additional route for User
<br>

### /user/ (GET)

Get user

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /user/update (PUT)

Edit user

| Body        | Type    | Required |
| ----------  | ------  | -------- |
| `username`  | string  | No       |
| `avatar`    | image   | No       |
| `newsletter`| boolean | No       |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /user/update-password (PUT)

Edit User Password

| Body          | Type   | Required |
| ----------    | ------ | -------- |
| `oldPassword` | string | Yes      |
| `newPassword` | string | Yes      |

<br>

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>
<br>

### /user/delete (DELETE)

Delete User

| Headers        | Required | Description |
| -------------- | -------- | ----------- |
| `Bearer token` | Yes      | user token  |

<br>

#
## Reset password route for User
<br>

### /user/forgot-password (POST)

Request reset password

| Body    | Type   | Required |
| ------- | ------ | -------- |
| `email` | string | Yes      |

<br>
<br>

### /user/reset-password/:id/:token (GET)

This route can be used to check and validate before sending a reset password page to user.


| Param  | Required | Description |
| -----  | -------- | ----------- |
| `id`   | Yes      | User id     |
|`token` | Yes      | User token  |

<br>
<br>

### /user/reset-password/:id/:token (POST)
Reset user password

| Body             | Type   | Required |
| ---------------- | ------ | -------- |
| `password`       | string | Yes      |
| `confirmPassword`| string | Yes      |

<br>

| Param  | Required | Description |
| -----  | -------- | ----------- |
| `id`   | Yes      | User id     |
|`token` | Yes      | User token  |
