import exp from 'constants'
import { FC } from 'react'
import OTPInput from 'react-otp-input'

interface Props {
  otp: string
  setOtp: (otp: string) => void
}
const OtpInput: FC<Props> = ({ otp, setOtp }) => {
  return (
    <div className="flex gap-4 min-[320px]:gap-2">
      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span> </span>}
        renderInput={(props) => <input {...props} />}
        inputType="number"
        inputStyle={{
          width: '3rem',
          height: '3rem',
          margin: '3px',
          fontSize: '1rem',
          fontWeight: 'bold',
          outline: 'none',
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: '#9B9A9A',
        }}
        shouldAutoFocus={true}
      />
    </div>
  )
}

export default OtpInput
