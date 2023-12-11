import { useState } from 'react';
import './search.css';
import { AGE, ALL, CATS, DEFAULT_PARAMS, DOGS, HEIGHT, NAME, WEIGHT } from './static';
import { Link } from 'react-router-dom';
import { getListings } from '../../gateway/listings';

const SearchResult = ({ title, bottomLeft, bottomRight, bottomRightSrc, src, to }) => {
    return <Link to={to} className="search-link">
        <div className="search-result">
            <h2>{title}</h2>
            <div className="separator"></div>
            <div className="pet-image">
                <img src={src}></img>
            </div>
            <div className="result-info">
                <div>
                    {bottomLeft}
                </div>
                <div className="pet-type">
                <span>
                    {bottomRight}
                </span>
                    <div className="logo">
                        <img src={bottomRightSrc}></img>
                    </div>
                </div>
            </div>
        </div>
    </Link>;
};

export const SearchPage = ({ userInfo }) => {

    const [params, setParams] = useState(DEFAULT_PARAMS);
    const [results, setResults] = useState([]);
    const [nextPage, setNextPage] = useState(undefined);
    const [prevPage, setPrevPage] = useState(undefined);
    const [pageNum, setPageNum] = useState(undefined);

    const populateShelters = (page) => {
        setResults([]);
    };

    const populatePets = (page) => {
        getListings(params.status, params.species, undefined, params.order, false, params.text !== '' ? params.text : undefined, page).then(x => {
            setNextPage(!!x.next ? x.next : undefined);
            setPrevPage(!!x.previous ? x.previous : undefined);
            setResults(
                x.results.map((result, i) =>
                    <SearchResult key={i} bottomRightSrc="./assets/logo-dark.svg" title={result.name} bottomLeft={`${result.age_months} Months`}
                        bottomRight={result.species} src="./assets/logo-dark.svg">

                    </SearchResult>)
            );
        });
    };

    const populateResults = (page) => {
        if (params.shelters) {
            populateShelters(page);
        } else {
            populatePets(page);
        }
        setPageNum(page);
    };

    return <div className="search-page-container">
    <div className="page-grid">
        <div className="sidebar">
            <form className="attribute-form filter-form">
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="pets" onChange={
                        () => setParams(prev => ({
                            ...prev,
                            shelters: false,
                        }))
                    } checked={!params.shelters} />
                    <label className="form-check-label" htmlFor="pets">Pets</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="shelters" onChange={
                        () => setParams(prev => ({
                            ...prev,
                            shelters: true,
                        }))
                    } checked={params.shelters} />
                    <label className="form-check-label" htmlFor="shelters">Shelters</label>
                </div>
                <div className="separator"></div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="cats" onChange={
                        () => setParams(prev => ({
                            ...prev,
                            species: CATS,
                        }))
                    } checked={params.species === CATS} />
                    <label className="form-check-label" htmlFor="cats">Cats</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="dogs" onChange={
                        () => setParams(prev => ({
                            ...prev,
                            species: DOGS,
                        }))
                    } checked={params.species === DOGS} />
                    <label className="form-check-label" htmlFor="dogs">Dogs</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="all" onChange={
                        () => setParams(prev => ({
                            ...prev,
                            species: ALL,
                        }))
                    } checked={params.species === ALL} />
                    <label className="form-check-label" htmlFor="all">All</label>
                </div>
            </form>
            <form className="order-form filter-form">
                <div className="input-group">
                    <input type="radio" id="name" name="order" value="name" checked={params.order == NAME} onChange={
                        () => setParams(prev => ({
                            ...prev,
                            order: NAME,
                        }))
                    } />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-group">
                    <input type="radio" id="age" name="order" value="age" checked={params.order == AGE} onChange={
                        () => setParams(prev => ({
                            ...prev,
                            order: AGE,
                        }))
                    } />
                    <label htmlFor="age">Age</label>
                </div>
                <div className="input-group">
                    <input type="radio" id="height" name="order" value="height" checked={params.order == HEIGHT} onChange={
                        () => setParams(prev => ({
                            ...prev,
                            order: HEIGHT,
                        }))
                    } />
                    <label htmlFor="height">Height</label>
                </div>
                <div className="input-group">
                    <input type="radio" id="weight" name="order" value="weight" checked={params.order == WEIGHT} onChange={
                        () => setParams(prev => ({
                            ...prev,
                            order: WEIGHT,
                        }))
                    } />
                    <label htmlFor="weight">Weight</label>
                </div>
            </form>
        </div>

        <div className="page-container">
            <div className="page-logo">
                <img src="./assets/logo-dark.svg"></img>
                <h1>PetPal</h1>
            </div>
            <div id="search-bar">
                <div className="input-group">
                    <div className="form-outline">
                        <input type="search" id="form1" className="form-control" placeholder="Search" onChange={v => setParams(prev => ({
                            ...prev,
                            text: v.target.value,
                        }))} value={params.text} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => populateResults(1)}>
                        <span className="material-symbols-outlined">search</span>
                    </button>
                </div>
            </div>
            <div className="search-results">
                {
                    results
                }
            </div>
            <nav>
                <ul className="pagination">
                    <li className="page-item"><a className="page-link">&lt;</a></li>
                    <li className="page-item"><a className="page-link">1</a></li>
                    <li className="page-item"><a className="page-link">...</a></li>
                    <li className="page-item"><a className="page-link">22</a></li>
                    <li className="page-item"><a className="page-link">&gt;</a></li>
                </ul>
            </nav>
        </div>
    </div>
    </div>;
}