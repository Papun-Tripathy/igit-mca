import React from 'react'
import './notice.css'
const ViewNotice = () => {
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
        <main id="site-main">
        <div class="container">
            <div class="box-nav d-flex justify-between">
                <a href="/add-user" class="border-shadow">
                    <span class="text-gradient">Add Notice <i class="fas fa-user"></i></span>
                </a>
            </div>

            {/* <!-- form handling --> */}
            <form action="/" method="POST">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- <%- include('include/_show') %> --> */}
                    </tbody>
                </table>
            </form>
        </div>
    </main>
{/* <!-- /Main Site --> */}

    </div>
  )
}

export default ViewNotice