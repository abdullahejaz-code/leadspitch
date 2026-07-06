"use client";

import { useId, useState } from "react";

type Mode = "general" | "quote";

type FieldName =
  | "name"
  | "email"
  | "subject"
  | "message"
  | "niche"
  | "leadCount"
  | "details";

type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  niche: "",
  leadCount: "",
  details: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MODES: { id: Mode; label: string }[] = [
  { id: "general", label: "General message" },
  { id: "quote", label: "Custom quote request" },
];

function validate(mode: Mode, values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (mode === "general") {
    if (!values.subject.trim()) errors.subject = "Enter a subject.";
    if (!values.message.trim()) errors.message = "Enter a message.";
  } else {
    if (!values.niche.trim()) {
      errors.niche = "Tell us which niche or industry you need.";
    }
    if (!values.leadCount.trim()) {
      errors.leadCount = "Enter an approximate lead count.";
    }
  }

  return errors;
}

/**
 * Placeholder submit handler. No backend is wired up yet.
 *
 * To go live, replace the body with a call to your provider, e.g.:
 *
 *   await fetch("https://formspree.io/f/{form-id}", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ mode, ...values }),
 *   });
 *
 * or route to a Resend-backed endpoint. Keep the returned Promise so the
 * button can show a pending state and the caller can await success.
 */
async function submitContactRequest(
  _mode: Mode,
  _values: FormValues,
): Promise<void> {
  // Intentionally a no-op stand-in until Formspree/Resend is connected.
  return Promise.resolve();
}

function fieldClasses(hasError: boolean) {
  return [
    "w-full rounded-sm border bg-surface px-3.5 py-2.5 text-sm text-ink",
    "transition-colors duration-fast placeholder:text-ink-faint",
    "focus:outline-none focus-visible:border-accent",
    hasError ? "border-danger" : "border-hairline hover:border-ink-faint",
  ].join(" ");
}

export default function ContactForm() {
  const fieldId = useId();
  const [mode, setMode] = useState<Mode>("general");
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function switchMode(next: Mode) {
    if (next === mode) return;
    setMode(next);
    setErrors({});
  }

  function updateField(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(mode, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await submitContactRequest(mode, values);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setIsSubmitted(false);
  }

  if (isSubmitted) {
    return (
      <div className="rounded-lg border border-hairline bg-surface p-8 shadow-hairline">
        <h2 className="text-xl font-semibold">Message sent</h2>
        <p className="mt-3 max-w-prose text-ink-secondary">
          Thanks for reaching out. A person will get back to you at the email
          address you provided.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-6 rounded-sm border border-hairline bg-surface px-5 py-2.5 text-sm font-medium transition duration-fast ease-out-expo hover:border-ink-faint active:scale-[0.98]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      {/* Mode toggle */}
      <div
        role="tablist"
        aria-label="Contact type"
        className="inline-flex rounded-sm border border-hairline bg-canvas p-1"
      >
        {MODES.map((option) => {
          const isActive = mode === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => switchMode(option.id)}
              className={[
                "rounded-sm px-4 py-2 text-sm font-medium transition duration-fast ease-out-expo",
                isActive
                  ? "bg-ink text-surface"
                  : "text-ink-secondary hover:text-ink",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-6">
        <Field
          id={`${fieldId}-name`}
          label="Name"
          value={values.name}
          error={errors.name}
          autoComplete="name"
          onChange={(value) => updateField("name", value)}
        />
        <Field
          id={`${fieldId}-email`}
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          autoComplete="email"
          onChange={(value) => updateField("email", value)}
        />

        {mode === "general" ? (
          <>
            <Field
              id={`${fieldId}-subject`}
              label="Subject"
              value={values.subject}
              error={errors.subject}
              onChange={(value) => updateField("subject", value)}
            />
            <Field
              id={`${fieldId}-message`}
              label="Message"
              multiline
              value={values.message}
              error={errors.message}
              onChange={(value) => updateField("message", value)}
            />
          </>
        ) : (
          <>
            <Field
              id={`${fieldId}-niche`}
              label="Niche or industry needed"
              value={values.niche}
              error={errors.niche}
              onChange={(value) => updateField("niche", value)}
            />
            <Field
              id={`${fieldId}-leadCount`}
              label="Approximate lead count needed"
              inputMode="numeric"
              value={values.leadCount}
              error={errors.leadCount}
              onChange={(value) => updateField("leadCount", value)}
            />
            <Field
              id={`${fieldId}-details`}
              label="Additional details"
              hint="Optional"
              multiline
              value={values.details}
              error={errors.details}
              onChange={(value) => updateField("details", value)}
            />
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-surface transition duration-fast ease-out-expo hover:bg-[#2a2a2f] active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting
          ? "Sending…"
          : mode === "general"
            ? "Send message"
            : "Request quote"}
      </button>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
  inputMode?: "numeric";
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  multiline = false,
  autoComplete,
  inputMode,
}: FieldProps) {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {hint ? (
          <span className="ml-2 font-normal text-ink-faint">{hint}</span>
        ) : null}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`${fieldClasses(hasError)} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={fieldClasses(hasError)}
        />
      )}

      {hasError ? (
        <p id={errorId} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
