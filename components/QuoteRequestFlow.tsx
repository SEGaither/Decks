"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { submitLead } from "@/lib/submit-lead";

type Step =
  | "intro"
  | "name"
  | "phone"
  | "address"
  | "review"
  | "submitting"
  | "success"
  | "error";

interface State {
  step: Step;
  name: string;
  phone: string;
  address: string;
  nameError: string;
  phoneError: string;
  addressError: string;
  submittedAt: string;
  editingFrom: "review" | null;
}

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits[0] === "1") return digits.slice(1);
  return null;
}

function formatPhone(digits: string): string {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function QuoteRequestFlow() {
  const [state, setState] = useState<State>({
    step: "intro",
    name: "",
    phone: "",
    address: "",
    nameError: "",
    phoneError: "",
    addressError: "",
    submittedAt: "",
    editingFrom: null,
  });

  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (state.step === "success") successRef.current?.focus();
    if (state.step === "error") errorRef.current?.focus();
  }, [state.step]);

  const normalizedDigits = normalizePhone(state.phone);
  const displayPhone = normalizedDigits
    ? formatPhone(normalizedDigits)
    : state.phone;

  const submitName = useCallback(() => {
    setState((prev) => {
      if (!prev.name.trim()) return { ...prev, nameError: "Please enter your name." };
      return {
        ...prev,
        nameError: "",
        step: prev.editingFrom === "review" ? "review" : "phone",
        editingFrom: null,
      };
    });
  }, []);

  const submitPhone = useCallback(() => {
    setState((prev) => {
      if (!normalizePhone(prev.phone)) {
        return { ...prev, phoneError: "Please enter a 10-digit US phone number." };
      }
      return {
        ...prev,
        phoneError: "",
        step: prev.editingFrom === "review" ? "review" : "address",
        editingFrom: null,
      };
    });
  }, []);

  const submitAddress = useCallback(() => {
    setState((prev) => {
      if (!prev.address.trim()) {
        return { ...prev, addressError: "Please enter the project address." };
      }
      return { ...prev, addressError: "", step: "review", editingFrom: null };
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setState((prev) => ({ ...prev, step: "submitting" }));

    const normalized = normalizePhone(state.phone);
    const result = await submitLead({
      name: state.name.trim(),
      phone: normalized ?? state.phone.trim(),
      address: state.address.trim(),
      clientSubmittedAt: new Date().toISOString(),
    });

    submittingRef.current = false;
    if (result.ok) {
      setState((prev) => ({
        ...prev,
        step: "success",
        submittedAt: result.submittedAt,
      }));
    } else {
      setState((prev) => ({ ...prev, step: "error" }));
    }
  }, [state.name, state.phone, state.address]);

  const editField = useCallback((field: "name" | "phone" | "address") => {
    setState((prev) => ({ ...prev, step: field, editingFrom: "review" }));
  }, []);

  const { step } = state;

  // ── Intro ──────────────────────────────────────────────────────────────
  if (step === "intro") {
    return (
      <div className="qrf">
        <p className="qrf-intro-lead">
          Provide your name, phone number, and project address — that&rsquo;s
          all we need to schedule a visit.
        </p>
        <p className="qrf-commitment">
          Shane will call or come by no later than the following day.
        </p>
        <div className="qrf-actions">
          <button
            id="quote-flow-start"
            type="button"
            className="qrf-btn-primary"
            onClick={() => setState((prev) => ({ ...prev, step: "name" }))}
          >
            Get Started
          </button>
        </div>
        <p className="qrf-privacy-note">
          Takes about one minute. Your information is used only to respond to
          your quote request.
        </p>
      </div>
    );
  }

  // ── Name ───────────────────────────────────────────────────────────────
  if (step === "name") {
    const editing = state.editingFrom === "review";
    return (
      <div className="qrf">
        <p className="qrf-progress" aria-hidden="true">
          Step 1 of 3 — Name
        </p>
        <fieldset className="qrf-step">
          <legend className="sr-only">Your name</legend>
          <div className="qrf-field">
            <label htmlFor="qf-name" className="qrf-label">
              What is your name?
            </label>
            <input
              id="qf-name"
              type="text"
              className={`qrf-input${state.nameError ? " qrf-input--invalid" : ""}`}
              autoComplete="name"
              value={state.name}
              autoFocus
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  name: e.target.value,
                  nameError: "",
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") submitName();
              }}
              aria-invalid={state.nameError ? true : undefined}
              aria-describedby={state.nameError ? "qf-name-error" : undefined}
            />
            {state.nameError && (
              <p id="qf-name-error" className="qrf-field-error" role="alert">
                {state.nameError}
              </p>
            )}
          </div>
          <div className="qrf-actions">
            {editing && (
              <button
                type="button"
                className="qrf-btn-secondary"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    step: "review",
                    editingFrom: null,
                  }))
                }
              >
                Back to Review
              </button>
            )}
            <button
              type="button"
              className="qrf-btn-primary"
              onClick={submitName}
            >
              Continue
            </button>
          </div>
        </fieldset>
      </div>
    );
  }

  // ── Phone ──────────────────────────────────────────────────────────────
  if (step === "phone") {
    const editing = state.editingFrom === "review";
    return (
      <div className="qrf">
        <p className="qrf-progress" aria-hidden="true">
          Step 2 of 3 — Phone
        </p>
        <fieldset className="qrf-step">
          <legend className="sr-only">Your phone number</legend>
          <div className="qrf-field">
            <label htmlFor="qf-phone" className="qrf-label">
              What phone number should Shane use to reach you?
            </label>
            <input
              id="qf-phone"
              type="tel"
              className={`qrf-input${state.phoneError ? " qrf-input--invalid" : ""}`}
              autoComplete="tel"
              inputMode="tel"
              value={state.phone}
              autoFocus
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  phone: e.target.value,
                  phoneError: "",
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") submitPhone();
              }}
              aria-invalid={state.phoneError ? true : undefined}
              aria-describedby={
                state.phoneError ? "qf-phone-error" : undefined
              }
            />
            {state.phoneError && (
              <p id="qf-phone-error" className="qrf-field-error" role="alert">
                {state.phoneError}
              </p>
            )}
          </div>
          <div className="qrf-actions">
            <button
              type="button"
              className="qrf-btn-secondary"
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  step: editing ? "review" : "name",
                  editingFrom: editing ? null : prev.editingFrom,
                }))
              }
            >
              {editing ? "Back to Review" : "Back"}
            </button>
            <button
              type="button"
              className="qrf-btn-primary"
              onClick={submitPhone}
            >
              Continue
            </button>
          </div>
        </fieldset>
      </div>
    );
  }

  // ── Address ────────────────────────────────────────────────────────────
  if (step === "address") {
    const editing = state.editingFrom === "review";
    return (
      <div className="qrf">
        <p className="qrf-progress" aria-hidden="true">
          Step 3 of 3 — Address
        </p>
        <fieldset className="qrf-step">
          <legend className="sr-only">Project address</legend>
          <div className="qrf-field">
            <label htmlFor="qf-address" className="qrf-label">
              Where is the deck project?
            </label>
            <input
              id="qf-address"
              type="text"
              className={`qrf-input${state.addressError ? " qrf-input--invalid" : ""}`}
              autoComplete="street-address"
              value={state.address}
              autoFocus
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  address: e.target.value,
                  addressError: "",
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") submitAddress();
              }}
              aria-invalid={state.addressError ? true : undefined}
              aria-describedby={
                state.addressError ? "qf-address-error" : undefined
              }
            />
            {state.addressError && (
              <p
                id="qf-address-error"
                className="qrf-field-error"
                role="alert"
              >
                {state.addressError}
              </p>
            )}
          </div>
          <div className="qrf-actions">
            <button
              type="button"
              className="qrf-btn-secondary"
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  step: editing ? "review" : "phone",
                  editingFrom: editing ? null : prev.editingFrom,
                }))
              }
            >
              {editing ? "Back to Review" : "Back"}
            </button>
            <button
              type="button"
              className="qrf-btn-primary"
              onClick={submitAddress}
            >
              Continue
            </button>
          </div>
        </fieldset>
      </div>
    );
  }

  // ── Review ─────────────────────────────────────────────────────────────
  if (step === "review") {
    return (
      <div className="qrf">
        <p className="qrf-progress" aria-hidden="true">
          Review your request
        </p>
        <div className="qrf-review">
          <h3 className="qrf-review-heading">Does everything look right?</h3>
          <dl className="qrf-review-list">
            <div className="qrf-review-row">
              <div className="qrf-review-content">
                <dt>Name</dt>
                <dd>{state.name || <span className="qrf-none">—</span>}</dd>
              </div>
              <button
                type="button"
                className="qrf-edit-btn"
                onClick={() => editField("name")}
                aria-label="Edit name"
              >
                Edit
              </button>
            </div>
            <div className="qrf-review-row">
              <div className="qrf-review-content">
                <dt>Phone</dt>
                <dd>
                  {displayPhone || <span className="qrf-none">—</span>}
                </dd>
              </div>
              <button
                type="button"
                className="qrf-edit-btn"
                onClick={() => editField("phone")}
                aria-label="Edit phone number"
              >
                Edit
              </button>
            </div>
            <div className="qrf-review-row">
              <div className="qrf-review-content">
                <dt>Project address</dt>
                <dd>
                  {state.address || <span className="qrf-none">—</span>}
                </dd>
              </div>
              <button
                type="button"
                className="qrf-edit-btn"
                onClick={() => editField("address")}
                aria-label="Edit project address"
              >
                Edit
              </button>
            </div>
          </dl>
          <p className="qrf-commitment">
            Shane will call or come by no later than the following day.
          </p>
          <div className="qrf-actions">
            <button
              type="button"
              className="qrf-btn-primary"
              onClick={handleSubmit}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Submitting ─────────────────────────────────────────────────────────
  if (step === "submitting") {
    return (
      <div className="qrf" aria-live="polite" aria-busy="true">
        <div className="qrf-submit-live">
          <p className="qrf-sending">Sending your request&hellip;</p>
        </div>
      </div>
    );
  }

  // ── Success ────────────────────────────────────────────────────────────
  if (step === "success") {
    const submittedDate = state.submittedAt
      ? new Date(state.submittedAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "";

    return (
      <div
        className="qrf qrf-success"
        aria-live="polite"
        ref={successRef}
        tabIndex={-1}
      >
        <h3 className="qrf-success-headline">Request sent</h3>
        <p>
          Shane will call or come by no later than the following day. He will
          reach you at <strong>{displayPhone}</strong>.
        </p>
        {submittedDate && (
          <p className="qrf-success-time">Submitted: {submittedDate}</p>
        )}
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────
  return (
    <div
      className="qrf qrf-error-state"
      aria-live="polite"
      ref={errorRef}
      tabIndex={-1}
    >
      <h3 className="qrf-error-headline">Your request was not sent yet.</h3>
      <p>Your information is still here. Please try again.</p>
      <div className="qrf-actions">
        <button
          type="button"
          className="qrf-btn-primary"
          onClick={handleSubmit}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
