export const INIT = 0;
export const PENDING = 1;
export const FAILED = 2;
export const PASSED = 3;

export const isFailed = status => status === FAILED;
export const isPassed = status => status === PASSED;
