import React from 'react'
import './notice.css'

const AddNotice = () => {
  return (
    <div>
        {/* <!-- Header --> */}
        <header id="header">
            <nav>
                <div class="container">
                    <div class="text-center">
                        <a href="/" class="nav-brand text-dark">Notice Management System</a>
                    </div>
                </div>
            </nav>
        </header>
    {/* <!-- /Header --> */}
    <form action="/api/users" method="POST" id="add_user">
        <div class="new_user">
            <div class="form-group">
                <label for="name" class="text-light">Name</label>
                <input type="hidden" name="id" value=""/>
                <input type="text" name="name" value="" placeholder="Mark Stoenis"/>
            </div>
            <div class="form-group">
                <label for="text" class="text-light">Link</label>
                <input type="text" name="email" value="" placeholder="paste the link"/>
            </div>
    
            <div class="form-group">
                <label for="cars" class="text-light">Choose a Batch:</label>
                <select class="example" name="example">
                    <option name="" value="0" selected>Select</option>
                    <option name="batch40" value="40">40</option>
                    <option name="batch39" value="39">39</option>
                    <option name="batch38" value="38">38</option>
                    <option name="batch37" value="37">37</option>
              </select>
            </div>    
            <div class="form-group">
                <button type="submit" class="btn text-dark update">Save</button>
            </div>
    
        </div>
    </form>
    </div>
  )
}

export default AddNotice