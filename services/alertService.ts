
import { Alert, AlertStatus } from '../types';

/**
 * PRODUCTION READY: Resend API integration.
 * Emails are sent to the registered Gmail address.
 */

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

export const sendAlertEmail = async (alert: Alert, recipients: string[]): Promise<boolean> => {
  console.log(`[ALERT ENGINE] Dispatching email notifications for alert ${alert.id}...`);

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e2e8f0; padding: 24px; border-radius: 8px;">
      <h2 style="color: #0f172a;">${alert.severity} Alert: ${alert.title}</h2>
      <p><strong>Alert ID:</strong> ${alert.id}</p>
      <p><strong>What is happening:</strong> ${alert.summary}</p>
      <p><strong>Root cause:</strong> ${alert.rootCause || 'Under Investigation'}</p>
      <p><strong>Projected Impact:</strong> $${Math.abs(alert.financialImpact).toLocaleString()}</p>
      <p><strong>Confidence:</strong> ${(alert.confidenceScore * 100).toFixed(0)}%</p>
      <h3>Recommended Actions:</h3>
      <ol>
        ${alert.recommendedActions.map(action => `<li>${action}</li>`).join('')}
      </ol>
      <p><a href="http://localhost:3000/#/alerts?id=${alert.id}" style="display: inline-block; padding: 12px 24px; background: #0f172a; color: white; text-decoration: none; border-radius: 4px;">View Full Analysis</a></p>
      <p style="font-size: 10px; color: #94a3b8;">Timestamp (UTC): ${alert.timestamp}</p>
    </div>
  `;

  try {
    const response = await fetch('/api/resend/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: recipients,
        subject: `[${alert.severity}] Enterprise Intelligence Alert - ${alert.title}`,
        html: htmlBody,
      }),
    });

    if (response.ok) {
      console.log(`[RESEND] Dispatch successful for recipients: ${recipients.join(', ')}`);
      return true;
    } else {
      const errData = await response.json();
      console.error(`[RESEND] API Error:`, errData);
      return false;
    }
  } catch (error) {
    console.error(`[RESEND] Connection failed:`, error);
    return false;
  }
};

export const createNewAlert = (params: Partial<Alert>): Alert => {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    title: params.title || 'System Alert',
    summary: params.summary || '',
    triggerCondition: params.triggerCondition || 'Manual Trigger',
    domain: params.domain || (params as any).domain || 'Operations',
    financialImpact: params.financialImpact || 0,
    confidenceScore: params.confidenceScore || 1.0,
    dataFreshness: new Date().toISOString(),
    recommendedActions: params.recommendedActions || [],
    modelVersion: params.modelVersion || 'v1.0.0',
    severity: params.severity || (params as any).severity || 'MEDIUM',
    status: AlertStatus.TRIGGERED,
    retryCount: 0,
    auditTrail: [
      { timestamp: new Date().toISOString(), action: 'Alert Initialized', user: 'System' }
    ],
    ...params
  } as Alert;
};
