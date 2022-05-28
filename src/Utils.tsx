class Utils {
  static formatSeconds = (rawSeconds: number) => {
    var minutes = Math.floor(rawSeconds / 60);
    var seconds = rawSeconds - minutes * 60;
    return (
      Utils.padStrLeft(minutes.toString(), "0", 2) +
      ":" +
      Utils.padStrLeft(seconds.toString(), "0", 2)
    );
  };

  static dateToSeconds = (date: Date) => {
    return date.getSeconds() + date.getMinutes() * 60;
  };

  static padStrLeft = (string: string, pad: string, length: number) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  };
}

export default Utils;
