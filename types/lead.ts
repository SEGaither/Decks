export interface LeadPayload {
  name: string;
  phone: string;
  address: string;
  clientSubmittedAt: string;
}

export type SubmitResult =
  | { ok: true; submittedAt: string }
  | { ok: false; message: string };
