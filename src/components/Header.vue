<template>
  <header class="header_area">
    <div class="main-menu">
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">
          <img src="../assets/logo.png" alt="logo" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <div class="mr-auto"></div>
          <b-navbar-nav>
            <b-nav-item active>
              <b-link class="nav-link" href="#">Home <span class="sr-only">(current)</span></b-link>
            </b-nav-item>
            <b-nav-item>
              <b-link class="nav-link" href="#">About</b-link>
            </b-nav-item>
            <b-nav-item>
              <b-link class="nav-link" href="#">Blog</b-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header_area .main-menu .navbar .navbar-brand{
      padding: 0 32px 0 80px;
  }

  .header_area .main-menu .navbar{
    padding: 16px 320px ;
  }

  .header_area .main-menu .nav-item .nav-link{
      font: normal 500 15px/2px 'Roboto', cursive;
      text-transform: uppercase;
      padding: 27px;
      color: #141313;
  }

  .header_area .main-menu .navbar-nav .active a{
    background: linear-gradient(90deg, #4458dc 0%, #854fee 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .header_area .main-menu .navbar-nav a:hover{
      background: linear-gradient(90deg, #4458dc 0%, #854fee 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
  }
</style>
