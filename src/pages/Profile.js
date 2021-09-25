import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Repos } from "../components/Repos";
import { GithubContext } from "../context/github/githubContext";

export const Profile = ({match}) => {
    const {getUser,getRepos,loading,user,repos} = useContext(GithubContext);
    const url_name = match.params.name;
    
    
    useEffect(() => {
        getUser(url_name);
        getRepos(url_name);
    },[])
    if(loading){
        return <p className = "text-center">Lading...</p>
    }
    const {
        name,company,
        avatar_url,location,bio,blog,
        login,html_url,followers,following,
        publi_repos,public_gists
    } = user;
    return (
        <Fragment>
            <Link to = '/' className = "btn btn-link">Go to Main</Link>

            <div className = "card mb-4">
                <div className = "card-body">
                    <div className = "row">
                        <div className = "col-sm-3 text-center">
                            <img 
                                style = {{width:'150px'}}
                                src = {avatar_url} 
                                alt=  {name}/>
                            <h1>{name}</h1>
                            {location && <p>Location: {location}</p>}
                        </div>
                        <div className = "col">
                            {
                                bio && <Fragment>
                                            <h3>BIO</h3>
                                            <p>{bio}</p>
                                       </Fragment>
                            }
                            <a 
                                href = {html_url} 
                                target = "_blank" 
                                className = "btn btn-dark">
                            Open profile</a>
                            <ul>
                                {login && <li> 
                                    <strong>Username :  </strong> {login}
                                </li>}

                                {company && <li> 
                                    <strong>Company :  </strong> {company}
                                </li>}

                                {blog && <li> 
                                    <strong>website :  </strong> {blog}
                                </li>}
                            </ul>
                            <div className = "badge badge-priamry">
                                Followers : {followers}
                            </div>
                            <div className = "badge badge-success">
                                Subscribed : {following}
                            </div>
                            <div className = "badge badge-info">
                                Repos : {publi_repos}
                            </div>
                            <div className = "badge badge-dark">
                                Gists : {public_gists}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Repos repos = {repos} />
        </Fragment>
    )
}