/**
 * Astronomical calculations for live status ticker:
 * - Moon phase & illumination calculation
 * - Local sidereal time calculation for Greater Noida (28.4595° N, 77.5046° E)
 */

export interface MoonPhaseInfo {
  phase: number; // 0 to 1
  illumination: number; // 0 to 100%
  name: string;
  icon: string;
}

export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  // Known new moon reference: Jan 11, 2024, 11:57 UTC
  const refNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57)).getTime();
  const synodicMonthMs = 29.53058867 * 24 * 60 * 60 * 1000;

  const diff = date.getTime() - refNewMoon;
  const phase = ((diff % synodicMonthMs) + synodicMonthMs) % synodicMonthMs / synodicMonthMs;

  // Approximate illumination based on cosine curve
  const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);

  let name = "New Moon";
  let icon = "🌑";

  if (phase < 0.03 || phase > 0.97) {
    name = "New Moon";
    icon = "🌑";
  } else if (phase < 0.22) {
    name = "Waxing Crescent";
    icon = "🌒";
  } else if (phase < 0.28) {
    name = "First Quarter";
    icon = "🌓";
  } else if (phase < 0.47) {
    name = "Waxing Gibbous";
    icon = "🌔";
  } else if (phase < 0.53) {
    name = "Full Moon";
    icon = "🌕";
  } else if (phase < 0.72) {
    name = "Waning Gibbous";
    icon = "🌖";
  } else if (phase < 0.78) {
    name = "Last Quarter";
    icon = "🌗";
  } else {
    name = "Waning Crescent";
    icon = "🌘";
  }

  return { phase, illumination, name, icon };
}

export function getLocalSiderealTime(date: Date = new Date(), longitudeDeg: number = 77.5046): string {
  // Calculate Julian Date
  const jd = date.getTime() / 86400000 + 2440587.5;
  const d = jd - 2451545.0;

  // Greenwich Mean Sidereal Time in hours
  let gmst = 18.697374558 + 24.06570982441908 * d;
  gmst = ((gmst % 24) + 24) % 24;

  // Local Sidereal Time
  let lst = gmst + longitudeDeg / 15.0;
  lst = ((lst % 24) + 24) % 24;

  const hours = Math.floor(lst);
  const minutes = Math.floor((lst - hours) * 60);
  const seconds = Math.floor(((lst - hours) * 60 - minutes) * 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} LST`;
}

