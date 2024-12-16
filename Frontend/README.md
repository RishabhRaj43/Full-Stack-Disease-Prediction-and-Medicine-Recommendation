# API Documentation

This document provides an overview of the backend API endpoints for both **Users** and **Doctors**, categorized by their functionality. The routes are well-structured and organized for clarity and ease of use.

## Table of Contents

- [User/Doctor Authentication Routes](#userdoctor-authentication-routes)
- [User Appointment Routes](#user-appointment-routes)
- [Doctor Appointment Routes](#doctor-appointment-routes)
- [Post Routes for Users](#post-routes-for-users)
- [Post Routes for Doctors](#post-routes-for-doctors)
- [Doctor Info Routes for Users](#doctor-info-routes-for-users)
- [Prediction Routes](#prediction-routes)
- [AI Routes](#ai-routes)

---

## User/Doctor Authentication Routes

### User Routes
- **Get Current User**:  
  `[GET] /api/user/auth/current`  
  _getCurrentUser()_

- **Signup**:  
  `[POST] /api/user/auth/signup`  
  _userSignup(username, email, password, gender, phoneNumber)_

- **Login**:  
  `[POST] /api/user/auth/login`  
  _userLogin(email, password)_

- **Update User Profile**:  
  `[POST] /api/user/auth/update`  
  _userUpdate(username, email, password, gender, phoneNumber)_

- **Logout**:  
  `[POST] /api/user/auth/logout`  
  _userLogout()_

- **Request Verification Code**:  
  `[POST] /api/user/auth/verification-code`

- **Verify User**:  
  `[POST] /api/user/auth/verify`  
  _userVerify(emailId, verificationCode)_

---

### Doctor Routes
- **Get Current Doctor**:  
  `[GET] /api/doctor/auth/current`  
  _getCurrentDoctor()_

- **Signup**:  
  `[POST] /api/doctor/auth/signup`  
  _doctorSignup(username, email, password, gender, phoneNumber, specialization, experience, fees)_

- **Login**:  
  `[POST] /api/doctor/auth/login`  
  _doctorLogin(email, password)_

- **Update Doctor Profile**:  
  `[POST] /api/doctor/auth/update`  
  _doctorUpdate(username, email, password, gender, phoneNumber)_

- **Logout**:  
  `[POST] /api/doctor/auth/logout`  
  _doctorLogout()_

- **Verify Doctor**:  
  `[POST] /api/doctor/auth/verify`  
  _doctorVerify(emailId, verificationCode)_

---

## User Appointment Routes

- **Get All Appointments**:  
  `[GET] /api/user/appointment/get-all-appointments`  
  _getAllAppointments()_

- **Create New Appointment**:  
  `[POST] /api/user/appointment/create-appointment`  
  _createAppointment(doctorId, date, time, status)_

- **Cancel Appointment**:  
  `[POST] /api/user/appointment/cancel-appointment`  
  _cancelAppointment(appointmentId)_

---

## Doctor Appointment Routes

- **Get All Doctor Appointments**:  
  `[GET] /api/doctor/doctor-appointment/get-all-appointments`  
  _getAllDoctorAppointments()_

---

## Post Routes for Users

- **Get All Posts**:  
  `[GET] /api/user/doctor-post`  
  _getAllDoctorPosts()_

- **Like a Post**:  
  `[POST] /api/user/doctor-post/like-post`  
  _likeDoctorPost(postId)_

- **Unlike a Post**:  
  `[POST] /api/user/doctor-post/unlike-post`  
  _dislikeDoctorPost(postId)_

- **Get Favorite Posts**:  
  `[GET] /api/user/doctor-post/get-fav-posts`  
  _getFavPost()_

---

## Post Routes for Doctors

- **Create a New Post**:  
  `[POST] /api/doctor/doctor-post/create-post`  
  _createPost(title, content)_

- **Delete a Post**:  
  `[POST] /api/doctor/doctor-post/delete-post`  
  _deletePost(postId)_

---

## Doctor Info Routes for Users

- **Get Most Liked Doctors**:  
  `[GET] /api/doctor/doctor-info/get-most-liked-doctors`  
  _getMostLikedDoctors()_

- **Like a Doctor**:  
  `[POST] /api/user/doctor-info/like-doctor`  
  _likeDoctor(doctorId)_

- **Unlike a Doctor**:  
  `[POST] /api/user/doctor-info/unlike-doctor`  
  _unlikeDoctor(doctorId)_

---

## Prediction Routes

- **Get Prediction**:  
  `[POST] /api/predict`  
  _predictDisease(checkItems)_  
  *(Takes an array with 0/1 values as input)*

- **Get Disease Information**:  
  `[POST] /api/get-disease`  
  _getDiseaseInfo(disease)_

---

## AI Routes

- **Generate AI Answer**:  
  `[POST] /ai/chat`  
  _chatWithAi(message)_

---

