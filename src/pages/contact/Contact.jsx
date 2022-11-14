import React from 'react'
import './contact.css'
import { useForm, ValidationError } from '@formspree/react';



function Contact() {
  const [state, handleSubmit] = useForm("xaykvwee");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <div>

      <section className="contact">
        <div className="container contact_container">
          <aside className="contact__aside">
            <div className="aside__imgage">
              <img src='../../images/contact.svg' alt="" />
            </div>
            <h2>Contact Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptatem sit earum fuga dolore at.</p>
            <ul className="contact__details">
              <li>
                <i className="uil uil-phone-times"></i>
                <h5>+919090323291</h5>
              </li>
              <li>
                <i className="uil uil-envelope"></i>
                <h5>mrmjpatra@gmail.com</h5>
              </li>
              <li>
                <i className="uil uil-location-point"></i>
                <h5>Sarang, Dhenkanal</h5>
              </li>
            </ul>
            <ul className="contact__socials">
              <li><a href="https://facebook.com"><i className="uil uil-facebook-f"></i></a></li>
              <li><a href="https://instagram.com"><i className="uil uil-instagram"></i></a></li>
              <li><a href="https://twitter.com"><i className="uil uil-twitter"></i></a></li>
              <li><a href="https://linkedin.com"><i className="uil uil-linkedin-alt"></i></a></li>
            </ul>
          </aside>

          <form onSubmit={handleSubmit} className='contactform'>

            
              <label htmlFor="text">
                 Name
              </label>
              <input
                id='name'
                type='text'
                name="Enter Full Name" required autoComplete='autoComplete'/>
            
            <label htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <label htmlFor='textarea'>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={"5"}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button type="submit" disabled={state.submitting} className='btn'>
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact