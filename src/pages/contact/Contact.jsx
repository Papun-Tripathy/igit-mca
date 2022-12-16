import React from 'react'
import './contact.css'
import { useForm, ValidationError } from '@formspree/react';



function Contact() {
  const [state, handleSubmit] = useForm("mvoyyzkp");
  if (state.succeeded) {
    return <div className='contactus__submit'>
      <p>Thank You For Contacing Us</p>
    </div>;
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
            <p>Here you can post your query and bug related to this web page.For any query and issues we will help you.For interview or helping any carrier you can connect with us by sending the query and question. we defintly contact as soon as possible.</p>
            <ul className="contact__details">
              <li>
                <i className="uil uil-phone-times"></i>
                <h5>+91 9090323291</h5>
              </li>
              <li>
                <i className="uil uil-envelope"></i>
                <h5>mca40th@gmail.com</h5>
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