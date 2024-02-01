import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat('id-ID', {
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    day: 'numeric',
    year: 'numeric',

  }).format(new Date(date))
}

export function updateHari(created_at: Date): string {
  const waktuDibuat: Date = new Date(created_at);
  const waktuSekarang: Date = new Date();

  const waktuDibuatLocale: string = waktuDibuat.toLocaleString('id-ID');
  // const waktuSekarangLocale: string = waktuSekarang.toLocaleString();

  const selisihMillis: number = waktuSekarang.getTime() - waktuDibuat.getTime();

  const selisihDetik: number = Math.floor(selisihMillis / 1000);
  const selisihMenit: number = Math.floor(selisihDetik / 60);
  const selisihJam: number = Math.floor(selisihMenit / 60);
  const selisihHari: number = Math.floor(selisihJam / 24);

  if (selisihHari > 0) {
    return `${selisihHari} hari`;
  } else if (selisihJam > 0) {
    return `${selisihJam} jam`;
  } else if (selisihMenit <= 0) {
    return `Baru saja`;
  } else {
    return `${selisihMenit} menit`;
  }
}
export const formatUsername = (str: string | null | undefined) => {
  if (str) {
    const email = str;
    const username = email.split('@')[0];
    return username
  }
}