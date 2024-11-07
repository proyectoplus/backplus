const  success=(req, res, status=200, mes="")=>{
    res.status(status).json({
        error:false,
        status:status,
        body:mes
        
    });
}
const error=(req, res, status=500, mes="")=>{
    res.status(status).json({
        error:true,
        status:status,
        body:mes
    })
}

export default {success, error}