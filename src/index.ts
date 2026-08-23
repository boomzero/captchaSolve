export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method !== 'POST') {
			return new Response('Only POST method is allowed', { status: 405 });
		}

		// Parse the incoming image data from the request body
		const blob = await request.arrayBuffer();
		const input = {
			image: [...new Uint8Array(blob)],
			prompt: 'Read the four-digit CAPTCHA in this image. Respond with exactly four digits and nothing else.',
			max_tokens: 8,
			temperature: 0
		};

		// Call the AI model with the image and prompt
		const response = await env.AI.run(
			'@cf/meta/llama-4-scout-17b-16e-instruct',
			input
		);

		// Return the response from the AI model
		return new Response(response.response.trim());
	}
} satisfies ExportedHandler<Env>;
