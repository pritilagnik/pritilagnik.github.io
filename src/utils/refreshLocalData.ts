const LOCAL_DATA_KEYS = [
  'pritilagnik_registrations',
  'pritilagnik_car_passes',
  'pritilagnik_admins',
  'pritilagnik_documents',
  'pritilagnik_gallery',
  'pritilagnik_feedback',
  'pritilagnik_committee',
  'pritilagnik_teams',
  'pritilagnik_accommodations',
  'pritilagnik_notices',
];

export function clearLocalData(): void {
  for (const key of LOCAL_DATA_KEYS) {
    localStorage.removeItem(key);
  }
}
