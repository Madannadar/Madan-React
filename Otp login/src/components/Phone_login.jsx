import { useState } from "react"

const phoneOtpForm = () => {

    const [ phonenumber, setphonenumber] = useState("")
  return (
    <div>
        <form onSubmit={ () => {}}>
            <input 
            type="text" 
            value={phonenumber}
            onChange={handlePhoneNumber}
            placeholder="Enter phone number"
            />
            <button type="submit"></button>
        </form>
    </div>
  )
}

export default phoneOtpForm