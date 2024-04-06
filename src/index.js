import './css/styles.css'
import { openForm, closeForm } from './domController'

const openFormsBtn = document.querySelectorAll('.navbar-btn')
const closeFormBtn = document.querySelectorAll('.form-btn')


openFormsBtn.forEach(btn => {
    btn.addEventListener('click', openForm)
})

closeFormBtn.forEach(btn => {
    btn.addEventListener('click', closeForm)
})