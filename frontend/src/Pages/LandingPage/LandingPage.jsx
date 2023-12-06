import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


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
                <img src="../../assets/logo-light.svg" alt="PetPal Logo" />
                <h1>PetPal</h1>
            </div>
            <span id="slogan">Smart pet adoption, at your fingertips</span>

            <div id="features">
                <h2 className="aero-tile">
                    For Pet Owners
                </h2>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="../../img/search.png" alt="Search" />
                    </div>
                    Smart-filtering puts the right pets for you just a fingertip away.
                </div>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="../../img/shelter_client.png" alt="Shelter Client" />
                    </div>
                    Connect with shelters near you.
                </div>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="../../img/client_approved_application.png" alt="Approved Application" />
                    </div>
                    Easily make adoption requests.
                </div>
                <h2 className="aero-tile">
                    For Shelters
                </h2>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="../../img/applicant_chat.png" alt="Applicant Chat" />
                    </div>
                    Manage clients that come to you through our intuitive management and chatting platform.
                </div>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="../../img/shelter_management.png" alt="Shelter Management" />
                    </div>
                    Track and edit currently available pets.
                </div>
                <div className="aero-tile">
                    <div className="feature-image">
                        <img src="../../img/pet_creation.png" alt="Pet Creation" />
                    </div>
                    Quickly create listings for pets.
                </div>
            </div>

            <div id="testimonials" className="aero-tile">
                <Carousel>
                    {pets.map((pet) => (
                        <Carousel.Item key={pet.id}>
                            <img
                                className="d-block w-100"
                                src={pet.image}
                                alt={pet.name}
                            />
                            <Carousel.Caption>
                                <h5>{pet.name}</h5>
                                <p>{pet.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div id="login-buttons" className="aero-tile">
                <Link to="/signup-shelter" className="btn btn-secondary">Sign Up Shelter</Link>
                <Link to="/signup-user" className="btn btn-secondary">Sign Up User</Link>
                <Link to="/login-shelter" className="btn btn-primary">Shelter Login</Link>
                <Link to="/login-user" className="btn btn-primary">User Login</Link>
            </div>
        </div>
    );
};

export default LandingPage;
