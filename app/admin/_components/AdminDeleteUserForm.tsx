"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteUserAccount } from "@/features/users/actions/deleteUserAccount";

type AdminDeleteUserFormProps = {
  userId: string;
  buttonLabel: string;
};

export default function AdminDeleteUserForm({
  userId,
  buttonLabel,
}: AdminDeleteUserFormProps) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <form action={deleteUserAccount} className="flex flex-col gap-2">
      <input type="hidden" name="userId" value={userId} />
      <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
        <input
          type="checkbox"
          name="confirmDelete"
          required
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-500 bg-slate-950 text-rose-500 focus:ring-rose-400"
        />
        <span>I understand this permanently deletes the account.</span>
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition hover:border-rose-300/40 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!confirmed}
      >
        <Trash2 size={16} />
        {buttonLabel}
      </button>
    </form>
  );
}
