import assert from 'node:assert/strict';
import { test } from 'node:test';
import { clearLocalData } from '../src/utils/refreshLocalData';

test('clears portal data without removing the session, preferences, or other site data', () => {
  const data = new Map([
    ['pritilagnik_registrations', 'old registration'],
    ['pritilagnik_car_passes', 'old pass'],
    ['pritilagnik_admins', 'old admins'],
    ['pritilagnik_documents', 'old documents'],
    ['pritilagnik_gallery', 'old gallery'],
    ['pritilagnik_feedback', 'old feedback'],
    ['pritilagnik_committee', 'old committee'],
    ['pritilagnik_teams', 'old teams'],
    ['pritilagnik_accommodations', 'old accommodations'],
    ['pritilagnik_notices', 'old notices'],
    ['pritilagnik_admin_session', 'true'],
    ['pritilagnik_admin_email', 'admin'],
    ['pritilagnik_admin_name', 'Admin'],
    ['pritilagnik_lang', 'en'],
    ['theme', 'dark'],
    ['other_site_data', 'keep'],
  ]);
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { removeItem: (key: string) => data.delete(key) },
  });

  clearLocalData();

  assert.deepEqual([...data.keys()], [
    'pritilagnik_admin_session',
    'pritilagnik_admin_email',
    'pritilagnik_admin_name',
    'pritilagnik_lang',
    'theme',
    'other_site_data',
  ]);
});

test('reports storage errors to the caller', () => {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { removeItem: () => { throw new Error('Storage unavailable'); } },
  });

  assert.throws(clearLocalData, /Storage unavailable/);
});
