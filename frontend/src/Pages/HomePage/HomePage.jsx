import './HomePage.css';

export const HomePage = ({userInfo}) => {
    return <div className="home-page-container">
        <div className="home-grid">
            <div className="search">
                <div className="page-logo">
                    <img src="./assets/logo-dark.svg"></img>
                    <h1>PetPal</h1>
                </div>
                <div className="search-bar">
                    <div class="input-group">
                        <div class="form-outline">
                            <input type="search" class="form-control" placeholder="Search For Listings" />
                        </div>
                        <a type="button" class="btn btn-primary" href="./search-client.html">
                            <span class="material-symbols-outlined">search</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="notifications">
                <h3>Recent Notifications<span class="material-symbols-outlined">notifications</span></h3>
                <div class="notification secondary">
                    <div class="notification-header d-flex justify-content-between p-2">
                        <a class="notification-header-text text-center d-flex align-items-center"
                            href="./notifications-client.html">
                            <span class="material-symbols-outlined d-block pe-3">chat_bubble</span> Message from Daniel
                        </a>
                        <div class="notification-close">
                            x
                        </div>
                    </div>
                    <a class="notification-body p-3" href="./notifications-client.html">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam voluptatum adipisci.
                    </a>
                </div>
            </div>
            <div className="applications">
                <h3>Recent Applications<span class="material-symbols-outlined">description</span></h3>
                <div class="d-flex justify-content-center">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" class="sortable sorted">
                                    <div>
                                        Pet Name
                                        <span class="material-symbols-outlined">arrow_drop_down</span>
                                    </div>
                                </th>
                                <th scope="col" class="sortable">
                                    <div>
                                        Shelter
                                        <span class="material-symbols-outlined">arrow_drop_up</span>
                                    </div>
                                </th>
                                <th scope="col" class="sortable">
                                    <div>
                                        Date
                                        <span class="material-symbols-outlined">arrow_drop_up</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><a href="pet-application-client-submitted.html">Bartholemew</a></td>
                                <td><a href="pet-application-client-submitted.html">Ted's Pets</a></td>
                                <td><a href="pet-application-client-submitted.html">09/09/2023</a></td>
                            </tr>
                            <tr>
                                <td><a href="pet-application-client-submitted.html">John tha dog</a></td>
                                <td><a href="pet-application-client-submitted.html">Ted's Pets</a></td>
                                <td><a href="pet-application-client-submitted.html">09/09/2023</a></td>
                            </tr>
                            <tr>
                                <td><a href="pet-application-client-submitted.html">John the dog's cousin</a></td>
                                <td><a href="pet-application-client-submitted.html">Danica's Pets</a></td>
                                <td><a href="pet-application-client-submitted.html">09/09/2023</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>;
}