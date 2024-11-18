# Backend API Calls

## USER/DOCTOR AUTH ROUTES ✔️

- Get Current User - [GET] /api/(user/doctor)/auth/current
  **getCurrentUser()**
- Create a new user - [POST] /api/(user/doctor)/auth/signup
  **userSignup(username, email, password, gender, phoneNumber)**
  **doctorSignup(username,email,password,gender,phoneNumber,specialization,experience,fees,)**
- Login a user - [POST] /api/(user/doctor)/auth/login
  **(user/doctor)Login(email, password)**
- Update a user - [POST] /api/(user/doctor)/auth/update
  **(user/doctor)Update(username, email, password, gender, phoneNumber)**
- Logout a user - [POST] /api/(user/doctor)/auth/logout
  **(user/doctor)Logout()**
- Verification Code = [POST] /api/(user/doctor)/auth/verification-code
- Verify Existing User = [POST] /api/(user/doctor)/auth/verify
  **(user/doctor)Verify(emailId, verificationCode)**

## APPOINTMENT ROUTES FOR USER ✔️

- Get all appointments - [GET] /api/user/appointment/get-all-appointments
  **getAllAppointments()**
- Create a new appointment - [POST] /api/user/appointment/create-appointment
  **createAppointment(doctorId, date, time, status)**
- Cancel an appointment - [POST] /api/user/appointment/cancel-appointment
  **cancelAppointment(appointmentId)**

## POST ROUTES FOR USER ✔️

- Get all posts - [GET] /api/user/doctor-post
  **getAllDoctorPosts()**
- Like a post - [POST] /api/user/doctor-post/like-post
  **likeDoctorPost(postId)**
- Unike a post - [POST] /api/user/doctor-post/unlike-post
  **dislikeDoctorPost(postId)**
- Get Fav Post - [GET] /api/user/doctor-post/get-fav-posts
  **getFavPost()**

## DOCTOR ROUTES FOR USER ✔️

- Like a Doctor - [POST] /api/user/doctor-info/like-doctor
  **likeDoctor(doctorId)**
- Unike a Doctor - [POST] /api/user/doctor-info/unlike-doctor

## POST ROUTES FOR DOCTOR ✔️

- Create a new post - [POST] /api/doctor/doctor-post/create-post
  **createPost(title,content)**
- Delete a post - [POST] /api/doctor/doctor-post/delete-post
  **deletePost(postId)**

## DOCTOR INFO FOR USER ✔️

- Get most liked doctor - [GET] /api/doctor/doctor-info/get-most-liked-doctors
  **getMostLikedDoctors()**

## PREDICTION ROUTES ✔️

- Get prediction - [POST] /api/predict
  **predictDisease(checkItems)** <!-- It takes a array with 0/1 value -->
- Get Disease Info - [POST] /api/get-disease
  **getDiseaseInfo(disease)**

## Chat Routes <!-- This will be added later -->

## AI Routes ✔️

- Generate Answer - [POST] /ai/chat
  **chatWithAi(message)**
