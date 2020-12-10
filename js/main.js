import Slider from './slider'
import 'bootstrap/js/dist/tab'
import $ from 'jquery/dist/jquery.min'
const sliderCoffee = new Slider('#slider-coffee')
const sliderCombo = new Slider('#slider-combo')

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
