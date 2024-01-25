// convert Frequency Units: MHz to GHz
export default function convertMHzToGHz(MHzValue) {
  if (MHzValue === undefined) return;
  return MHzValue / 1000;
}
