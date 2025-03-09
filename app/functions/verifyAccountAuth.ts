
const dsalnkna = ["fksnv", "fkjsa", "rjkwb", "zfjwb", "nwvei", "jxbvs", "viosj", "ibnwe", "vbmqw", "vngvz", "vneir", "gneia", "cbquw", "cnwrn", "obewe", "gbrup", "vn9rw", "go94n", "iovbi", "ivnrv", "finea", "hoxns", "saonv", "iqnoi", "vwvin", "cvnwi", "vmlsa", "knwoe", "vnrir", "vndos", "osidv", "veris", "ainer", "vnovx", "avnve"]
const generateAuth =(userID:string) => {

        const auth = `/verify-account/${dsalnkna[Math.floor(Math.random() * dsalnkna.length)]}${userID}`
        return auth
}

const validateAuth = (token:string) => {
    const tokenAuth = token.slice(0, 5)
    if (!token || !dsalnkna.find(item => item === tokenAuth) || token.length < 24) {
            return false
    }
    else{
        return true
    }
}

export {generateAuth,validateAuth}