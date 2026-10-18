/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GoogleSheetLogPayload {
  triggerType: 'SCENARIO_SETTLED' | 'COPY_OVERRIDE_STRING' | 'COPY_PREF_STRING' | 'DOWNLOAD_TXT' | 'APPLY_PRESET' | 'MANUAL_SYNC';
  simulatorMode: 'preference_flow' | 'swing_pad';
  coalitionSwing: number;
  laborSwing: number;
  oneNationSwing: number;
  laborSeats: number;
  coalitionSeats: number;
  greensSeats: number;
  oneNationSeats: number;
  independentSeats: number;
  projectedGovernment: string;
  overridesCount: number;
  overridesString: string;
  preferenceFlowString: string;
}

// Manage a consistent anonymous session ID per browser tab
function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem('vic_election_session_id');
    if (!sid) {
      sid = 'sid_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
      sessionStorage.setItem('vic_election_session_id', sid);
    }
    return sid;
  } catch {
    return 'sid_anonymous';
  }
}

// Debounce timer handle
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let lastLoggedHash = '';

/**
 * Sends a structured interaction payload to the Google Apps Script Webhook.
 * Uses mode: 'no-cors' so Google Apps Script HTTP 302 redirects succeed silently without browser CORS errors.
 */
export async function sendToGoogleSheetWebhook(payload: GoogleSheetLogPayload): Promise<boolean> {
  const webhookUrl = (import.meta as any).env?.VITE_GOOGLE_SHEET_WEBHOOK_URL;

  // If webhook is not configured, exit silently without error
  if (!webhookUrl || typeof webhookUrl !== 'string' || webhookUrl.trim() === '') {
    return false;
  }

  const fullData = {
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    ...payload,
  };

  try {
    // If sendBeacon is available and data is compact, prefer it for non-blocking dispatch
    const bodyString = JSON.stringify(fullData);
    
    await fetch(webhookUrl.trim(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: bodyString,
    });

    return true;
  } catch {
    // Fail silently in background to preserve zero UI distraction
    return false;
  }
}

/**
 * Debounced scenario logger: waits 4 seconds after user stops dragging/modifying
 * before dispatching a settled scenario row to the Google Sheet.
 */
export function logSettledScenario(payload: GoogleSheetLogPayload) {
  // Prevent duplicate logs of identical settled states
  const hash = `${payload.simulatorMode}|${payload.coalitionSwing}|${payload.laborSwing}|${payload.oneNationSwing}|${payload.overridesString}|${payload.preferenceFlowString}`;
  
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    if (hash !== lastLoggedHash) {
      lastLoggedHash = hash;
      sendToGoogleSheetWebhook({
        ...payload,
        triggerType: 'SCENARIO_SETTLED',
      });
    }
  }, 4000);
}

/**
 * Immediate logger: sends instantaneous records for explicit milestone actions (e.g. Copy String, Download .txt)
 */
export function logImmediateMilestone(payload: GoogleSheetLogPayload) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  sendToGoogleSheetWebhook(payload);
}
