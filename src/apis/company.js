import axios from "@/axios"

export const updateCompanyInfo = async (data) =>{
    try {
        let res = await axios.put('/company', {
            ...data
        })        
        if(res.status == 200){
            return res.data
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

