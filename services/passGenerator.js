const generatePasswordRand = (length, type) => {
    let characters;
  
    switch (type) {
      case "num":
        characters = "0123456789";
        break;
      case "alf":
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;
      case "rand":
        const randomCharacters = Array.from({ length }, () =>
          String.fromCharCode((Math.floor(Math.random() * 100) % 94) + 33)
        );
        return randomCharacters.join("");
      default:
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        break;
    }
  
    const pass = Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  
    return pass;
  };
  
  module.exports = generatePasswordRand;
  