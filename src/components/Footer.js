import React from 'react'
import footer from "./footer.css"

function Footer() {
    return (
        <footer>
  <div class='wrapper'>
    <div class='seperator padded'>
     
      <div class='col-1 first'>
        <h3>Company</h3>
        <ul class="list-layout">
          <li><a href="/" class="link-contrast">About</a></li>
          <li><a href="/" class="link-contrast">Careers</a></li>
          <li><a href="/" class="link-contrast">Press</a></li>
          <li><a href="/" class="link-contrast">Blog</a></li>
          <li><a href="/" class="link-contrast">Help</a></li>
          <li><a href="/" class="link-contrast">Policies</a></li>
          <li><a href="/" class="link-contrast">Terms &amp; Privacy</a></li>
        </ul>
      </div>
      <div class='col-1'>
        <h3>Discover</h3>
        <ul class="list-layout">
          <li><a href="/" class="link-contrast">Trust &amp; Safety</a></li>
          <li><a href="/sitemaps" class="link-contrast">Site Map</a></li>
        </ul>
      </div>
     
    </div>
    <div class='seperator column text-center'>
      <h2 class='margin-below-1'>Join Us on</h2>
      <div class='smedialinks'>
      <i class="fa fa-facebook" aria-hidden="true"></i>
      <i class="fa fa-google-plus" aria-hidden="true"></i>
      <i class="fa fa-twitter" aria-hidden="true"></i>
      <i class="fa fa-linkedin" aria-hidden="true"></i>
      <i class="fa fa-instagram" aria-hidden="true"></i>
      <i class="fa fa-pinterest-p" aria-hidden="true"></i>
      </div>
    </div>
  </div>
  <p class='copyright'>GGF footer made by Doug</p>
</footer>
    )
}

export default Footer
