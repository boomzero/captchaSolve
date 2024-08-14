export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method !== 'POST') {
			return new Response('Only POST method is allowed', { status: 405 });
		}

		// Parse the incoming image data from the request body
		const blob = await request.arrayBuffer();
		const input = {
			image: [...new Uint8Array(blob)],
			prompt: 'Help me read this 4 digit number. Please only provide the number in the response.',
			max_tokens: 512
		};

		// Call the AI model with the image and prompt
		const response = await env.AI.run(
			'@cf/llava-hf/llava-1.5-7b-hf',
			input
		);

		// Return the response from the AI model
		return new Response(response.description.toString().trim());
	}
} satisfies ExportedHandler<Env>;
