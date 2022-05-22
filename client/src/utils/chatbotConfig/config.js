import { createChatBotMessage } from 'react-chatbot-kit';
import Avatar from '../../components/Footer/Chatbot/Avatar/Avatar';
import UserAvatar from '../../components/Footer/Chatbot/UserAvatar/UserAvatar';
import UserChatMessage from '../../components/Footer/Chatbot/UserChatMessage/UserChatMessage';
import BotChatMessage from '../../components/Footer/Chatbot/BotChatMessage/BotChatMessage';
import ConsentGDPR from './widgets/consentGDPR';
import AgeRange from './widgets/ageRange';
import UserType from './widgets/userType';



const botName = 'Nexus';


const config = {

    initialMessages: [

        createChatBotMessage(<BotChatMessage message={"¡Hola!"} />, /* { delay: 500 } */),
        createChatBotMessage('Soy Nexus! Estoy aqui para ayudarte y resolver tus dudas e inquietudes', /* { delay: 2000 } */),
        createChatBotMessage('Para poder ofrecerte una información más personalizada necesitamos crearte un perfil mediante un correo electrónico y una contraseña donde poder compartir contigo esa información.',/*  { delay: 4500 } */),

        createChatBotMessage('Para poder conocerte mejor, ¿Cómo quieres que te llame?',/*  { delay: 9000 } */),

    ],

    botName: botName,

    customStyles: {
        chatButton: {
            backgroundColor: '#F1630F',
            borderRadius: "15px",
        },
    },

    state: {//estado inyectado en el chatbot, se puede usar en widgets
        name: "",
        surname: "",
        email: "",
        password: "",
        consentGDPR: "",
        ageRange: "",
        userType: "",
        questionNum: 0,
    },

    customComponents: {
        header: () => <div style={{ backgroundColor: '#F1630F', padding: "5px", borderRadius: "3px", margin: '5px' }}>Bienvenido</div>,
        botAvatar: (props) => <Avatar />,
        userAvatar: (props) => <UserAvatar {...props} />,
        botChatMessage: (props) => <BotChatMessage {...props} />,
        userChatMessage: (props) => <UserChatMessage {...props} />
    },

    widgets: [
        {
            widgetName: 'ConsentGDPR',
            widgetFunc: (props) => <ConsentGDPR {...props} />,
        },
        {
            widgetName: 'AgeRange',
            widgetFunc: (props) => <AgeRange {...props} />,
        },
        {
            widgetName: 'UserType',
            widgetFunc: (props) => <UserType {...props} />,
        }
    ]


};




export default config;