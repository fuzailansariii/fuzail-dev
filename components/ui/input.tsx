import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type FormInputProps = {
  label: string;
  error?: string;
  textarea?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const inputClass =
  "w-full bg-bg border border-b2 rounded text-tx font-mono text-[13px] px-3.5 py-2.5 focus:outline-none focus:border-v2 focus:ring-1 focus:ring-v1/30 transition-all placeholder:text-t4";

const FormInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormInputProps
>(({ label, error, textarea, ...props }, ref) => {
  return (
    <div>
      <label className="block font-mono font-bold text-[10px] uppercase tracking-widest text-t4 mb-1.5">
        {label}
      </label>
      {textarea ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={`${inputClass} resize-none h-[110px]`}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={inputClass}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <p className="mt-1 font-mono text-[10px] text-red-400">{error}</p>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";
export default FormInput;
