module.exports = {

    isValid(data){

        if (!data.name){
            return "Digite o nome!";
          } else if(!data.email){
            return "Digite o e-mail!";
          } else if(!data.people){
            return "Selecione o número de pessoas!";
          } else if(!data.date){
            return "Escolha uma data!";
          } else if(!data.time) {
            return "Escolha um horário!";
          } else {
            return true;
        }
    },

    isValidContact(data){

      if (!data.name){
        return "Digite o nome!";
      } else if(!data.email){
        return "Digite o e-mail!";
      } else if(!data.message){
        return "Escreva uma mensagem!";
      } else {
        return true;
      }
    }
}