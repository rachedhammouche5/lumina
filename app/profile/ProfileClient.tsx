"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Camera, Eye, EyeOff, Lock, Mail, Shield, Trash2, User } from "lucide-react";
import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { createClient } from "@/lib/supabase/client";
import { deleteAccount } from "./actions";

type ProfileClientProps = {
  name: string;
  email: string;
  avatarUrl: string | null;
  level: string | null;
  roleLabel: string;
  role: "student" | "teacher" | "teacher_pending" | "admin" | null;
  userId: string;
};

type TabId = "profile" | "security" | "danger";

export default function ProfileClient({
  name,
  email,
  avatarUrl,
  level,
  roleLabel,
  role,
  userId,
}: ProfileClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl);
  const [photoStatus, setPhotoStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const fileInputId = useId();

  useEffect(() => {
    setAvatarPreview(avatarUrl);
  }, [avatarUrl]);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const onChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    if (password.length < 8) {
      setStatus({ type: "error", message: "Password must be at least 8 characters long." });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus({ type: "error", message: error.message });
      setLoading(false);
      return;
    }

    setStatus({ type: "success", message: "Password updated successfully." });
    setPassword("");
    setConfirmPassword("");
    setLoading(false);
  };

  const onDeleteAccount = async () => {
    const confirmed = window.confirm(
      "This will permanently delete your account and data. Are you sure?",
    );
    if (!confirmed) return;

    setDeleting(true);
    setDeleteError("");

    const result = await deleteAccount();
    if ("error" in result) {
      setDeleteError(result.error);
      setDeleting(false);
      return;
    }

    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  };

  const canEditPhoto = role === "student" || role === "teacher" || role === "teacher_pending";

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const updatePhotoInDb = async (nextPhoto: string | null) => {
    if (!canEditPhoto) {
      return "Photo updates are not available for this role.";
    }

    if (role === "student") {
      const { error } = await supabase
        .from("Student")
        .update({ std_pfp: nextPhoto })
        .eq("std_id", userId);
      return error?.message ?? null;
    }

    if (role === "teacher") {
      const { error } = await supabase
        .from("Teacher")
        .update({ tchr_pfp: nextPhoto })
        .eq("tchr_id", userId);
      return error?.message ?? null;
    }

    if (role === "teacher_pending") {
      const [studentUpdate, teacherUpdate] = await Promise.all([
        supabase.from("Student").update({ std_pfp: nextPhoto }).eq("std_id", userId),
        supabase.from("Teacher").update({ tchr_pfp: nextPhoto }).eq("tchr_id", userId),
      ]);

      if (studentUpdate.error && teacherUpdate.error) {
        return studentUpdate.error.message;
      }
      return null;
    }

    return "Photo updates are not available for this role.";
  };

  const onChangePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoStatus({ type: "error", message: "Please select an image file." });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoStatus({ type: "error", message: "Image must be 2MB or less." });
      return;
    }

    try {
      setPhotoLoading(true);
      setPhotoStatus(null);
      const previousPreview = avatarPreview;
      const dataUrl = await readFileAsDataUrl(file);
      setAvatarPreview(dataUrl);

      const errorMessage = await updatePhotoInDb(dataUrl);
      if (errorMessage) {
        setAvatarPreview(previousPreview ?? null);
        setPhotoStatus({ type: "error", message: errorMessage });
        setPhotoLoading(false);
        return;
      }

      setPhotoStatus({ type: "success", message: "Profile photo updated." });
      setPhotoLoading(false);
    } catch (err) {
      setPhotoStatus({ type: "error", message: "Failed to upload photo." });
      setPhotoLoading(false);
    }
  };

  const onRemovePhoto = async () => {
    if (!avatarPreview) return;

    const confirmed = window.confirm("Remove your profile photo?");
    if (!confirmed) return;

    setPhotoLoading(true);
    setPhotoStatus(null);

    const errorMessage = await updatePhotoInDb(null);
    if (errorMessage) {
      setPhotoStatus({ type: "error", message: errorMessage });
      setPhotoLoading(false);
      return;
    }

    setAvatarPreview(null);
    setPhotoStatus({ type: "success", message: "Profile photo removed." });
    setPhotoLoading(false);
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "security", label: "Security", icon: <Shield size={16} /> },
    { id: "danger", label: "Danger", icon: <AlertTriangle size={16} /> },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex flex-col items-start gap-2">
            <div className="relative h-20 w-20 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/70 flex items-center justify-center text-xl font-bold text-white">
              {avatarPreview ? (
                <img src={avatarPreview} alt={name} className="h-full w-full object-cover" />
              ) : (
                <span>{initials || "U"}</span>
              )}
            </div>
            {canEditPhoto ? (
              <div className="flex flex-wrap items-center gap-2">
                <label
                  htmlFor={fileInputId}
                  aria-label={avatarPreview ? "Change profile photo" : "Add profile photo"}
                  title={avatarPreview ? "Change profile photo" : "Add profile photo"}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white/80 hover:text-white hover:border-white/20 ${
                    photoLoading ? "pointer-events-none opacity-60" : ""
                  }`}
                >
                  <Camera size={16} />
                </label>
                {avatarPreview ? (
                  <button
                    type="button"
                    onClick={onRemovePhoto}
                    disabled={photoLoading}
                    aria-label="Remove profile photo"
                    title="Remove profile photo"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-400/40 bg-rose-500/10 text-rose-100 hover:text-rose-50 hover:border-rose-300/60 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 size={16} />
                  </button>
                ) : null}
                <input
                  id={fileInputId}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={onChangePhoto}
                  disabled={photoLoading}
                />
              </div>
            ) : null}
          </div>

          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Profile</p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{name}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                {roleLabel}
              </span>
              {level ? (
                <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-orange-200">
                  Level: {level}
                </span>
              ) : null}
            </div>
            {photoStatus ? (
              <p className={photoStatus.type === "error" ? "mt-2 text-xs text-red-300" : "mt-2 text-xs text-emerald-300"}>
                {photoStatus.message}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="flex flex-wrap gap-2 border-b border-slate-800 bg-slate-950/40 px-4 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={
                activeTab === tab.id
                  ? "flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-100"
                  : "flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 hover:text-white hover:border-white/20"
              }
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "profile" ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-widest text-white/50">Name</p>
                <p className="mt-2 text-lg font-semibold">{name}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-widest text-white/50">Email</p>
                <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                  <Mail size={16} className="text-orange-300" />
                  <span>{email}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-widest text-white/50">Level</p>
                  <p className="mt-2 text-lg font-semibold">{level ?? "Not set"}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-widest text-white/50">Role</p>
                  <p className="mt-2 text-lg font-semibold">{roleLabel}</p>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "security" ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-orange-300" />
                <h3 className="text-xl font-black tracking-tight">Security</h3>
              </div>

              <form className="space-y-4" onSubmit={onChangePassword}>
                <div>
                  <label className="mb-1 block text-sm text-slate-300">New password</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="New password"
                    icon={<Lock size={16} />}
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="p-1 text-slate-400 hover:text-white"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-300">Confirm password</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm password"
                    icon={<Lock size={16} />}
                    required
                  />
                </div>

                {status ? (
                  <p className={status.type === "error" ? "text-sm text-red-400" : "text-sm text-emerald-300"}>
                    {status.message}
                  </p>
                ) : null}

                <Button type="submit" size="m" className="w-full" disabled={loading}>
                  {loading ? "Updating..." : "Change Password"}
                </Button>
              </form>
            </div>
          ) : null}

          {activeTab === "danger" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-rose-300" />
                <h3 className="text-xl font-black tracking-tight">Danger Zone</h3>
              </div>
              <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4">
                <p className="text-sm text-rose-200/80">
                  Delete your account permanently. This action cannot be undone.
                </p>
                {deleteError ? <p className="mt-2 text-sm text-rose-200">{deleteError}</p> : null}
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 w-full border-rose-300 text-rose-100 hover:bg-rose-500/20 hover:text-rose-50"
                  onClick={onDeleteAccount}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete Account"}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
