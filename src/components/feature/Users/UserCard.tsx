"use client";

import { useState } from "react";
import type { User } from "@/models/User";

interface UserCardProps {
  user: User;
  onCancel: () => void;
}

function UserCard({ user, onCancel }: UserCardProps) {
  const [form, setForm] = useState({
    userName: user.userName ?? "",
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email ?? "",
    dateOfBirth: user.dateOfBirth ?? "",
  });

  return (
    <form onSubmit={event => event.preventDefault()}>
      <div className="mb-3">
        <label className="form-label" htmlFor="edit-userName">Username</label>
        <input id="edit-userName" className="form-control" type="text"
          value={form.userName}
          onChange={event => setForm(previous => ({ ...previous, userName: event.target.value }))} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="edit-firstName">First name</label>
        <input id="edit-firstName" className="form-control" type="text"
          value={form.firstName}
          onChange={event => setForm(previous => ({ ...previous, firstName: event.target.value }))} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="edit-lastName">Last name</label>
        <input id="edit-lastName" className="form-control" type="text"
          value={form.lastName}
          onChange={event => setForm(previous => ({ ...previous, lastName: event.target.value }))} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="edit-dateOfBirth">Date of birth</label>
        <input id="edit-dateOfBirth" className="form-control" type="date"
          value={form.dateOfBirth}
          onChange={event => setForm(previous => ({ ...previous, dateOfBirth: event.target.value }))} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="edit-email">Email</label>
        <input id="edit-email" className="form-control" type="email"
          value={form.email}
          onChange={event => setForm(previous => ({ ...previous, email: event.target.value }))} />
      </div>
      <p className="text-body-secondary">Changes are not saved yet.</p>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default UserCard;
