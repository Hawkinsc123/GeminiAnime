# Zero Shot
- Asking a task without providing any examples
- The model must answer relying purely on its prior knowledge and context.

Is this movie review positive, neutral, or negative?

"I absolutely loved the new movie. It was incredible!"

# One-, Few-, or Multi-Shot
- Providing one or more examples to guide the model towards what you want.
- Helps the model generalize more effectively to new queries.

Classify the sentiment of a text as either "positive," "negative," or "neutral."

Input: "I didn't really enjoy the restaurant. The food was disappointing."
Output: Negative

Input: "I absolutely loved the new movie. It was incredible!"
Output:

# System Instructions

You are a creative marketing genius.

# Temperature

I need a creative name for a bird identification app. Can you suggest one idea?

# Structured Outputs

Generate a list of 10 cookie recipe names.

Generate a list of 10 cookie recipe names. Make the outputs in JSON format.

Generate a list of 10 cookie recipe names. Make the outputs in JSON format. Include an `estimated_minutes` integer for each.

Generate a list of 10 cookie recipes.

# Cline

Create an HTML page for a single page bird identification app called “Find those feathers!”. The user selects a US `state` and writes a `description` then submits the form. The server will respond back with the top 3 most likely options, which will then be displayed to the user. Reference `server.js` to see how the API endpoint works. Put your files in the `public` folder. Use simple semantic HTML, CSS, and vanilla Javascript. Make the visual design stunning, pixel-perfect, and add small flourishes where it makes sense for that extra polish.
