import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';
import { Link } from 'react-router-dom'; 

const Dashboard = () => {
    return (
        <section>
            <h1>Welcome to Your Dashboard!</h1>
            <p>You are now logged in.</p>
        </section>
    );
}

export default Dashboard;
