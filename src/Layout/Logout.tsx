import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    localStorage.clear();
    return navigate('/');
}

export default Logout
