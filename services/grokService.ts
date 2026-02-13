
/**
 * Intelligence Service (Groq)
 * Handles intelligence queries, anomaly analysis, and simulations.
 */

const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY;
const MODEL = import.meta.env.VITE_GROK_MODEL || 'llama-3.1-8b-instant';

const fetchGrok = async (prompt: string) => {
    const response = await fetch('/api/groq/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GROK_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: 'system',
                    content: 'You are an Enterprise Intelligence Engine. Always respond in valid JSON. Structure your response as a JSON object.'
                },
                { role: 'user', content: prompt }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Groq API Error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    try {
        return JSON.parse(content);
    } catch (e) {
        console.error("JSON Parse Error:", content);
        throw new Error("Invalid intelligence response format.");
    }
};

export const queryIntelligence = async (query: string, context: any) => {
    const prompt = `
    Analyze this query based on the system state.
    System State: ${JSON.stringify(context)}
    User Query: "${query}"
    
    Return JSON with exactly these keys: 
    "answer" (string), 
    "supportingMetrics" (array of strings), 
    "confidence" (number between 0 and 1), 
    "suggestedAction" (string).
    `;

    try {
        return await fetchGrok(prompt);
    } catch (error) {
        console.error("Intelligence Query Error:", error);
        return {
            answer: "Unable to process query at this time.",
            confidence: 0,
            supportingMetrics: ["System connection timeout"],
            suggestedAction: "Check API key and network connectivity."
        };
    }
};

export const analyzeCACAnomaly = async (currentMetrics: any) => {
    const prompt = `
    Analyze the Marketing CAC anomaly.
    Metrics: ${JSON.stringify(currentMetrics)}
    
    Return JSON with: 
    "explanation" (string), 
    "rootCauses" (array), 
    "recommendations" (array), 
    "impact" (number), 
    "confidence" (number).
    `;

    try {
        return await fetchGrok(prompt);
    } catch (error) {
        console.error("Anomaly Analysis Error:", error);
        return null;
    }
};

export const runSimulation = async (assumptions: any) => {
    const prompt = `
    Run a high-fidelity Monte Carlo simulation based on these assumptions:
    ${JSON.stringify(assumptions)}
    
    Return JSON with: 
    "timeSeries" (array of {day, current, projection}), 
    "projectedRevenue" (number), 
    "projectedCAC" (number), 
    "confidenceInterval" (string), 
    "riskLevel" (string), 
    "assessment" (string).
    `;

    try {
        return await fetchGrok(prompt);
    } catch (err) {
        console.error("Simulation Error:", err);
        return null;
    }
};
