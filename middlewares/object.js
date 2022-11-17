module.exports = (res,req,next) => {
    try {
        console.log('Je suis un middleware');
        next();
    }catch {
        res.status(401).json({message: 'Erreur dans le middleware'})
    }
}