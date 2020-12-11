import Slider from './slider'
import 'bootstrap/js/dist/tab'
import $ from 'jquery/dist/jquery.min'
import MobileMenu from './menu'
const sliderCoffee = new Slider('#slider-coffee')
const sliderCombo = new Slider('#slider-combo')

const mobileMenu = new MobileMenu('.toggle-menu', '.nav-general')

//прокрутка по якорю
$('.nav-general').click(function (e) {
  e.preventDefault()
  var sectionTo = $(e.target).attr('href')
  $('html, body').animate(
    {
      scrollTop: $(sectionTo).offset().top,
    },
    500
  )
})
