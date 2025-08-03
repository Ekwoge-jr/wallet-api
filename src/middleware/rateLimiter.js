import ratelimit from "../config/upstash.js";

const ratelimiter = async(req, res, next) => {

    try {
        // my-rate-limit can be user_id, ip-address, etc
        const {success} = await ratelimit.limit("my-rate-limit")

        if(!success){
            return res.status(429).json({
                message: "Too many requests, please try again later."
            })
        }

        next();

    } catch (error) {
        console.log("Rate limit error", error)
        next(error)
    }
} 

export default ratelimiter;