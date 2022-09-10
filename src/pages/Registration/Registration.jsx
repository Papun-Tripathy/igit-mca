import React from 'react'

const Registration = () => {
    return (
        <div className="row">
            <section className="section">
                <header>
                    <h3>Welcome Senior to IGIT MCA Registration Form</h3>
                    <h4>Please fill your information bellow</h4>
                </header>
                <main>
                    <form>
                        <div className="form-item form-boxitem">
                            <div className="form-item form-basic-details">
                                <div className="form-item box-item">
                                    <input type="text" name="name" placeholder="Name" data-required />
                                </div>
                                <div className="form-item box-item">
                                    <input type="email" name="email" placeholder="Email" data-email data-required />
                                </div>
                                <div className="form-item box-item">
                                    <div className="form-item">
                                        <input id="phone" type="number" name="phone" value="phone"
                                            placeholder="Phone number" data-once />
                                    </div>
                                </div>
                            </div>
                            <div className="form-item box-item profile-upload">
                                <label for="imageupload">
                                    <div className="wrapper">
                                        <div className="image">
                                            <img id="output" alt='' />
                                        </div>
                                    </div>
                                    <input id="imageupload" type="file" accept="image/*" onchange="loadFile(event)" style="display: none;" />
                                </label>

                            </div>
                        </div>


                        <div className="form-item box-item">
                            <div className="form-item">
                                <select className="batch" name="example">
                                    <option name="" value="0" selected>Select Batch</option>
                                    <option name="40" value="40">40</option>
                                    <option name="39" value="39">39</option>
                                    <option name="38" value="38">38</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-item box-item">
                            <input type="text" name="linkedine" placeholder="Linkedin URL" data-required />
                        </div>
                        <div className="form-item box-item">
                            <div className="form-item ">
                                <input type="text" name="insta" placeholder="Instagram Username" data-required data-number />
                            </div>
                        </div>
                        <div className="form-item box-item">
                            <input type="text" name="company" placeholder="Company Name (Optional)" data-required
                                data-number data-count="10" />
                        </div>


                        <div className="form-item">
                            <span id="submit" className="submit">Submit</span>
                        </div>
                    </form>
                </main>
                <footer>

                </footer>
            </section>
        </div>
    )
}

export default Registration