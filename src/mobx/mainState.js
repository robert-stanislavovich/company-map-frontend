
import axios from "axios"
import { makeAutoObservable } from "mobx"
import { LOCALES } from '../i18n/locales'



class Timer {
  count = 0
  users = []
  showUsers = false
  fetching = false
  error = null
  locales = LOCALES.ENGLISH
  email = ""
  password = ""
  name = ""
  user = null
  token = localStorage.getItem("Token")
  showLogin = true
  notes = null
  newNoteText = ""
  authUserId = ""
  authUserName = ""
  

  constructor() {
    makeAutoObservable(this)
  }  
  getUser = () => {

    this.fetching = true

    fetch('http://localhost:3010/api/users')
      .then(r => r.json())
      .then(r => {
        this.users = r.rows
        this.fetching = false
        this.error = false
        console.log(r)
      })


  }
  
  setLanguageEnglish() {
    this.locales = LOCALES.ENGLISH

  }
  setLanguageRussian() {
    this.locales = LOCALES.RUSSIAN

  }
  handleEmailChange(text) {
    this.email = text
  }
  handlePasswordChange(text) {
    this.password = text
  }
  handleNameChange(text) {
    this.name = text
  }
  handleNoteTextChange(text) {
    this.newNoteText = text
  }
  sendLoginForm() {
    
    axios.post('http://localhost:3010/api/auth/login', { email: this.email, password: this.password })      
      .then(r => {
        this.user = r.data.user
        this.token = `Bearer ${r.data.token}`      
        
      })      
      .then(r => {
        localStorage.setItem("Token", this.token)
        
      })
      .catch(e => {        
        e.response ? this.error = e.response.data.message : this.error = "Server error";
      })
      
      
  }
  sendRegisterForm() {
    
    axios.post('http://localhost:3010/api/auth/register', { email: this.email, name: this.name, password: this.password })      
      .then(r => {
        console.log(r.data)
        
      })
  }
  logOut() {
    this.user = null
    this.token = ""
    localStorage.removeItem("Token")
    this.authUserName = ""
  }
  setShowLogin(show) {
    this.showLogin = show
  }
  getNotes() {
    
    axios.get('http://localhost:3010/api/notes/', {
      headers: {'authorization': this.token }
    })      
      .then(r => {
        this.notes = r.data.rows.sort((a, b) => a.id - b.id) 
        this.authUserId = r.data.userId              
      })
      .then(r => {
        axios.get(`http://localhost:3010/api/users/${this.authUserId}`)      
      .then(r => {
        
        this.authUserName = r.data.name
        
      })
    })
      
  }
  deleteNote(id) {
    axios.delete(`http://localhost:3010/api/notes/${id}`, {
      headers: {'authorization': this.token }
    })      
      .then(r => {
        axios.get('http://localhost:3010/api/notes/', {
      headers: {'authorization': this.token }
    })      
      .then(r => {
        this.notes = r.data.rows.sort((a, b) => a.id - b.id)         
      })
        
      }) 
  }
  createNote() {
    
    axios.post('http://localhost:3010/api/notes/', { title: this.newNoteText }, {
      headers: {'authorization': this.token }
    })      
      .then(r => {
        axios.get('http://localhost:3010/api/notes/', {
      headers: {'authorization': this.token }
    })
    .then(r => {
      this.notes = r.data.rows.sort((a, b) => a.id - b.id)         
    })
        
      })
      
    }
    patchNote(id) {
    
      axios.patch(`http://localhost:3010/api/notes/`, { id, title: this.newNoteText }, {
        headers: {'authorization': this.token }
      })      
        .then(r => {
          axios.get('http://localhost:3010/api/notes/', {
        headers: {'authorization': this.token }
      })
      .then(r => {
        this.notes = r.data.rows.sort((a, b) => a.id - b.id)        
      })
          
        })
        
      }
    setError(err) {
      this.error = err
    }     
}

export const mainState = new Timer()