import {createStore} from 'redux'
import google from '../logos/google.png'
import mail from '../logos/mail.png'
import yandex from '../logos/yandex.png'




// Состояние (начальные значения)
const initialState = {
    user: {
        isAuth: false,
        userType: 'developer',
    },
    projects:[
        {
            id: 1,
            projName: 'SkyJS',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates.",
            companyName: 'Google',
            logo: google
        },
        {
            id: 2,
            projName: 'SkyNet',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates.",
            companyName: 'Google',
            logo: google
        },
        {
            id: 3,
            projName: 'SkyWeb',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates.",
            companyName: 'Google',
            logo: google
        },
        {
            id: 4,
            projName: 'DevelopDigitalWorld',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates.",
            companyName: 'Yandex',
            logo: yandex
        },
        {
            id: 5,
            projName: 'BuildDigitalWorld',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates.",
            companyName: 'Yandex',
            logo: yandex
        },
        {
            id: 6,
            projName: 'RaiseDigitalWorld',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates.",
            companyName: 'Yandex',
            logo: yandex
        },
        {
            id: 7,
            projName: 'MakeWorldBetter',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates.",
            companyName: 'Mail',
            logo: mail
        },
        {
            id: 8,
            projName: 'MakeThingsBetter',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates.",
            companyName: 'Mail',
            logo: mail
        },
        {
            id: 9,
            projName: 'MakeRoutineBetter',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates.",
            companyName: 'Mail',
            logo: mail
        }
    ],

    developers: [
        {
            id: 1,
            name: 'Vasek',
            experience: 1,
            stack: ['javascript', 'php'],
            email: 'vasek@mail.ru',
            description: "I am Vasy. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates."
        },
        {
            id:2,
            name: 'Petka',
            experience: 2,
            stack: ['javascript', 'python'],
            email: 'petka@mail.ru',
            description: "Me como Petya"
        },
        {
            id: 3,
            name: 'Vitek',
            experience: 1,
            stack: ['javascript', 'php'],
            email: 'vitek@mail.ru',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates."
        },
        {
            id:4,
            name: 'Pashok',
            experience: 2,
            stack: ['javascript', 'python'],
            email: 'pashok@mail.ru',
            description: "Me como Pivo"
        },
        {
            id: 5,
            name: 'Vovan',
            experience: 1,
            stack: ['javascript', 'php'],
            email: 'vovan@mail.ru',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates."
        },
        {
            id:6,
            name: 'Kolyan',
            experience: 2,
            stack: ['javascript', 'python'],
            description: "This is Peter",
            email: 'kolyan@mail.ru',
        },
        {
            id: 7,
            name: 'Leha',
            experience: 1,
            stack: ['javascript', 'php'],
            email: 'Leha@mail.ru',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus pariatur possimus quis voluptas?\n" +
            "            Aperiam consectetur ducimus, hic iure magnam maxime nulla perspiciatis placeat, praesentium reiciendis\n" +
            "            repellat rerum sit veritatis, voluptates."
        },
        {
            id:8,
            name: 'Miha',
            experience: 2,
            stack: ['React native', 'node js'],
            email: 'miha@mail.ru',
            description: "My name is GAF"
        },
        ]
}


export const signIn =()=>{
    return {
        type: 'SIGN_IN'
    }
}

export const signOut =()=>{
    console.log('SIGN OUT сработал')
    return {
        type: 'SIGN_OUT'
    }
}


export const setUserType =(userType)=>{
    console.log('setUserType:', store.getState())
    return {
        type: 'SET_USER_TYPE',
        payload: userType
    }
}

export const setUserName = (userName) =>{
    return{
        type: 'SET_USER_NAME',
        payload: userName
    }
}

export const setUserPassword = (userPassword) =>{
    return{
        type: 'SET_USER_PASSWORD',
        userPassword: userPassword
    }
}


// Редуктор
const reductor = (state=initialState, action) =>{
    switch (action.type){
        case "SIGN_IN":
            //console.log('CURRENT STATE:', state)
            //return state.user = {isAuth: true, ...state.user}
            return state = {...state, user: {...state.user, isAuth: true}}//тут должен user.isAuth перетираться

        case "SET_USER_TYPE":
            //console.log('state changed', { ...state.user, userType: action.payload})
            //console.log('CURRENT STATE:', state)
            return state = { ...state, user: {...state.user, userType: action.payload} } //тут должен user.userType перетиратьс}

        case "SET_USER_NAME":
            //console.log('STATE', state)
            return state = {...state, user: {...state.user, userName: action.payload}}

        case "SET_USER_PASSWORD":
            //console.log('CHANGE PASSWORD', state)
            //console.log(action.userPassword)
            return state = {...state, user: {...state.user, userPassword: action.userPassword}}

        case "SIGN_OUT":
            return state = {...state, user:{isAuth: false, userType: 'developer'}}

        default:
            return state
    }
}

// Хранилище
const store = createStore(reductor)
export default store