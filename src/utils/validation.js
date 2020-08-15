export const validEmailAndPhoneNumber = input => {
    const phoneRegex = /^\d{10}$/   // eslint-disable-next-line 
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    return input.match(phoneRegex) || input.match(emailRegex)
}