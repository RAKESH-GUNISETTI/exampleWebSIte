
// Integration with Gemini AI

// The API key should ideally be stored in environment variables or handled by backend
const API_KEY = "AIzaSyBhPMQdN-mfWxFK-elQ_46MV6KKUqE569Y";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const TEXT_MODEL = "gemini-pro";
const VISION_MODEL = "gemini-pro-vision";

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  promptFeedback?: {
    blockReason?: string;
    safetyRatings?: {
      category: string;
      probability: string;
    }[];
  };
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

// Function to generate text with Gemini
export const generateText = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${TEXT_MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate text");
    }

    const data: GeminiResponse = await response.json();

    // Check if the response was blocked for safety reasons
    if (data.promptFeedback?.blockReason) {
      throw new Error(`Response blocked: ${data.promptFeedback.blockReason}`);
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
};

// Function for chat conversation with Gemini
export const chatWithGemini = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // Format messages for Gemini API
    const formattedMessages = messages.map((msg) => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `${BASE_URL}/${TEXT_MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate chat response");
    }

    const data: GeminiResponse = await response.json();

    // Check if the response was blocked for safety reasons
    if (data.promptFeedback?.blockReason) {
      throw new Error(`Response blocked: ${data.promptFeedback.blockReason}`);
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error in chat:", error);
    throw error;
  }
};

// Function to analyze code
export const analyzeCode = async (
  code: string,
  action: "debug" | "enhance" | "convert",
  targetLanguage?: string
): Promise<string> => {
  let prompt = "";

  switch (action) {
    case "debug":
      prompt = `Debug the following code. Identify any errors, bugs, or potential issues, and provide a fixed version of the code:
      
      \`\`\`
      ${code}
      \`\`\`
      
      Please provide:
      1. A list of issues found
      2. The corrected code
      3. An explanation of the fixes`;
      break;

    case "enhance":
      prompt = `Enhance the following code to improve its quality. Look for opportunities to optimize performance, improve readability, and follow best practices:
      
      \`\`\`
      ${code}
      \`\`\`
      
      Please provide:
      1. The enhanced code
      2. A list of improvements made
      3. Explanation of how these improvements help`;
      break;

    case "convert":
      if (!targetLanguage) {
        throw new Error("Target language is required for code conversion");
      }
      
      prompt = `Convert the following code to ${targetLanguage}:
      
      \`\`\`
      ${code}
      \`\`\`
      
      Please provide:
      1. The converted code in ${targetLanguage}
      2. Any notes about the conversion process or language-specific considerations`;
      break;

    default:
      throw new Error("Invalid code analysis action");
  }

  return generateText(prompt);
};

// Function to generate code from a prompt
export const generateCode = async (prompt: string, language?: string): Promise<string> => {
  const fullPrompt = language
    ? `Generate ${language} code for the following: ${prompt}`
    : `Generate code for the following: ${prompt}`;

  return generateText(fullPrompt);
};

// Function to check if a question is technical
export const isTechnicalQuestion = async (question: string): Promise<boolean> => {
  try {
    const prompt = `Determine if the following question is related to technical topics such as programming, computer science, software development, algorithms, databases, or technology. Respond with only "true" if it's technical or "false" if it's not technical.
    
    Question: ${question}`;

    const response = await generateText(prompt);
    return response.trim().toLowerCase() === "true";
  } catch (error) {
    console.error("Error checking if question is technical:", error);
    // Default to true to avoid blocking potentially valid technical questions
    return true;
  }
};
