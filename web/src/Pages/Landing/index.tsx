import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import api from '../../services/api';

export default function Landing() {
    const [totalConnectios, setTotalConnections] = useState(-1);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        })
    },[]);

    return(
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataform de estudos online.</h2>

                </div>

                <img src={landingImg} alt=""  className="hero-image" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="" />
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="" />
                        Dar aulas
                    </Link>
                </div>
                {
                    totalConnectios >= 0 && <span className="total-connections">Total de {totalConnectios} conexoes ja realizadas <img src={purpleHeartIcon} alt="Coracao roxo" /></span>
                }
                

            </div>
        </div>
    )
}