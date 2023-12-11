import React from 'react'
import { Link } from 'react-router-dom'
import './landing-page.css'


const LandingPage = () => {
    const pets = [
        {
            id: 1,
            name: 'Tweetie and Flappy',
            image: 'https://top10tale.com/wp-content/uploads/2017/03/Budgerigars.jpg',
            description: 'PetPal helped us grow our family through Tweetie and Flappy!',
        },
        {
            id: 2,
            name: 'Hazel',
            image: 'https://media-be.chewy.com/wp-content/uploads/2012/07/03161140/pets_for_kids.jpg',
            description: 'Family is a weird word to use for pets, but honestly after using PetPal, that\'s how we feel about Hazel!',
        },
        {
            id: 3,
            name: 'Doris and Boris',
            image: 'http://i.huffpost.com/gen/1460322/thumbs/o-PUPPY-facebook.jpg',
            description: 'PetPal very good.',
        }
    ]

    return (
        <div id="page-container">
            <div id="page-logo">
                <img src="/assets/logo-light.svg" alt="PetPal Logo" />
                <h1>PetPal</h1>
            </div>
            <span id="slogan">Smart pet adoption, at your fingertips</span>

            <div id="features">
                <h2 className="aero-tile">
                    For Pet Owners
                </h2>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="/img/search.png" alt="Search" />
                    </div>
                    Smart-filtering puts the right pets for you just a fingertip away.
                </div>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="/img/shelter_client.png" alt="Shelter Client" />
                    </div>
                    Connect with shelters near you.
                </div>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="/img/client_approved_application.png" alt="Approved Application" />
                    </div>
                    Easily make adoption requests.
                </div>
                <h2 className="aero-tile">
                    For Shelters
                </h2>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="/img/applicant_chat.png" alt="Applicant Chat" />
                    </div>
                    Manage clients that come to you through our intuitive management and chatting platform.
                </div>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="/img/shelter_management.png" alt="Shelter Management" />
                    </div>
                    Track and edit currently available pets.
                </div>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="/img/pet_creation.png" alt="Pet Creation" />
                    </div>
                    Quickly create listings for pets.
                </div>
            </div>

            <div id="testimonials" className="aero-tile">
                <h2>Testimonials</h2>
                <div id="carousel-testimonials" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carousel-testimonials" data-bs-slide-to="0" className="active"
                                aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carousel-testimonials" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carousel-testimonials" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="image-container">
                                <img src="https://top10tale.com/wp-content/uploads/2017/03/Budgerigars.jpg" className="d-block w-100"
                                     alt="Birdies"/>
                            </div>
                            <div className="carousel-caption">
                                <h5>Tweetie and Flappy</h5>
                                <p>PetPal helped us grow our family through Tweetie and Flappy!</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="image-container">
                                <img src="https://media-be.chewy.com/wp-content/uploads/2012/07/03161140/pets_for_kids.jpg"
                                     className="d-block w-100" alt="Girl And Bunny"/>
                            </div>
                            <div className="carousel-caption">
                                <h5>Hazel</h5>
                                <p>Family is a weird word to use for pets, but honestly after using PetPal, that's how we feel about Hazel!</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="image-container">
                                <img src="http://i.huffpost.com/gen/1460322/thumbs/o-PUPPY-facebook.jpg" className="d-block w-100" alt="Awww"/>
                            </div>
                            <div className="carousel-caption">
                                <h5>Doris and Boris</h5>
                                <p>PetPal good.</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel-testimonials"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel-testimonials"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div id="login-buttons" className="aero-tile">
                <Link to="/signup-shelter" className="btn btn-secondary">Sign Up Shelter</Link>
                <Link to="/signup-seeker" className="btn btn-secondary">Sign Up User</Link>
                <Link to="/login-shelter" className="btn btn-primary">Shelter Login</Link>
                <Link to="/login-seeker" className="btn btn-primary">User Login</Link>
            </div>
        </div>
    )
}

export default LandingPage
