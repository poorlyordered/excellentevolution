"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function AccountPage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(session?.user?.avatarUrl || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMessage, setPwMessage] = useState<string | null>(null);
  const [pwSaving, setPwSaving] = useState(false);

  if (!session) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    // Update name
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      setMessage("Failed to update profile.");
      setSaving(false);
      return;
    }

    // Upload avatar if changed
    if (avatarFile) {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      const avatarRes = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
      });
      if (!avatarRes.ok) {
        setMessage("Failed to upload avatar.");
        setSaving(false);
        return;
      }
    }

    setMessage("Profile updated!");
    setSaving(false);
    update(); // Refresh session data
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMessage(null);

    if (newPassword !== confirmPassword) {
      setPwMessage("New passwords do not match.");
      return;
    }
    setPwSaving(true);

    const res = await fetch("/api/user/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setPwMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPwMessage(data.error || "Failed to change password.");
    }
    setPwSaving(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <form className="space-y-6" onSubmit={handleProfileSave}>
        <div className="flex items-center gap-4">
          <div>
            <Image
              src={avatarPreview || "/avatars/default.png"}
              alt="Avatar"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover border"
            />
          </div>
          <div>
            <button
              type="button"
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload/Change Avatar
            </button>
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded bg-gray-100"
            value={session.user?.email || ""}
            disabled
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Profile Changes"}
        </button>
        {message && <div className="text-center mt-2">{message}</div>}
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form className="space-y-4" onSubmit={handlePasswordChange}>
          <div>
            <label className="block font-medium mb-1">Current Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500"
            disabled={pwSaving}
          >
            {pwSaving ? "Changing..." : "Change Password"}
          </button>
          {pwMessage && <div className="text-center mt-2">{pwMessage}</div>}
        </form>
      </div>
    </div>
  );
}