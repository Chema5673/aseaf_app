import BotChatMessage from '../../components/Footer/Chatbot/BotChatMessage/BotChatMessage';
import regex from '../regex';

const timer = 1000;

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }



  handleName(message) {
    const initialToUpper = message.charAt(0).toUpperCase()
    const remainder = message.slice(1)
    const capitalized = initialToUpper + remainder
    this.addToState("name", capitalized)
    const answer = this.createChatbotMessage(<BotChatMessage message={`Es un placer conocerte, ${capitalized} ¿Me dirías cómo te apellidas?`} />)
    setTimeout(() => { this.addToStateMessages(answer) }, timer);
    this.nextQuestion(1);
  }

  handleSurname(message) {
    this.addToState("surname", message)
    const answer = this.createChatbotMessage(<BotChatMessage message={'¿Nos podrías facilitar tu correo electrónico?'} />)
    setTimeout(() => { this.addToStateMessages(answer) }, timer);
    this.nextQuestion(2);
  }

  handleEmail(message) {
    if (regex.validEmail(message)) {
      this.addToState("email", message)
      const answer1 = this.createChatbotMessage(<BotChatMessage message={'¿Qué contraseña quieres poner ? '} />)
      const answer2 = this.createChatbotMessage(<BotChatMessage message={'Para mayor seguridad, crea una contraseña que tenga un mínimo de  8 caracteres, con una mínuscula, una mayúscula y un carácter especial'} />)
      setTimeout(() => { this.addToStateMessages(answer1) }, timer);
      setTimeout(() => { this.addToStateMessages(answer2) }, timer);
      this.nextQuestion(3);
    } else {
      const answer = this.createChatbotMessage(<BotChatMessage message={'El email introducido no tiene el formato correcto, por favor inténtalo de nuevo'} />)
      setTimeout(() => { this.addToStateMessages(answer) }, timer);
    }
  }

  handlePassword(message) {
    this.addToState("password", message)
    const answer = this.createChatbotMessage(<BotChatMessage message={'¿Aceptas que al final de las preguntas te enviemos información personalizada según tus inquitudes con los datos que nos has facilitado?'} />, { widget: "Options" })
    setTimeout(() => { this.addToStateMessages(answer) }, timer);
    this.nextQuestion(4);
  }

  handleConsentGDPR(message) {
    console.log("LLEGO", message)
    if (message === "Si") {
      this.addToState("consentGDPR", message)
      const answer1 = this.createChatbotMessage(<BotChatMessage message={`¡Genial !`} />)
      const answer2 = this.createChatbotMessage(<BotChatMessage message={`Para poder hacer mejor mi labor, me gustaría conocer  más sobre ti, empezando por tu edad:`} />, { widget: "AgeRange" })
      setTimeout(() => { this.addToStateMessages(answer1) }, timer);
      setTimeout(() => { this.addToStateMessages(answer2) }, timer);
      this.nextQuestion(5);

    } else if (message === "No") {
      const answer = this.createChatbotMessage(<BotChatMessage message={`Necesitamos tu consentimiento para poder darte información personalizada, ¿nos das tu permiso para enviarte información personalizada?`} />, { widget: "ConsentGDPR" })
      setTimeout(() => { this.addToStateMessages(answer) }, timer);
    }
  }


  handleAgeQuestion(message) {
    this.addToState("ageRange", message)
    const answer = this.createChatbotMessage(<BotChatMessage message={`¿Ya eres familia de acogida o estás interesado?`} />, { widget: "UserType" })
    setTimeout(() => { this.addToStateMessages(answer) }, timer);
    this.nextQuestion(6);
  }

  handleUserType(message) {
    this.addToState("userType", message)
    const answer = this.createChatbotMessage(<BotChatMessage message={'Dime; ¿Cuáles son tus principales inquietudes sobre el acogimiento familiar?'} />)
    setTimeout(() => { this.addToStateMessages(answer) }, timer);
    this.nextQuestion(7);
  }

  handleOpenQuestion(message) {
    const answer = this.createChatbotMessage(<BotChatMessage message={'Tras la petición a la API estos son tus enlaces de interés....'} />)
    setTimeout(() => { this.addToStateMessages(answer) }, timer);
    this.nextQuestion(8);
  }


  addToState(key, newValue) {
    this.setState((prevState) => ({
      ...prevState,
      [key]: newValue,
    }))
  }

  nextQuestion(number) {
    this.setState((prevState) => ({
      ...prevState,
      questionNum: number,
    }))

  }




  addToStateMessages(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }))
  }





}






export default ActionProvider;