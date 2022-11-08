import React from 'react'
import './notice.css'
const UpdateNotice = () => {
  return (
    <div>
        
        <header id="header">
            <nav>
                <div class="container">
                    <div class="text-center">
                        <a href="/" class="nav-brand text-dark">Notice Management System</a>
                    </div>
                </div>
            </nav>
        </header>
  
    {/* <!-- Main Site --> */}
  <main id="site-main">
    <div class="container">
        <div class="box-nav d-flex justify-between">
           <div class="filter">
               <a href="/"><i class="fas fa-angle-double-left"></i> All Notices</a>
           </div>
        </div>
        <div class="form-title text-center">
            <h2 class="text-dark">Update Notice</h2>
            <span class="text-light">Use the below form to Update the Notice</span>
        </div>

        
 <form method="POST" id="update_user">
    <div class="new_user">
        <div class="form-group">
            <label for="name" class="text-light">Name</label>
            <input type="hidden" name="id" value="<%= user._id %>"/>
            <input type="text" name="name" value="<%= user.name %>" placeholder="Mark Stoenis"/>
        </div>
        <div class="form-group">
            <label for="Link" class="text-light">Link</label>
            <input type="text" name="email" value="<%= user.email%>" placeholder="Paste the link"/>
        </div>

        <div class="form-group">
            <button type="submit" class="btn text-dark update">Save</button>
        </div>

    </div>
</form>
       
    </div>
</main>

    </div>
  )
}

export default UpdateNotice