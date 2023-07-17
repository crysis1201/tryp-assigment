import { Config, names, uniqueNamesGenerator } from "unique-names-generator";


const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomEmail(domain,length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + domain;
}

function generateUID() {
    var firstPart: any = (Math.random() * 46656) | 0;
    var secondPart: any = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

const config: Config = {
  dictionaries: [names]
}

const newBooking = () => {
  const statusChance = Math.random()
  return {
    timestamp: randomDate(new Date("10-6-2022"), new Date("10-6-2022")).toISOString(),
    name: uniqueNamesGenerator(config),
    mail: getRandomEmail("@gmail.com", 10),
    purchaseid: generateUID(),
    status:
      statusChance > 0.66
        ? 'Success'
        : statusChance > 0.33
        ? 'Failed'
        : 'Waiting',
  }
}

export default function makeData(lens) {
  let arr = []
  range(lens).map(d => arr.push({...newBooking()}))

  return arr
}
