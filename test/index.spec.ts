// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('captcha solver worker', () => {
	it('rejects non-POST requests (unit style)', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(405);
		expect(await response.text()).toBe('Only POST method is allowed');
	});

	it('rejects non-POST requests (integration style)', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(response.status).toBe(405);
		expect(await response.text()).toBe('Only POST method is allowed');
	});
});
