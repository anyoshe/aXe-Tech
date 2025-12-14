import { describe, it, expect } from 'vitest';
import { validateIssuePayload, validateBookPayload, validateStudentPayload } from '../src/lib/validators';

describe('validators', () => {
  it('validates issue payload success', () => {
    const payload = { schoolId: 's1', bookId: 'b1', studentId: 'st1' };
    const res = validateIssuePayload(payload);
    expect(res.ok).toBe(true);
  });

  it('validates issue payload failures', () => {
    const res = validateIssuePayload({});
    expect(res.ok).toBe(false);
    expect(res.errors.length).toBeGreaterThan(0);
  });

  it('validates book payload success', () => {
    const res = validateBookPayload({ title: 'A', author: 'B', qty: 3 });
    expect(res.ok).toBe(true);
  });

  it('validates book payload qty error', () => {
    const res = validateBookPayload({ title: 'A', author: 'B', qty: -1 });
    expect(res.ok).toBe(false);
  });

  it('validates student payload success', () => {
    const res = validateStudentPayload({ name: 'Jane', admissionNumber: 'ADM001', schoolId: 's1' });
    expect(res.ok).toBe(true);
  });
});
