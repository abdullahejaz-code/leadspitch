"use client";

import { useId, useState } from "react";
import CheckTick from "@/components/CheckTick";
import { SITE } from "@/lib/site";

type FieldName = "name" | "email" | "topic" | "message";

type FormValues = Record<FieldName, string>;

const TOPICS = [
  "Question about a list",
  "Refund",
  "Custom request",
  "Other",
] as const;

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  topic: TOPICS[0],
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): string {
  if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
    return "Please fill in your name, email, and message.";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    return "Please enter a valid email address.";
  }
  return "";
}

/**
 * Placeholder submit handler. No backend is wired up yet — this is
 * intentionally a no-op until Formspree/Resend is connected (a separate task).
 *
 * To go live, replace the body with a call to your provider, e.g.:
 *
 *   await fetch("https://formspree.io/f/{form-id}", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(values),
 *   });
 *
 * Keep the returned Promise so the button can show a pending state.
 */
async function submitContactRequest(_values: FormValues): Promise<void> {
  // Intentionally a no-op stand-in until Formspree/Resend is connected.
  return Promise.resolve();
}

const FIELD_BASE =
  "mt-2 w-full rounded-sm border border-hairline bg-surface-2 text-[14.5px] text-ink outline-none transition duration-fast focus:border-accent focus:bg-surface focus:ring-[3px] focus:ring-accent/15";
const LABEL_BASE =
  "block font-mono text-[11px] tracking-[0.08em] text-ink-secondary";

interface ContactFormProps {
  /** Typical response time — shown in the success state. */
  responseTime?: string;
}

export default function ContactForm({
  responseTime = SITE.responseTime,
}: ContactFormProps) {
  const fieldId = useId();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function updateField(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = validate(values);
    setError(nextError);
    if (nextError) return;

    setIsSubmitting(true);
    try {
      await submitContactRequest(values);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setValues(EMPTY_VALUES);
    setError("");
    setIsSubmitted(false);
  }

  if (isSubmitted) {
    return (
      <div className="rounded-lg border border-hairline bg-surface p-8 shadow-card">
        <div className="py-6 text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/10">
            <CheckTick size={20} className="text-accent" />
          </span>
          <div className="mt-4 text-xl font-semibold">Message sent.</div>
          <p className="mx-auto mt-2.5 max-w-[38ch] text-[14.5px] leading-relaxed text-ink-secondary">
            Thanks — a person will read it and reply, typically within{" "}
            {responseTime}.
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="mt-5 font-mono text-[13.5px] font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Send another →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-lg border border-hairline bg-surface p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${fieldId}-name`} className={LABEL_BASE}>
            NAME
          </label>
          <input
            id={`${fieldId}-name`}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={`${FIELD_BASE} h-11 px-3.5 placeholder:text-ink-faint`}
          />
        </div>
        <div>
          <label htmlFor={`${fieldId}-email`} className={LABEL_BASE}>
            EMAIL
          </label>
          <input
            id={`${fieldId}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`${FIELD_BASE} h-11 px-3.5 placeholder:text-ink-faint`}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${fieldId}-topic`} className={LABEL_BASE}>
          TOPIC
        </label>
        <select
          id={`${fieldId}-topic`}
          value={values.topic}
          onChange={(e) => updateField("topic", e.target.value)}
          className={`${FIELD_BASE} h-11 cursor-pointer px-3 [appearance:none]`}
        >
          {TOPICS.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor={`${fieldId}-message`} className={LABEL_BASE}>
          MESSAGE
        </label>
        <textarea
          id={`${fieldId}-message`}
          rows={5}
          placeholder="Tell us which niche, location, or order you're asking about."
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={`${FIELD_BASE} resize-none px-3.5 py-3 leading-relaxed placeholder:text-ink-faint`}
        />
      </div>

      {error && (
        <p role="alert" className="mt-3 font-mono text-xs text-danger">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 h-12 w-full rounded-sm bg-accent text-[15px] font-medium text-white transition duration-fast ease-out-expo hover:bg-accent-hover active:scale-[0.99] disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
      <p className="mt-3.5 text-center font-mono text-[11px] text-ink-faint">
        no account needed · we never resell what you tell us
      </p>
    </form>
  );
}
