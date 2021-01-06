export function msToTime(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const hoursStr = hours < 10 ? '0' + hours : hours;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const secondsStr = seconds < 10 ? '0' + seconds : seconds;

  return hoursStr + ':' + minutesStr + ':' + secondsStr + '.' + ms;
}

export const log = (color: string, ...args: any[]) =>
  console.log(`%c${args}`, `color:${color}`);

export const getTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  };
};
