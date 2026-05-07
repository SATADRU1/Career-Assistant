import "../style/home.scss"

const Home = () => {
    return (
       <main className='home-page'>
        <div className="content-container">
            {/* PAGE HEADER: Displays the main title with a sleek gradient text effect */}
            <header className="page-header">
                <h1>Career Assistant</h1>
                <h2>Create your custom interview plan</h2>
                <p>Upload your details and let our AI create a custom interview plan for you.</p>
            </header>

            {/* MAIN FORM CARD: Uses glassmorphism (translucency + background blur) to look premium */}
            <div className="interview-form-card">
                
                {/* LEFT COLUMN: Dedicated to the large job description input */}
                <div className='left-column'>
                    <div className="input-group">
                        <label htmlFor="jobDescription">Job Description</label>
                        <textarea 
                            name="jobDescription" 
                            id="jobDescription" 
                            placeholder='Paste the full job description here...'
                        ></textarea> 
                    </div>
                </div>

                {/* RIGHT COLUMN: Contains the file upload, optional text area, and the call-to-action button */}
                <div className='right-column'>
                    
                    {/* FILE UPLOAD: Styled as a clickable dashed "drop-zone" area rather than a boring default file input */}
                    <div className='input-group file-upload-group'>
                        <label className="file-label" htmlFor="resume">
                            <span className="upload-icon">📄</span>
                            <span className="upload-text">Click to upload Resume (.pdf)</span>
                        </label>
                        <input hidden type="file" name="resume" id="resume" accept='.pdf'/>
                    </div>

                    <div className='input-group'>
                        <label htmlFor="selfDescription">Self Description (either resume or self description required)</label>
                        <textarea 
                            name="selfDescription" 
                            id="selfDescription" 
                            placeholder='Tell us briefly about your background and experience...' 
                        ></textarea>
                    </div>

                    {/* GENERATE BUTTON: Features a vibrant gradient background and a sliding arrow animation on hover */}
                    <button className='generate-btn'>
                        <span>Generate Interview Report</span>
                        <span className="arrow">→</span>
                    </button>
                </div>
            </div>
        </div>
       </main>
    )
}

export default Home 