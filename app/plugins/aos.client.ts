import AOS from 'aos';
export default defineNuxtPlugin(() => {
    AOS.init({
        easing: 'ease-out-back',
        duration: 1000
    })
})