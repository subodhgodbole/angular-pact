import 'jest-preset-angular/setup-jest';
import 'setimmediate'; // This is required as 'jsdom' does not support 'setImmediate()' by default.

// This (useFakeTimers) can also be used instead of 'setimmediate' library.
// But then tests can not use setTimeout(), it fails with "Exceeded timeout of 5000 ms" error.
// Also shows warning as 
// - Jest did not exit one second after the test run has completed.
// - This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
// jest.useFakeTimers();
