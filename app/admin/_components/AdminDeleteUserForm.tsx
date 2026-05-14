"use client";

import { useState, useTransition } from "react";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to remove this account? This cannot be undone.",
    );

    if (!shouldDelete) return;

    const formData = new FormData();
    formData.set("userId", userId);
    formData.set("confirmDelete", "true");

    setErrorMessage(null);
    startTransition(() => {
      void deleteUserAccount(formData)
        .then((result) => {
          if (result && "error" in result) {
            setErrorMessage(result.error);
          }
        })
        .catch((error: unknown) => {
          setErrorMessage(error instanceof Error ? error.message : "Failed to delete account");
        });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition hover:border-rose-300/40 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 size={16} />
        {isPending ? "Removing..." : buttonLabel}
      </button>
      {errorMessage ? (
        <p className="max-w-xs text-xs leading-5 text-rose-200">{errorMessage}</p>
      ) : null}
    </div>
  );
}
