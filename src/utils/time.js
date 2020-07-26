export const convertTimeToHourMinuteFormat = timeInHours => {
    var hours = Math.trunc(timeInHours / 60);
    var minutes = timeInHours % 60;
    return `${hours}h ${minutes}m`
}