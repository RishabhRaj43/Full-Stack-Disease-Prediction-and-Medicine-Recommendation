# Backend API Calls

## Auth Routes
- Create a new user - [POST] /api/user/auth/signup
- Login a user - [POST] /api/user/auth/login
- Logout a user - [POST] /api/user/auth/logout
- Verification Code = [POST] /api/user/auth/verification-code
- Verify Existing User = [POST] /api/user/auth/verify

## Appointment Routes
- Get all appointments - [GET] /api/user/appointment/get-all-appointments
- Create a new appointment - [POST] /api/user/appointment/create-appointment
- Cancel an appointment - [POST] /api/user/appointment/cancel-appointment

## AI Routes
- Generate Answer - [POST] /ai/chat