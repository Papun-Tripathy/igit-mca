import './contact.css'

const Contact = () => {
  return (
    <div>

      <section className="contact">
        <div class="container contact_container">
          <aside class="contact__aside">
            <div class="aside__imgage">
              <img src='../../images/contact.svg' alt="" />
            </div>
            <h2>Contact Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptatem sit earum fuga dolore at.</p>
            <ul class="contact__details">
              <li>
                <i class="uil uil-phone-times"></i>
                <h5>+919090323291</h5>
              </li>
              <li>
                <i class="uil uil-envelope"></i>
                <h5>mrmjpatra@gmail.com</h5>
              </li>
              <li>
                <i class="uil uil-location-point"></i>
                <h5>Sarang, Dhenkanal</h5>
              </li>
            </ul>
            <ul class="contact__socials">
              <li><a href="https://facebook.com"><i class="uil uil-facebook-f"></i></a></li>
              <li><a href="https://instagram.com"><i class="uil uil-instagram"></i></a></li>
              <li><a href="https://twitter.com"><i class="uil uil-twitter"></i></a></li>
              <li><a href="https://linkedin.com"><i class="uil uil-linkedin-alt"></i></a></li>
            </ul>
          </aside>
          {/* 

          <form>
            <div className='form__name'>
              <input type="text" name="First Name" placeholder="First Name" data-required />
              <input type="text" name='last name' placeholder='last name' required />
            </div>
            <input type='email' name='Email address' placeholder='Your Email address' required/>
            <textarea name='Message' rows={7} placeholder='Message' required/>
            <button type='submit' className='btn btn-primary' >Send Message</button>
          </form> */}



          <form action="https://formspree.io/f/mrgdbrzg" method="POST" className="contact__form">
            <div className="form__name">
              <input type="text" name="First Name" placeholder="First Name" data-required />
              <input type="text" name='last name' placeholder='last name' required />
            </div>
            <input type='email' name='Email address' placeholder='Your Email address' required />
            <textarea name="Message" rows="7" placeholder="Message" required ></textarea>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact