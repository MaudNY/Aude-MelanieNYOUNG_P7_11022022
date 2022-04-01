module.exports.signInErrors = (error) => {
    let errors = { email: '', password: ''}
  
    if (error.message.includes("email")) {
        errors.email = "Cet utilisateur n'a pas été trouvé";
    }
    
    if (error.message.includes("password")) {
        errors.password = "Mot de passe incorrect"
    }
  
    return errors;
};