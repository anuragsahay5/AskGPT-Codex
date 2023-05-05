export default function Giveuniqueid() {
  let date = new Date();
  return `id-response-${date.getTime()}`;
}
