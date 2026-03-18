import React from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, rightElement, className, ...rest }, ref) => {
    return (
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        ) : null}

        <input
          ref={ref}
          className={clsx(
            "w-full rounded-xl border border-slate-700 bg-linear-to-br from-slate-700 to-slate-800/10 text-sm text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
            icon ? "pl-10 pr-3 py-2" : "px-3 py-2",
            rightElement ? "pr-10" : "",
            className,
          )}
          {...rest}
        />

        {rightElement ? (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
            {rightElement}
          </div>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
