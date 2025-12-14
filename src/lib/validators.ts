export function validateIssuePayload(payload: any) {
  const errors: string[] = [];
  if (!payload || typeof payload !== 'object') {
    errors.push('payload must be an object');
    return { ok: false, errors };
  }
  if (!payload.schoolId || typeof payload.schoolId !== 'string' || !payload.schoolId.trim()) errors.push('schoolId is required and must be a non-empty string');
  if (!payload.bookId || typeof payload.bookId !== 'string' || !payload.bookId.trim()) errors.push('bookId is required and must be a non-empty string');
  if (!payload.studentId || typeof payload.studentId !== 'string' || !payload.studentId.trim()) errors.push('studentId is required and must be a non-empty string');
  return { ok: errors.length === 0, errors };
}

export function validateBookPayload(payload: any) {
  const errors: string[] = [];
  if (!payload || typeof payload !== 'object') {
    errors.push('payload must be an object');
    return { ok: false, errors };
  }
  if (!payload.title || typeof payload.title !== 'string' || !payload.title.trim()) errors.push('title is required');
  if (!payload.author || typeof payload.author !== 'string' || !payload.author.trim()) errors.push('author is required');
  if (payload.qty == null || typeof payload.qty !== 'number' || !Number.isInteger(payload.qty) || payload.qty < 0) errors.push('qty is required and must be an integer >= 0');
  return { ok: errors.length === 0, errors };
}

export function validateStudentPayload(payload: any) {
  const errors: string[] = [];
  if (!payload || typeof payload !== 'object') {
    errors.push('payload must be an object');
    return { ok: false, errors };
  }
  if (!payload.name || typeof payload.name !== 'string' || !payload.name.trim()) errors.push('name is required');
  if (!payload.admissionNumber || typeof payload.admissionNumber !== 'string' || !payload.admissionNumber.trim()) errors.push('admissionNumber is required');
  if (!payload.schoolId || typeof payload.schoolId !== 'string' || !payload.schoolId.trim()) errors.push('schoolId is required');
  return { ok: errors.length === 0, errors };
}

export default { validateIssuePayload, validateBookPayload, validateStudentPayload };
