import React from "react";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginSuccess from "./components/LoginSuccess";
import GroupChat from "./components/GroupChat";
import UsersList from "./components/UsersList";
import DocsList from "./components/DocsList";
import RegistrationSuccess from "./components/RegisterSuccess";
import EditUser from "./components/EditUser";
import Share from "./components/Share";
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="login-success" element={<LoginSuccess />} />
          <Route path="group-chat" element={<GroupChat />} />
          <Route path="users-list" element={<UsersList />} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="docs-list" element={<DocsList />} />
          <Route path="share/:id" element={<Share />} />
        </Route>
        <Route index element={<Welcome />} />
        <Route path="/logout" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;