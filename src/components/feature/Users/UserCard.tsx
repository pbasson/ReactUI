"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { updateUser } from "@/services/userService";
import type { User } from "@/models/User";

interface UserCardProps {
  user: User;
  onCancel: () => void;
  onSaved: (message: string) => void;
  saving: boolean;
  onSavingChange: (saving: boolean) => void;
}

function UserCard({ user, onCancel, onSaved, saving, onSavingChange }: UserCardProps) {
  const [form, setForm] = useState({
    userName: user.userName ?? "",
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email ?? "",
    dateOfBirth: user.dateOfBirth ?? "",
  });

  const [error, setError] = useState<string | null>(null);
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    setError(null);
    if (![form.userName, form.firstName, form.lastName, form.email].every(value => value.trim())) {
      setError("Username, first name, last name, and email are required.");
      return;
    }

    submitting.current = true;
    onSavingChange(true);
    let savedMessage: string | undefined;
    try {
      const result = await updateUser({ ...form, id: user.id, dateOfBirth: form.dateOfBirth || null });
      if (result.success) savedMessage = result.message;
      else setError(result.message);
    } catch {
      setError("Unable to confirm the update. Please refresh the list before retrying.");
    } finally {
      submitting.current = false;
      onSavingChange(false);
    }
    if (savedMessage !== undefined) onSaved(savedMessage);
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={saving}>
      {error && <p role="alert" className="text-danger">{error}</p>}
      <fieldset disabled={saving}>
      <div className="mb-3">
        <label className="form-label" htmlFor="edit-userName">Username</label>
        <input id="edit-userName" className="form-control" type="text" required
          value={form.userName}
          onChange={event => setForm(previous => ({ ...previous, userName: event.target.value }))} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="edit-firstName">First name</label>
        <input id="edit-firstName" className="form-control" type="text" required
          value={form.firstName}
          onChange={event => setForm(previous => ({ ...previous, firstName: event.target.value }))} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="edit-lastName">Last name</label>
        <input id="edit-lastName" className="form-control" type="text" required
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
        <input id="edit-email" className="form-control" type="email" required
          value={form.email}
          onChange={event => setForm(previous => ({ ...previous, email: event.target.value }))} />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{saving ? "Saving…" : "Save changes"}</button>
      </div>
      </fieldset>
    </form>
  );
}

export default UserCard;
