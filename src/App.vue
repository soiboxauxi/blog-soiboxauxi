<template>
  <div id="app">
    <!-- Header -->
    <Header></Header>
    <!-- Main -->
      <!-- Banner -->
      <!-- About -->
      <!-- Brand -->
      <!-- Services -->
      <!-- Project -->
      <!-- About Me -->
      <!-- Subscribe me -->
    <!-- Footer -->
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Header from './components/Header.vue';

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  html, body {
    margin: 0%;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  #app {
    font-family: 'Roboto';
  }
  /* Global Classes */
  .title-text{
    font: normal bold 50px/ 72px 'Roboto', cursive;
  }

  .text-uppercase{
      text-transform: uppercase;
  }

  /* Buttons */
  .button{
    padding: .8rem 2.2rem;
    font: normal 500 16px/20px var(--roboto);
    position: relative;
    border: 3px solid transparent;
    border-radius: 4px;
  }

  .button.primary-button{
    background: var(--gradient-color);
    background-clip: padding-box;
    color: whitesmoke;
    transition: background .6s ease;
    box-shadow: var(--box-shadow);
  }

  .button.primary-button:hover{
    background: whitesmoke;
    background-clip: padding-box;
    color: black;
  }

  .button.primary-button::after, .button.secondary-button::after{
    position: absolute;
    top: -2px; left: -2px;
    bottom: -2px;  right: -2px;
    background: var(--gradient-color);
    content: ' ';
    z-index: -1;
    border-radius: 4px;
  }

  .button.secondary-button{
    background: white;
    background-clip: padding-box;
    transition: background .6s ease;
  }

  .button.secondary-button:hover{
    background: var(--gradient-color);
    color: whitesmoke;
    box-shadow: var(--box-shadow);
  }

  p.para{
    color: var(--text-color);
    font: normal 500 16px/ 25px var(--roboto);
  }

  .font-roboto{
    font-family: var(--roboto);
  }

  button:focus,
  button:active
  button:hover
  .btn:active,
  .btn.active{
    outline: 0px !important;
    box-shadow: none !important;
  }

  .title-h1{
    font: normal bold 39px/ 40px var(--roboto);
  }

  .navbar_fixed{
    position: fixed;
    width: 100%;
    top: -1px;
    left: 0; right: 0;
    background: #ffffff;
    box-shadow: 0px 10px 30px rgba(57, 56, 61, 0.205);
    z-index: 999;
    transition: background 1s ease;
  }
</style>
