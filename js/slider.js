export default class Slider {
  
  constructor(slider, config = {}){
    this.slider = document.querySelector(slider);
    this.items = this.slider.querySelector('.slider-items')
    this.itemList = this.slider.querySelectorAll('.slider_item')
    this.currentIndex = 0 //номер слайда который сейчас виден на экране
    this.config = Object.assign(this.getDefaultConfig(), config)
    this.controlNext = this.slider.querySelector('.next')
    this.controlPrev = this.slider.querySelector('.prev')
    
    this.init()
  }
  init(){
    this.addEvents()
    this.addFade()
    this.initControls()
  }
  initControls(){
    this.controlPrev.classList.add('d-none')
    if(this.itemList.length === 1){
      this.controlNext.classList.add('d-none')
    }
  }
  getDefaultConfig(){
    return {
      fade: true
    }
  }
  addEvents(){
    this.slider.addEventListener('click', (e)=>{
      if(e.target.classList.contains('control')){
        if(e.target.classList.contains('next')){
          console.log('next')
          console.log(this.currentIndex);
          if(this.currentIndex >= this.itemList.length-1){
            console.log("end");
            return;
          }
          //change class
          this.itemList[this.currentIndex].classList.remove('active')
          this.itemList[this.currentIndex+1].classList.add('active')
          
          const translateX = (++this.currentIndex) * -100
          this.items.style.transform = `translateX(${translateX}%)`
          
          
          this.controlPrev.classList.remove('d-none')
          if(this.currentIndex >= this.itemList.length-1){
            this.controlNext.classList.add('d-none')
          }
        } else{
          if(this.currentIndex <= 0){
            console.log("prev stop")
            return;
          }
          this.itemList[this.currentIndex].classList.remove('active')
          this.itemList[this.currentIndex-1].classList.add('active')
          
          
          const translateX = (--this.currentIndex) * -100
          this.items.style.transform = `translateX(${translateX}%)`
          
          if(this.currentIndex <=0){
            this.controlPrev.classList.add('d-none')
          }
          this.controlNext.classList.remove('d-none')
          
        }
      }
    })
  }
  
  addFade(){
    const fadeClass = 'js-fade'
    if(this.config.fade === true){
      this.itemList.forEach((item)=>{
        item.classList.add(fadeClass)
      })
    }
  }
  
}