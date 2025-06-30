# Problem Calculator

A web application featuring both a calculator and ChatGPT-powered text evaluation.

## Features

### Calculator

- Basic arithmetic operations
- Modern UI with responsive design

### ChatGPT Text Evaluation

- Send text to ChatGPT for evaluation
- Customizable prompts
- JSON API endpoint for programmatic access

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up your OpenAI API key:

```bash
# Windows PowerShell
$env:OPENAI_API_KEY="your-openai-api-key-here"

# Or create a .env file (recommended for production)
echo "OPENAI_API_KEY=your-openai-api-key-here" > .env
```

3. Start the server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## API Usage

### POST /evaluate

Send text to ChatGPT for evaluation.

**Request Body:**

```json
{
  "text": "Your text to evaluate",
  "customPrompt": "Optional custom prompt (default: 'Please evaluate the following text and provide a detailed analysis:')"
}
```

**Response:**

```json
{
  "success": true,
  "originalText": "Your text to evaluate",
  "customPrompt": "Your custom prompt",
  "evaluation": "ChatGPT's evaluation response",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Example using curl:**

```bash
curl -X POST http://localhost:3000/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This is a sample text for evaluation",
    "customPrompt": "Analyze the sentiment and provide suggestions for improvement:"
  }'
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: Server port (default: 3000)

## Dependencies

- Express.js - Web framework
- EJS - Template engine
- OpenAI - ChatGPT API client
- Nodemon - Development server (dev dependency)

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon (auto-restart on file changes)
- `npm test` - Run tests (not implemented yet)

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **EJS** - Embedded JavaScript templating
- **Nodemon** - Development server with auto-restart

## License

ISC
