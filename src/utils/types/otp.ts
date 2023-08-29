export enum IOTP_ENUMS {
  VERIFICATION = 'VERIFICATION',
  TWOFA = 'TWOFA',
  FORGET = 'FORGET',
}

export type IOTP_REQUEST_PAYLOAD = {
  email: string
  type: IOTP_ENUMS
}
