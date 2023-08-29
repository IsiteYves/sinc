const toUnixTimeStamp = (time: string) => parseInt((new Date(time).getTime() / 1000).toFixed(0))

export default toUnixTimeStamp
