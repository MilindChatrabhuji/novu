export class DurationUtils {
  static isISO8601(value: string): boolean {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?$/;
    if (!iso8601Regex.test(value)) {
      return false;
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return false;
    }

    const year = parseInt(value.slice(0, 4), 10);
    const month = parseInt(value.slice(5, 7), 10);
    const day = parseInt(value.slice(8, 10), 10);
    const hours = parseInt(value.slice(11, 13), 10);
    const minutes = parseInt(value.slice(14, 16), 10);
    const seconds = parseInt(value.slice(17, 19), 10);

    if (month < 1 || month > 12 || hours > 23 || minutes > 59 || seconds > 59) {
      return false;
    }

    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return day >= 1 && day <= daysInMonth[month - 1];
  }

  static convertToMilliseconds(amount: number, unit: string): number {
    const unitMap: Record<string, number> = {
      seconds: 1000,
      minutes: 60 * 1000,
      hours: 60 * 60 * 1000,
      days: 24 * 60 * 60 * 1000,
      weeks: 7 * 24 * 60 * 60 * 1000,
      months: 30 * 24 * 60 * 60 * 1000,
    };

    if (!unitMap[unit]) {
      throw new Error(`Invalid time unit '${unit}'. Supported units: ${Object.keys(unitMap).join(', ')}`);
    }

    return amount * unitMap[unit];
  }
}
