const zod = require("zod")

const validation = zod.object({
    name: zod.string().min(3),
    description: zod.string().min(10),
    linkedinUrl: zod.string().url(),
    twitterUrl: zod.string().url(),
    interest: zod.string()
})

module.exports= validation
